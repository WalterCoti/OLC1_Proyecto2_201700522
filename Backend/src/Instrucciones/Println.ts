import { Instruccion } from "../Abstracto/instrucciones";
import { nodoAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import { Expresion } from "../Expresiones/Expresion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";

export default class Println extends Instruccion {
    public exp: Expresion | any;
    constructor(linea:number, columna:number, exp?:Expresion){
        super(linea, columna);
        this.exp = exp;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        if (this.exp) {
            var result = this.exp.getValor(arbol, tabla);
            if (result) {
                if (result.Tipo.tipos!=tipos.ERROR) {
                    if (result.valor instanceof Array) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede imprimir un vector",this.linea, this.columna));   
                        return;
                    }
                    this.ast = true;
                    if (arbol.consola==="") {
                        arbol.consola+=result.valor;
                    }else{
                        arbol.consola+="\n"+result.valor;
                    }
                }
            }
        }
    }

    getNodo():nodoAST{
        let nodo:nodoAST = new nodoAST("PRINT");
        nodo.agregarHijo("println");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined,undefined,this.exp.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo(";");
        return nodo;
    }
}