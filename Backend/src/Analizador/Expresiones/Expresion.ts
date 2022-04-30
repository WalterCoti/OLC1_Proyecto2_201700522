import { node } from "../Abstracto/Node";
import { NodeAST } from "../Abstracto/NodeAST";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";

export abstract class Expresion extends node {

    public Tipo:Tipo;
    public valor:any;
    public nombre:string|any;
    public posicion:Expresion|any;
    constructor(linea : number, columna:number, valor:any, tipo:Tipo, nombre?:string, Pos_?:Expresion) {
        super(linea, columna);
        this.Tipo = tipo;
        this.valor = valor;
        this.nombre = nombre;
        if (Pos_) {
            this.posicion = Pos_;
        }else{
            this.posicion = -1;
        }
    }

    abstract getValor(arbol: ArbolAST, tabla: Entorno):any;
    public abstract getNodo():NodeAST;
    // TODO graficar AST
}