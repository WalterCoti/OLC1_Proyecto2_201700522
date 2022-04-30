import { NodeAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import { Expresion } from "./Expresion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";
import Literal from "./Literal";
import VARIABLE from "./Variables";

export default class DECREMENTO extends Expresion {

    public exp:Expresion;
    constructor(linea: number, columna: number, exp:Expresion) {
        const tip = new Tipo(tipos.ENTERO);
        super(linea, columna, 0, tip);
        this.exp = exp;
    }
    public getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
        let comprobar = this.exp.getValor(arbol, tabla);
        if (comprobar.Tipo.tipos!==tipos.ERROR) {
            if (comprobar.Tipo.tipos===tipos.CADENA) {
                return new Literal(this.linea, this.columna, comprobar.valor.toUpperCase(), tipos.CADENA);
            }
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","ToUpper solo se puede realizar en un string",this.linea, this.columna));
            return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
        }
        if (this.exp instanceof VARIABLE) {
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","La variable indicada no existe",this.linea, this.columna));
            return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
        }
        return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
    }
    getNodo():NodeAST{
        let nodo = new NodeAST("TOUPPER");
        nodo.agregarHijo("ToUpper");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.exp.getNodo());
        nodo.agregarHijo(")");
        return nodo;
    }

}