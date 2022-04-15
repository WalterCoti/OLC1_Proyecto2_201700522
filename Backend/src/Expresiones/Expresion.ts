import { node } from "../Abstracto/Node";
import { nodoAST } from "../Abstracto/nodeAST";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";

export abstract class Expresion extends node {

    public Tipo:Tipo;
    public valor:any;
    public nombre:string|any;
    public posicion:Expresion|any;
    constructor(linea : number, columna:number, valor:any, tipo:Tipo, nombre?:string, Posicion?:Expresion) {
        super(linea, columna);
        this.Tipo = tipo;
        this.valor = valor;
        this.nombre = nombre;
        if (Posicion) {
            this.posicion = Posicion;
        }else{
            this.posicion = -1;
        }
    }

    abstract getValor(arbol: ArbolAST, tabla: Entorno):any;
    public abstract getNodo():nodoAST;
    // TODO graficar AST
}