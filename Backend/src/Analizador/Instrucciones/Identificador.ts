import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";
import { Expresion } from "../Expresiones/Expresion";
import Simbolo from "../AST/simbolo";
import { NodeAST } from "../Abstracto/NodeAST";

export default class identificador extends Expresion {
    public ID: String;
    constructor(linea:number, columna:number, valor:any, Tipo:Tipo, ID:String){
        super(linea,columna,valor,Tipo);
        this.ID = ID;

    }
    getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
       var simb:Simbolo = tabla.get(this.ID);
       this.valor = simb.valor;
       this.Tipo = simb.tipo;
       return this;
    }

    getNodo():NodeAST{
        let nodo:NodeAST = new NodeAST("IDENTIFICADOR");
        return nodo;
    }

}