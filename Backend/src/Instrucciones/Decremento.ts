import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "../Abstracto/instrucciones";
import { nodoAST } from "../Abstracto/NodeAST";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";

export default class DECREMENT extends Instruccion {
    public exp: Expresion | any;
    constructor(linea:number, columna:number, exp?:Expresion){
        super(linea, columna);
        this.exp = exp;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        if (this.exp) {
            var v = this.exp.getValor(arbol, tabla);
        }
        //ERROR
    }

    getNodo():nodoAST{
        let nodo:nodoAST = this.exp.getNodo();
        nodo.agregarHijo(";");
        return nodo;
    }

}