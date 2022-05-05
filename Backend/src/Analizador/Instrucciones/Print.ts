import { Instruccion } from "../Abstracto/instrucciones";
import { NodeAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import { Expresion } from "../Expresiones/Expresion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";

export default class Print extends Instruccion {
    public exp: Expresion | any;
    constructor(linea:number, columna:number, exp?:Expresion){
        super(linea, columna);
        this.exp = exp;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        if (this.exp) {
            var result = this.exp.getValor(arbol, tabla);
            if (result) {
                if (result.Tipo.tipos!=tipos.ERROR) {
                    if (result.valor instanceof Array) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","No se puede imprimir un vector",this.linea, this.columna));   
                        return;
                    }
                    this.ast = true;
                    arbol.consola+=result.valor;
                }
            }
        }
    }

    getNodo():NodeAST{
        let nodo:NodeAST = new NodeAST("Print");
        nodo.agregarHijo("print");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined,undefined,this.exp.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo(";");
        return nodo;
    }
}