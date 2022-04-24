import { nodoAST } from "../Abstracto/NodeAST";
import { Expresion } from "./Expresion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";
import Literal from "./Literal";

export default class VARIABLE extends Expresion {
    public expre:Literal|any;
    constructor(linea: number, columna: number, nombre:string) {
        const tip = new Tipo(tipos.ENTERO);
        super(linea, columna, 0, tip, nombre);
        this.nombre = nombre;
    }
    public getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
        let expre = tabla.get(this.nombre);
        if (expre.tipo.tipos !== tipos.ERROR){
            this.expre = expre;
            return expre.valor;
        }
        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
    }
    
    getNodo():nodoAST{
        let nodo = new nodoAST("VARIABLE");
        nodo.agregarHijo(this.nombre);
        return nodo;
    }

}