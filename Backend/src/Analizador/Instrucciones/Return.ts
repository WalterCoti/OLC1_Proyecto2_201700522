import { Instruccion } from "../Abstracto/instrucciones";
import { NodeAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import { Expresion } from "../Expresiones/Expresion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";

export default class RETURN extends Instruccion {
    public exp:Expresion | any;
    constructor(linea:number, columna:number, exp?:Expresion){
        super(linea, columna);
        this.exp = exp;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        if (arbol.pilaFuncion.length==0) {
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede utiilzar return fuera de una funcion", this.linea, this.columna));
            return;
        }
        if (this.exp) {
            let valor = this.exp.getValor(arbol, tabla);
            if(valor){
                return {nombre:"RETURN", retorno:valor};
            }
        }
        return {nombre:"RETURN", retorno:undefined};
    }
    getNodo():NodeAST{
        let nodo:NodeAST = new NodeAST("RETURN");
        nodo.agregarHijo("RETURN");
        if (this.exp) {
            nodo.agregarHijo(undefined, undefined, this.exp.getNodo());
        }
        nodo.agregarHijo(";")
        return nodo;
    }
}