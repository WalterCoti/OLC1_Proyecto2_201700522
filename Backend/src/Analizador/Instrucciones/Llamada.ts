import { Instruccion } from "../Abstracto/instrucciones";
import { NodeAST } from "../Abstracto/NodeAST";
import { Expresion } from "../Expresiones/Expresion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";

export default class LLAMADA extends Instruccion {
    public exp: Expresion | any;
    constructor(linea:number, columna:number, exp?:Expresion){
        super(linea, columna);
        this.exp = exp;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        if (this.exp) {
            return this.exp.getValor(arbol, tabla);
        }

    }
    getNodo():NodeAST{
        let nodo:NodeAST = new NodeAST("");
        console.log(this.exp);
        nodo = this.exp.getNodo();
        nodo.agregarHijo(";");
        return nodo;
    }

}