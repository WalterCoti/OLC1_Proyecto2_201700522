import Arbol from "../AST/ASTTree";
import TablaSimbolos from "../AST/Environment";
import { NodeAST } from "./NodeAST";

export abstract class Instruccion {

    public linea: number;
    public columna: number;
    public ast:boolean=false;
    constructor(linea : number, columna:number) {
        this.linea = linea;
        this.columna = columna;
    }

    abstract ejecutar(arbol: Arbol, tabla: TablaSimbolos):any;
    public abstract getNodo():NodeAST;

}