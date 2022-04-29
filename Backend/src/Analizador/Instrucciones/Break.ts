import { Instruccion } from "../Abstracto/instrucciones";
import { NodeAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";

export default class BREAK extends Instruccion {
    constructor(linea:number, columna:number){
        super(linea, columna);
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        if (arbol.pilaCiclo.length==0) {
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede utiilzar break fuera de un ciclo", this.linea, this.columna));
            return;
        }
        this.ast = true;
        return {nombre:"BREAK", retorno:undefined};
        //ERROR
    }

    getNodo():NodeAST{
        let nodo:NodeAST = new NodeAST("BREAK");
        nodo.agregarHijo("BREAK");
        nodo.agregarHijo(";")
        return nodo;
    }
}