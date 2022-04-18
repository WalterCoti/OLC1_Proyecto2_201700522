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
<<EOF>>                         return 'EOF';
.                               {ArbolAST.num_error++;
                                ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "LEXICO", "Símbolo "+yytext+" no reconocido.", yylloc.first_line, yylloc.first_column)); 
                                }






/lex

/* IMPORTS */

%{
    const Aritmetica = require('./Expresiones/Aritmeticas');
    const Casteo = require('./Expresiones/Casteos');
    const Condicion = require('./Expresiones/condiciones');
    const Decremento = require('./Expresiones/Decremento');
    const Expresion = require('./Expresiones/Expresion');
    const FUNCION = require('./Expresiones/Funciones')
    const Incremento = require('./Expresiones/Incrementos');
    const Literal = require('./Expresiones/Literal');
    const NATIVAS = require('./Expresiones/Nativas');
    const TERNARIO = require('./Expresiones/Ternarios');
    const TOLOWER = require('./Expresiones/toLower');
    const TOUPPER = require('./Expresiones/toUpper');
    const Variable = require('./Expresiones/Variables');
    const Vector = require('./Expresiones/vector');
    
    const ASIGNAR = require('./Instrucciones/ASIGNAR')
    const BREAK = require('./Instrucciones/Break');
    const CONTINUE = require('./Instrucciones/Continue');
    const DECLARAR = require('./Instrucciones/DECLARAR');
    const DEC = require('./Instrucciones/Decremento');
    const INC = require('./Instrucciones/incrementar');
    const IF = require('./Instrucciones/IF');
    const FOR = require('./Instrucciones/For');
    const DOWHILE = require('./Instrucciones/dowhile');
    const FUNC = require('./Instrucciones/Funcion');
    const LLAMADA = require('./Instrucciones/Llamada');
    const Print = require('./Instrucciones/Print');
    const Println = require('./Instrucciones/Println');
    const RETURN = require('./Instrucciones/Return');
    const SWITCH = require('./Instrucciones/Switch');
    const WHILE = require('./Instrucciones/while');
    const Excepcion = require('./Exceptions/Excepcion');
    const Instruccion = require('./Abstracto/instrucciones');
    const Arbol = require('./AST/ASTTree');
    const Tipo = require('./AST/Stype');
    let Texto="";
    let ArbolAST = new Arbol.default([]);
    let ArbolAST2 = new Arbol.default([]);
%}



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



%start INIT
//Inicio
//Definicion de gramatica
%%

INI : LINS EOF      {ArbolAST.instrucciones = $1; ArbolAST2 = ArbolAST; ArbolAST = new Arbol.default([]); return ArbolAST2;}
    | error EOF     {ArbolAST.num_error++;ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba  "+yytext+".", this._$.first_line, this._$.first_column));}
    | error         {}        
;

LINS:LINS INS       {$1.push($2); $$=$1;}
    |INS            {$$= []; $$.push($1);}            
;

INS : PRINT_ PARL_ EXP PARR_ PYC_           {$$ = new Print.default(this._$.first_line, this._$.first_column, $3); }
	| PRINTLN_ PARL_ EXP PARR_ PYC_	        {$$ = new Println.default(this._$.first_line, this._$.first_column, $3); }
    | DECLARACION PYC_                      {$$ = $1}      
    | ASIGNACION PYC_                       {$$ = $1}     
    | FIF_                                  {$$ = $1}         
    | FWHILE_                               {$$ = $1}         
    | FFOR_                                 {$$ = $1}           
    | FSWITCH_                              {$$ = $1}         
    | INCREMENTO PYC_                       {$$ = new INC.default(this._$.first_line, this._$.first_column, $1);}      
    | DECREMENTO PYC_                       {$$ = new DEC.default(this._$.first_line, this._$.first_column, $1);}      
    | DO_WHILE_                             {$$ = $1}          
    | FUNCION                               {$$ = $1}        
    | LLAMADA PYC_                          {if($1){$$ = new LLAMADA.default(this._$.first_line, this._$.first_column, $1);}else{$$="";}}    
    | FRETURN                               {$$ = $1}
    | BREAK_ PYC_                           {$$ = new BREAK.default(this._$.first_line, this._$.first_column);}        
    | CONTINUE_ PYC_                        {$$ = new CONTINUE.default(this._$.first_line, this._$.first_column);}       
    | FTERNARIO_ PYC_                       {$$ = $1}      
    | ID DOT_ ADD PARL_ EXP PARR_ PYC_      {$$ = new ADD.default(this._$.first_line, this._$.first_column, $1, $5);}       
    | error PYC_                            {ArbolAST.num_error++;ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba el lexema "+yytext+".", this._$.first_line, this._$.first_column));}      
    | error LLAVER_                         {ArbolAST.num_error++;ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba el lexema "+yytext+".", this._$.first_line, this._$.first_column));}
;

FRETURN : RETURN_ PYC_                      {$$ = new RETURN.default(this._$.first_line, this._$.first_column);}     
        | RETURN_ EXP PYC_                  {$$ = new RETURN.default(this._$.first_line, this._$.first_column, $2);}
;

DECLARACION : FTIPO ID                                                          
            | FTIPO ID IGUAL_ EXP                                                
            | FTIPO CORL_ CORR_ ID IGUAL_ NEW_ FTIPO CORL_ EXP CORR_                            
            ;



ASIGNACION  :ID IGUAL_ EXP                                  
            |ID CORL_ CORL_ EXP CORR_ CORR_ IGUAL_ EXP    
            |ID CORL_ EXP CORR_ IGUAL_ EXP                 
        ;

FUNCION :ID PARL_ PARR_ DDOT_ FTIPO LLAVEL_ LINS LLAVER_                
        |ID PARL_ PARR_ DDOT_ FTIPO LLAVEL_ LLAVER_                     
        |ID PARL_ PARAMETROS PARR_ DDOT_ FTIPO LLAVEL_ LINS LLAVER_     
        |ID PARL_ PARAMETROS PARR_ DDOT_ FTIPO LLAVEL_ LLAVER_          
        |ID PARL_ PARAMETROS PARR_ DDOT_ FTIPO LLAVEL_ LINS LLAVER_      
        |VOID_ ID PARL_ PARR_ LLAVEL_ LINS LLAVER_                 
        |VOID_ ID PARL_ PARAMETROS PARR_ LLAVEL_ LLAVER_           
        |VOID_ ID PARL_ PARR_ LLAVEL_ LLAVER_                      
        |VOID_ errOR_ LLAVER_                                        
;

PARAMETROS  :PARAMETROS COMA_ FTIPO ID        
            |FTIPO ID                        
;

FIF_:IF_ PARL_ EXP PARR_ LLAVEL_ LINS LLAVER_                                      
    |IF_ PARL_ EXP PARR_ LLAVEL_ LLAVER_                                           
    |IF_ PARL_ EXP PARR_ LLAVEL_ LINS LLAVER_ ELSE_ FIF_                             
    |IF_ PARL_ EXP PARR_ LLAVEL_ LINS LLAVER_ ELSE_ LLAVEL_ LINS LLAVER_           
    |IF_ PARL_ EXP PARR_ LLAVEL_ LLAVER_ ELSE_ LLAVEL_ LLAVER_                     
    |IF_ errOR_ LLAVER_                                                                  
;

FSWITCH_:SWITCH_ PARL_ EXP PARR_ LLAVEL_ LCASOS DEFAULT_ DDOT_ LINS LLAVER_             
        |SWITCH_ PARL_ EXP PARR_ LLAVEL_ LCASOS LLAVER_                                
        |SWITCH_ PARL_ EXP PARR_ LLAVEL_ DEFAULT_ DDOT_ LINS LLAVER_                    
        |SWITCH_ errOR_ PARR_                                                             
;

LCASOS  :LCASOS CASE_ EXP DDOT_ LINS                                                   
        |CASE_ EXP DDOT_ LINS                                                          
;

FWHILE_ :WHILE_ PARL_ EXP PARR_ LLAVEL_ LINS LLAVER_             
        |WHILE_ PARL_ EXP PARR_ LLAVEL_ LLAVER_                  
        |WHILE_ errOR_ LLAVER_                                     
;

FFOR_   :FOR_ PARL_ DECLARACION PYC_ EXP PYC_ ACTUALIZACION  LLAVEL_ LINS LLAVER_     
        |FOR_ PARL_ ASIGNACION PYC_ EXP PYC_ ACTUALIZACION  LLAVEL_ LINS LLAVER_      
        |FOR_ PARL_ ASIGNACION PYC_ EXP PYC_ ACTUALIZACION  LLAVEL_ LLAVER_           
        |FOR_ PARL_ DECLARACION PYC_ EXP PYC_ ACTUALIZACION  LLAVEL_ LLAVER_          
        |FOR_ errOR_ LLAVER_                                                    
;

ACTUALIZACION   : ASIGNACION PARR_     
                | INCREMENTO PARR_    
                | DECREMENTO PARR_    
                ;

DO_WHILE_   :DO_ LLAVEL_ LINS LLAVER_ WHILE_ PARL_ EXP PARR_ PYC_             
            |DO_ LLAVEL_ LLAVER_ WHILE_ PARL_ EXP PARR_ PYC_                  
            |DO_ errOR_ PYC_                                                    
            ;

LLAMADA :ID PARL_ L_EXP PARR_              
        |ID PARL_ PARR_                    
        |EXEC ID PARL_ L_EXP PARR_         
        |EXEC ID PARL_ PARR_               
    ;

FTIPO   :INT_                    
        |DOUBLE_                 
        |CHAR_                   
        |BOOLEAN_                
        |STRING_                 
    ;

EXP :EXP MAS_ EXP                                    
    |EXP MENOS_ EXP                                  
    |EXP POR_ EXP                                    
    |EXP DIV_ EXP                                    
    |EXP MOD_ EXP                                    
    |EXP POT_ EXP                                  
    |MENOS_ EXP %prec UMENOS_                         
    |PARL_ EXP PARR_                                                           
    |EXP MENOR_ EXP                                  
    |EXP MAYOR_ EXP                                  
    |EXP NOIGUAL_ EXP                              
    |EXP IIGUAL_ EXP                                 
    |EXP MAYORIGUAL_ EXP                             
    |EXP MENORIGUAL_ EXP                             
    |EXP AND_ EXP                                    
    |EXP OR_ EXP                                     
    |NOT_ EXP                                        
    |CAST                                           
    |FTERNARIO_                                      
    |INCREMENTO                                     
    |DECREMENTO                                     
    |NATIVAS                                        
    |FTOLOWER_                                       
    |FTOUPPER_                                       
    |ID                                             
    |LLAMADA                                        
    |ID CORL_ EXP CORR_                           
    |ID CORL_ CORL_ EXP CORR_ CORR_               
;

LISTAVALOR_ES :  ENTERO             
                |DO_BLE              
                |CARACTER           
                |Cadena             
                |TRUE_               
                |FALSE_              
            ;

CAST: PARL_ FTIPO PARR_ EXP %prec FCAST     
    ;

L_EXP   :L_EXP COMA_ EXP     
        |EXP                
    ;

INCREMENTO : EXP DMAS_            
;

DECREMENTO : EXP DMENOS_             
;

FTERNARIO_ : EXP TERNARIO_ EXP DDOT_ EXP     
;
                                     
FTOLOWER_  : LOWER_ PARL_ EXP PARR_       
;               

FTOUPPER_  : UPPER_ PARL_ EXP PARR_       
;         

NATIVAS :LENGTH_ PARL_ EXP PARR_                 
        |ROUND_ PARL_ EXP PARR_           
        |TYPEOF_ PARL_ EXP PARR_          
        |TOSTRING_ PARL_ EXP PARR_        
        |CHARARRAY_ PARL_ EXP PARR_     
;
