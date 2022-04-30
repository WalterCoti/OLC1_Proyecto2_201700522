/* IMPORTS */

%{
    const Aritmetica = require('./Expresiones/Aritmeticas');
    const Casteo = require('./Expresiones/Casteos');
    const Condicion = require('./Expresiones/condiciones');
    const Decremento = require('./Expresiones/Decrementos');
    const Expresion = require('./Expresiones/Expresion');
    const FUNCION = require('./Expresiones/Funciones')
    const Incremento = require('./Expresiones/Incrementos');
    const Literal = require('./Expresiones/Literal');
    const NATIVAS = require('./Expresiones/Nativas');
    const TERNARIO = require('./Expresiones/Ternarios');
    const TOLOWER = require('./Expresiones/ToLower');
    const TOUPPER = require('./Expresiones/ToUpper');
    const Variable = require('./Expresiones/Variables');
    const Vector = require('./Expresiones/Vectors');
    
    const ASIGNAR = require('./Instrucciones/Asign')
    const BREAK = require('./Instrucciones/Break');
    const CONTINUE = require('./Instrucciones/Continue');
    const DECLARAR = require('./Instrucciones/Declarar');
    const DEC = require('./Instrucciones/Decremento');
    const INC = require('./Instrucciones/Incremento');
    const IF = require('./Instrucciones/If');
    const FOR = require('./Instrucciones/For');
    const DOWHILE = require('./Instrucciones/DoWhile');
    const FUNC = require('./Instrucciones/Funcion');
    const LLAMADA = require('./Instrucciones/Llamada');
    const Print = require('./Instrucciones/Print');
    const Println = require('./Instrucciones/Println');
    const RETURN = require('./Instrucciones/Return');
    const SWITCH = require('./Instrucciones/Switch');
    const WHILE = require('./Instrucciones/While');
    const Excepcion = require('./Exceptions/Excepcion');
    const Instruccion = require('./Abstracto/instrucciones');
    const Arbol = require('./AST/ASTTree');
    const Tipo = require('./AST/Stype');
    let Texto="";
    let ArbolAST = new Arbol.default([]);
    let ASTree = new Arbol.default([]);
%}

//definicion lexica
%lex 
%options case-insensitive 

%x CADENA_STR
%x SPECIALCHAR

%%

// COMENTARIOS 
"//".*                          {/* comentarios simples */}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  {/* comentarios con multiples lineas*/} 

"//".*            	{}
// ESACIOS EN BLANCO Y SALTO DE LINEA
[ \s\r\n\t]                     {/*Espacios se ignoran */ }
\n                              {/* saltos de linea */}
[']                             {Texto=""; this.begin("CARACTER");}
<SPECIALCHAR>[^'\\]"'"          {yytext = yytext.substr(0,yyleng-1); this.popState(); return 'SPECIALCHAR';}
<SPECIALCHAR>"\\n'"             {yytext = '\n'; this.popState(); return 'SPECIALCHAR';}
<SPECIALCHAR>"\\t'"             {yytext = "\t"; this.popState(); return 'SPECIALCHAR';}
<SPECIALCHAR>"\\r'"             {yytext = "\r"; this.popState(); return 'SPECIALCHAR';}
<SPECIALCHAR>"\\\"'"            {yytext = "\""; this.popState(); return 'SPECIALCHAR';}
<SPECIALCHAR>"\\''"             {yytext = "'"; this.popState(); return 'SPECIALCHAR';}       
<SPECIALCHAR>"\\\\'"            {yytext = "\\"; this.popState(); return 'SPECIALCHAR';}
<SPECIALCHAR><<EOF>>            return "EOF_IN_SPECIALCHAR";
<SPECIALCHAR>[^'\\]*"'"         {this.popState(); return 'CARACTER_ERROR';}

["]                             {Texto=""; this.begin("CADENA_STR");}
<CADENA_STR>[^"\\]+             {Texto+=yytext;}
<CADENA_STR>"\\n"               {Texto+='\n';}
<CADENA_STR>"\\t"               {Texto+="\t";}
<CADENA_STR>"\\r"               {Texto+="\r";}
<CADENA_STR>"\\\""              {Texto+="\"";}
<CADENA_STR>"\\'"               {Texto+="\'";}
<CADENA_STR>"\\\\"              {Texto+="\\";}
<CADENA_STR><<EOF>>             return "EOF_IN_STRING";
<CADENA_STR>["]                 {yytext = Texto; this.popState(); return 'CADENA_STR';}

"PRINT"                         {console.log("LEX:  "+yytext); return  "PRINT_";}
"PRINTLN"                       {console.log("LEX:  "+yytext); return  "PRINTLN_";}
";"                             {console.log("LEX:  "+yytext); return  "PYC_";}
":"                             {console.log("LEX:  "+yytext); return  "DDOT_";}
"."                             {console.log("LEX:  "+yytext); return  "DOT_";}
","                             {console.log("LEX:  "+yytext); return  "COMA_";}
"("                             {console.log("LEX:  "+yytext); return  "PARL_";}
")"                             {console.log("LEX:  "+yytext); return  "PARR_";}
"["                             {console.log("LEX:  "+yytext); return  "CORL_";}
"]"                             {console.log("LEX:  "+yytext); return  "CORR_";}
"{"                             {console.log("LEX:  "+yytext); return  "LLAVEL_";}
"}"                             {console.log("LEX:  "+yytext); return  "LLAVER_";}
"++"                            {console.log("LEX:  "+yytext); return  "DMAS_";}
"--"                            {console.log("LEX:  "+yytext); return  "DMENOS_";}
"+"                             {console.log("LEX:  "+yytext); return  "MAS_";}
"-"                             {console.log("LEX:  "+yytext); return  "MENOS_";}
"*"                             {console.log("LEX:  "+yytext); return  "POR_";}
"/"                             {console.log("LEX:  "+yytext); return  "DIV_";}
"%"                             {console.log("LEX:  "+yytext); return  "MOD_";}
"^"                             {console.log("LEX:  "+yytext); return  "POT_";}
"!="                            {console.log("LEX:  "+yytext); return  "NOIGUAL_";}
"=="                            {console.log("LEX:  "+yytext); return  "IIGUAL_";}
">="                            {console.log("LEX:  "+yytext); return  "MAYORIGUAL_";}
"<="                            {console.log("LEX:  "+yytext); return  "MENORIGUAL_";}
"<"                             {console.log("LEX:  "+yytext); return  "MENOR_";}
">"                             {console.log("LEX:  "+yytext); return  "MAYOR_";}
"="                             {console.log("LEX:  "+yytext); return  "IGUAL_";}
"&&"                            {console.log("LEX:  "+yytext); return  "AND_";}
"||"                            {console.log("LEX:  "+yytext); return  "OR_";}
"!"                             {console.log("LEX:  "+yytext); return  "NOT_";}
"INT"                           {console.log("LEX:  "+yytext); return  "INT_";}
"DOUBLE"                        {console.log("LEX:  "+yytext); return  "DOUBLE_";}
"BOOLEAN"                       {console.log("LEX:  "+yytext); return  "BOOLEAN_";}
"CHAR"                          {console.log("LEX:  "+yytext); return  "CHAR_";}
"STRING"                        {console.log("LEX:  "+yytext); return  "STRING_";}
"TRUE"                          {console.log("LEX:  "+yytext); return  "TRUE_";}
"FALSE"                         {console.log("LEX:  "+yytext); return  "FALSE_";}
"?"                             {console.log("LEX:  "+yytext); return  "TERNARIO_";}
"FOR"                           {console.log("LEX:  "+yytext); return  "FOR_";}
"WHILE"                         {console.log("LEX:  "+yytext); return  "WHILE_";}
"DO"                            {console.log("LEX:  "+yytext); return  "DO_";}
"SWITCH"                        {console.log("LEX:  "+yytext); return  "SWITCH_";}
"IF"                            {console.log("LEX:  "+yytext); return  "IF_";}
"ELSE"                          {console.log("LEX:  "+yytext); return  "ELSE_";}
"NEW"                           {console.log("LEX:  "+yytext); return  "NEW_";}
"RETURN"                        {console.log("LEX:  "+yytext); return  "RETURN_";}
"CONTINUE"                      {console.log("LEX:  "+yytext); return  "CONTINUE_";}
"BREAK"                         {console.log("LEX:  "+yytext); return  "BREAK_";}
"CASE"                          {console.log("LEX:  "+yytext); return  "CASE_";}
"DEFAULT"                       {console.log("LEX:  "+yytext); return  "DEFAULT_";}
"VOID"                          {console.log("LEX:  "+yytext); return  "VOID_";}
"TOLOWER"                       {console.log("LEX:  "+yytext); return  "LOWER_";}
"TOUPPER"                       {console.log("LEX:  "+yytext); return  "UPPER_";}
"LENGTH"                        {console.log("LEX:  "+yytext); return  "LENGTH_";}
"ROUND"                         {console.log("LEX:  "+yytext); return  "ROUND_";}
"TYPEOF"                        {console.log("LEX:  "+yytext); return  "TYPEOF_";}
"TOSTRING"                      {console.log("LEX:  "+yytext); return  "TOSTRING_";}
"TOCHARARRAY"                   {console.log("LEX:  "+yytext); return  "CHARARRAY_";}
"RUN"                           {console.log("LEX:  "+yytext); return  "RUN_";}

// expresiones regulares
[a-zñA-ZÑ_][a-zñA-ZÑ0-9_]*      {console.log("LEX:  "+yytext); return "IDENT";}
[0-9]+"."[0-9]+\b               {console.log("LEX:  "+yytext);return "DOBLE";}
[0-9]+\b                        {console.log("LEX:  "+yytext);return "ENTERO";}


\"[^\"]*\"                      { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+\b                        {console.log("LEX:  "+yytext);return 'ENTERO';}
<<EOF>>                         return 'EOF'
.                               {
                                    console.log("Error Lexico " + yytext 
                                          + "linea "+ yylineno
                                          + "columna " +(yylloc.last_column+1));
                                ArbolAST.num_error++;
                                ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "LEXICO", "Símbolo "+yytext+" no reconocido.", yylloc.first_line, yylloc.first_column)); 
                                }


/lex


//Precedencia
%left 'TERNARIO_'
%left 'OR_'
%left 'AND_'
%right 'NOT_'
%left 'IIGUAL_' 'DIFERENTE_','MENOR_','MENORIGUAL_','MAYOR_'.'MAYORIGUAL_'
%left 'MAS_' 'MENOS_'
%left 'POR_' 'DIV_' 'MOD_'
%left 'POT_'
%right UMENOS
%right FCAST
%left 'DMAS_','DMENOS_'


%start INICIO

%%

INICIO : INSTRUCT EOF      {ArbolAST.instrucciones = $1; ASTree = ArbolAST; ArbolAST = new Arbol.default([]); return ASTree;}
;

INSTRUCT:INSTRUCT MINSTRUC       {$1.push($2); $$=$1;}
    |MINSTRUC                    {$$= []; $$.push($1);}            
;

MINSTRUC : PRINT_ PARL_ EXPRE PARR_ PYC_    {$$ = new Print.default(this._$.first_line, this._$.first_column, $3); }
	| PRINTLN_ PARL_ EXPRE PARR_ PYC_	    {$$ = new Println.default(this._$.first_line, this._$.first_column, $3); }
    | DECLARACION PYC_                      {$$ = $1}      
    | ASIGNACION PYC_                       {$$ = $1}     
    | FIF                                   {$$ = $1}         
    | FWHILE                                {$$ = $1}         
    | FFOR                                  {$$ = $1}           
    | FSWITCH                               {$$ = $1}         
    | INCREMENTO PYC_                       {$$ = new INC.default(this._$.first_line, this._$.first_column, $1);}      
    | DECREMENTO PYC_                       {$$ = new DEC.default(this._$.first_line, this._$.first_column, $1);}      
    | DO_WHILE                              {$$ = $1}          
    | FUNCION                               {$$ = $1}        
    | LLAMADA PYC_                          {if($1){$$ = new LLAMADA.default(this._$.first_line, this._$.first_column, $1);}else{$$="";}}    
    | FRETURN                               {$$ = $1}
    | BREAK_ PYC_                           {$$ = new BREAK.default(this._$.first_line, this._$.first_column);}        
    | CONTINUE_ PYC_                        {$$ = new CONTINUE.default(this._$.first_line, this._$.first_column);}       
    | FTERNARIO_ PYC_                       {$$ = $1}      
    | error PYC_                            {ArbolAST.num_error++;ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba  "+yytext+".", this._$.first_line, this._$.first_column));}
    | error LLAVEL_                         {ArbolAST.num_error++;ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba  "+yytext+".", this._$.first_line, this._$.first_column));}

    ;

DECLARACION : VTIPO ID                                                  {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$2, $1)}                                                      
            | VTIPO ID IGUAL_ EXPRE                                     {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$2, $1,-1,-1, $4)} 
            | VTIPO CORL_ CORR_ ID IGUAL_ NEW_ VTIPO CORL_ EXPRE CORR_  {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$4, $1,$9,-1,undefined,$7)}                          
            | VTIPO CORIZ CORDER ID IGUAL LLAVEIZ L_EXP LLAVEDER        {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$4, $1,new Literal.default(this._$.first_line, this._$.first_column,$7.length,Tipo.tipos.ENTERO),-1, $7)}
        //    | MVARIABLES
            ;
/*
MVARIABLES : VTIPO MVARIABLES COMA_ ID                                  {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$4, $1,$9,-1,undefined,$7)} 
           | VTIPO MVARIABLES IGUAL_ EXPRE 
           | ID                                                         {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$4, $1,$9,-1,undefined,$7)} 
           ;
*/

FUNCION :ID PARL_ PARR_ DDOT_ VTIPO LLAVEL_ LINS LLAVER_                {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,$5, $1, $7));}   
        |ID PARL_ PARR_ DDOT_ VTIPO LLAVEL_ LLAVER_                     {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,$5, $1, []));}  
        |ID PARL_ PARAMETROS PARR_ DDOT_ VTIPO LLAVEL_ LINS LLAVER_     {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,$6, $1, $8, $3));}     
        |ID PARL_ PARAMETROS PARR_ DDOT_ VTIPO LLAVEL_ LLAVER_          {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,$6, $1, [], $3));}
        |ID PARL_ PARAMETROS PARR_ LLAVEL_ LINS LLAVER_                 {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,new Tipo.default(Tipo.tipos.VOID), $1, $6, $3));}  
        |ID PARL_ PARR_  LLAVEL_  LINS LLAVER_                          {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,new Tipo.default(Tipo.tipos.VOID), $1, $5, undefined));}
        |ID PARL_ PARAMETROS PARR_  LLAVEL_ LLAVER_                     {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,new Tipo.default(Tipo.tipos.VOID), $1, [], $3,true));}
        |ID PARL_ PARR_ LLAVEL_ LLAVER_                                 {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,new Tipo.default(Tipo.tipos.VOID), $1, [], undefined));}
        |ID error  LLAVER_                                              {ArbolAST.num_error++; ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba el token "+yytext+".", this._$.first_line, this._$.first_column));}
;

PARAMETROS  :PARAMETROS COMA_ VTIPO ID     {$$ = []; $$ = $1; $$.push(new DECLARAR.default(this._$.first_line, this._$.first_column,$4, $3));}         
            |VTIPO ID                      {$$ = []; $$.push(new DECLARAR.default(this._$.first_line, this._$.first_column,$2, $1));} 
;

VTIPO   :INT                    {$$ = new Tipo.default(Tipo.tipos.ENTERO);}
        |DOUBLE                 {$$ = new Tipo.default(Tipo.tipos.DOBLE);}
        |CHAR                   {$$ = new Tipo.default(Tipo.tipos.CARACTER);}
        |BOOLEAN                {$$ = new Tipo.default(Tipo.tipos.BOOLEANO);}
        |STRING                 {$$ = new Tipo.default(Tipo.tipos.CADENA);}                 
        ;

EXPRE :EXPRE MAS_ EXPRE                             {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.SUMA,this._$.first_line, this._$.first_column, 0 , Tipo.tipos.ENTERO, $1, $3)}
    |EXPRE MENOS_ EXPRE                             {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.RESTA,this._$.first_line, this._$.first_column, 0 , Tipo.tipos.ENTERO, $1, $3)}
    |EXPRE POR_ EXPRE                               {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MULTIPLICACION,this._$.first_line, this._$.first_column, 0, Tipo.tipos.ENTERO, $1, $3)}
    |EXPRE DIV_ EXPRE                               {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.DIVISION,this._$.first_line, this._$.first_column, 0, Tipo.tipos.ENTERO, $1, $3)}
    |EXPRE MOD_ EXPRE                               {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MODULO,this._$.first_line, this._$.first_column, 0, Tipo.tipos.ENTERO, $1, $3)}
    |EXPRE POT_ EXPRE                               {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.POTENCIA,this._$.first_line, this._$.first_column, 0, Tipo.tipos.ENTERO, $1, $3)}
    |MENOS_ EXPRE %prec UMENOS                      {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.RESTA,this._$.first_line, this._$.first_column, 0, Tipo.tipos.ENTERO, $2)}
    |PARL_ EXPRE PARR_                              {$$ = $2}
    |LSTVALORES                                     {$$ = $1}
    |EXPRE MENOR_ EXPRE                             {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "<", $1, $3);}
    |EXPRE MAYOR_ EXPRE                             {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, ">", $1, $3);}
    |EXPRE DIFERENTE_ EXPRE                         {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "!=", $1, $3);}
    |EXPRE IIGUAL_ EXPRE                            {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "==", $1, $3);}
    |EXPRE MAYORIGUAL_ EXPRE                        {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, ">=", $1, $3);}
    |EXPRE MENORIGUAL_ EXPRE                        {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "<=", $1, $3);}
    |EXPRE AND_ EXPEXPRE                            {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "&&", $1, $3);}
    |EXPRE OR_ EXPRE                                {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "||", $1, $3);}
    |NOT EXP_                                       {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "!", $2);}
    |CAST                                           {$$ = $1}
    |FTERNARIO                                      {$$ = $1}
    |INCREMENTO                                     {$$ = $1}
    |DECREMENTO                                     {$$ = $1}
    |NATIVAS                                        {$$ = $1}
    |FTOLOWER                                       {$$ = $1}
    |FTOUPPER                                       {$$ = $1}
    |ID                                             {$$ = new Variable.default(this._$.first_line, this._$.first_column, $1);}
    |LLAMADA                                        {$$ = $1}
    |ID CORIZ  EXPRE CORDER                         {$$ = new Vector.default(this._$.first_line, this._$.first_column, $1, $3, "VECTOR");}
;

ASIGNACION  :ID IGUAL_ EXPRE                                            {$$ = new ASIGNAR.default(this._$.first_line, this._$.first_column, $1,-1, $3);}  
            |ID CORL_ EXPRE CORR_ IGUAL_ EXPRE                          {$$ = new ASIGNAR.default(this._$.first_line, this._$.first_column, $1,$3, $6,"VECTOR");}  
        ;


LSTVALORES  :ENTERO             {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.ENTERO)}
            |DOBLE              {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.DOBLE)}
            |CARACTER           {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.CARACTER)}
            |Cadena             {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.CADENA)}
            |TRUE               {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.BOOLEANO)}
            |FALSE              {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.BOOLEANO)}
            |VOID               {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.VOID)}
;


FFOR   :FOR_ PARL_ DECLARACION PYC_ EXPRE PYC_ ACTUALIZACION  LLAVEL_ LINS LLAVER_     {$$ = new FOR.default(this._$.first_line, this._$.first_column, $3, $5, $7, $9, "DEC");}       
        |FOR_ PARL_ ASIGNACION PYC_ EXPRE PYC_ ACTUALIZACION  LLAVEL_ LINS LLAVER_     {$$ = new FOR.default(this._$.first_line, this._$.first_column, $3, $5, $7, $9, "ASIG");} 
        |FOR_ PARL_ ASIGNACION PYC_ EXPRE PYC_ ACTUALIZACION  LLAVEL_ LLAVER_          {$$ = new FOR.default(this._$.first_line, this._$.first_column, $3, $5, $7, [], "ASIG");} 
        |FOR_ PARL_ DECLARACION PYC_ EXPRE PYC_ ACTUALIZACION LLAVEL_ LLAVER_          {$$ = new FOR.default(this._$.first_line, this._$.first_column, $3, $5, $7, [], "DEC");} 
        |FOR_ error   PYC_                                                            {ArbolAST.num_error++; ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba el token "+yytext+".", this._$.first_line, this._$.first_column));}
;

FIF :IF_ PARL_ EXPRE PARR_ LLAVEL_ LINS LLAVER_                               {$$ = new IF.default(this._$.first_line, this._$.first_column, $3, $6)}                                
    |IF_ PARL_ EXPRE PARR_ LLAVEL_ LLAVER_                                    {$$ = new IF.default(this._$.first_line, this._$.first_column, $3, [])}       
    |IF_ PARL_ EXPRE PARR_ LLAVEL_ LINS LLAVER_ ELSE_ FIF                     {$$ = new IF.default(this._$.first_line, this._$.first_column, $3, $6, undefined, $9)}
    |IF_ PARL_ EXPRE PARR_ LLAVEL_ LINS LLAVER_ ELSE_ LLAVEL_ LINS LLAVER_    {$$ = new IF.default(this._$.first_line, this._$.first_column, $3, $6, $10)}       
    |IF_ PARL_ EXPRE PARR_ LLAVEL_ LLAVER_ ELSE_ LLAVEL_ LLAVER_              {$$ = new IF.default(this._$.first_line, this._$.first_column, $3, [], [])}       
    |IF_ error  EXPRE                                                   {ArbolAST.num_error++; ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba el token "+yytext+".", this._$.first_line, this._$.first_column));}             
;


FSWITCH :SWITCH_ PARL_ EXPRE PARR_ LLAVEL_ LCASOS DEFAULT_ DDOT_ LINS LLAVER_ {$$ = new SWITCH.default(this._$.first_line, this._$.first_column,$3,$6, $9)}            
        |SWITCH_ PARL_ EXPRE PARR_ LLAVEL_ LCASOS LLAVER_                     {$$ = new SWITCH.default(this._$.first_line, this._$.first_column,$3,$6, undefined)}           
        |SWITCH_ PARL_ EXPRE PARR_ LLAVEL_ DEFAULT_ DDOT_ LINS LLAVER_        {$$ = new SWITCH.default(this._$.first_line, this._$.first_column,$3,undefined, $8)}            
        |SWITCH_ error  PARR_                                               {ArbolAST.num_error++; ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba el token "+yytext+".", this._$.first_line, this._$.first_column));}               
;

LCASOS  :LCASOS CASE_ EXPRE DDOT_ LINS        {$$ = []; $$=$1; $$.push({Case:$3, INS:$5});}                                             
        |CASE_ EXPRE DDOT_ LINS               {$$ = []; $$.push({Case:$2, INS:$4});}                                           
;


LLAMADA :ID PARL_ L_EXP PARR_           {$$ = new FUNCION.default(this._$.first_line, this._$.first_column, $1, $3);}        
        |ID PARL_ PARR_                 {$$ = new FUNCION.default(this._$.first_line, this._$.first_column, $1, undefined);}   
        |RUN_ ID PARL_ L_EXP PARR_      {$$ = undefined; ArbolAST.run_.push(new FUNCION.default(this._$.first_line, this._$.first_column, $2, $4));}  
        |RUN_ ID PARL_ PARR_            {$$ = undefined; ArbolAST.run_.push(new FUNCION.default(this._$.first_line, this._$.first_column, $2, undefined));}   
    ;



FWHILE :WHILE_ PARL_ EXPRE PARR_ LLAVEL_ LINS LLAVER_         {$$ = new WHILE.default(this._$.first_line, this._$.first_column, $3, $6);}         
        |WHILE_ PARL_ EXPRE PARR_ LLAVEL_ LLAVER_             {$$ = new WHILE.default(this._$.first_line, this._$.first_column, $3, []);}     
        | WHILE_ error PARR_                                {ArbolAST.num_error++; ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba el token "+yytext+".", this._$.first_line, this._$.first_column));}       
;

DOWHILE   :DO_ LLAVEL_ LINS LLAVER_ WHILE_ PARL_ EXPRE PARR_ PYC_           {$$ = new DOWHILE.default(this._$.first_line, this._$.first_column, $7, $3);}         
            |DO_ LLAVEL_ LLAVER_ WHILE_ PARL_ EXPRE PARR_ PYC_              {$$ = new DOWHILE.default(this._$.first_line, this._$.first_column, $7, []);} 
            |DO_ error  LLAVER_                                             {ArbolAST.num_error++; ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba el token "+yytext+".", this._$.first_line, this._$.first_column));}    
            ;


ACTUALIZACION   : ASIGNACION   PARR_     {$$ = $1}
                | INCREMENTO   PARR_     {$$ = new INC.default(this._$.first_line, this._$.first_column, $1);}
                | DECREMENTO   PARR_     {$$ = new DEC.default(this._$.first_line, this._$.first_column, $1);}
                ;

NATIVAS
    :LENGTH PARL_ EXPRE PARR_          {$$ = new NATIVAS.default(this._$.first_line, this._$.first_column, $1, $3);}
    |TYPEOF PARL_ EXPRE PARR_          {$$ = new NATIVAS.default(this._$.first_line, this._$.first_column, $1, $3);}
    |TOSTRING PARL_ EXPRE PARR_        {$$ = new NATIVAS.default(this._$.first_line, this._$.first_column, $1, $3);}
    |CHARARRAY PARL_ EXPRE PARR_       {$$ = new NATIVAS.default(this._$.first_line, this._$.first_column, $1, $3);}
;

CAST
    :PARL_ VTIPO PARR_ EXPRE %prec FCAST     {$$ = new Casteo.default(this._$.first_line, this._$.first_column, 0,$2, $4)}
;

L_EXP
    :L_EXP COMA_ EXPRE     {$$ = $1; $$.push($3);}
    |EXPRE                 {$$ = []; $$.push($1);}
;

FRETURN : RETURN_ PYC_                                                  {$$ = new RETURN.default(this._$.first_line, this._$.first_column);}     
        | RETURN_ EXPRE PYC_                                            {$$ = new RETURN.default(this._$.first_line, this._$.first_column, $2);}
;

INCREMENTO
    :EXPRE DMAS_                    {$$ = new Incremento.default(this._$.first_line, this._$.first_column, $1)}
;

DECREMENTO
    :EXPRE DMENOS_                  {$$ = new Decremento.default(this._$.first_line, this._$.first_column, $1)}
;

FTERNARIO
    :EXPRE TERNARIO_ EXPRE DDOT_ EXPRE     {$$ = new TERNARIO.default(this._$.first_line, this._$.first_column, $1, $3, $5);}
;
                                     
FTOLOWER
    :LOWER_ PARL_ EXPRE PARR_          {$$ = new TOLOWER.default(this._$.first_line, this._$.first_column,$3)}
;                        
FTOUPPER
    :UPPER_ PARL_ EXPRE PARR_          {$$ = new TOUPPER.default(this._$.first_line, this._$.first_column,$3)}
;  


