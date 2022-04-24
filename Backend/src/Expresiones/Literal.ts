import { nodoAST } from "../Abstracto/NodeAST";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";
import { Expresion } from "./Expresion";


export default class Literal extends Expresion {
    
    public LOV:string;
    constructor(linea: number, columna: number, valor: any, T: tipos, vector?:boolean, L:string="") {
        const tip = new Tipo(T);
        if (!vector) {
            switch (tip.tipos) {
                case tipos.ENTERO:
                    valor = Number(valor);
                    break;
                case tipos.BOOLEANO:
                    if (typeof(valor)==typeof("") && valor.toUpperCase() === "FALSE") {
                        valor = false;
                    } else if(typeof(valor)==typeof("")) {
                        valor = true;
                    }
                    break;
                case tipos.DOBLE:
                    valor = Number(parseFloat(valor));
                    break;
                default:
                    valor = valor;
            }
        }
        super(linea, columna, valor, tip);
        this.LOV = L;
    }
    public getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
        return this;
    }

    public getNodo():nodoAST{
        let nodo:nodoAST = new nodoAST(this.Tipo.tipos);
        nodo.agregarHijo(String(this.valor));
        return nodo;
    }
}