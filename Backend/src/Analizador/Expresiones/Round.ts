import { NodeAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";
import { Expresion } from "./Expresion";
import Literal from "./Literal";
import VARIABLE from "./Variables";

export default class Round extends Expresion {
    public nombre:string;
    public exp:Expresion;
    constructor(linea:number, columna:number, nombre:string, exp:Expresion){
        super(linea,columna, undefined,new Tipo(tipos.CADENA));
        this.nombre = nombre;
        this.exp = exp;
    }

    getValor(arbol: ArbolAST, tabla: Entorno):Expresion {
        let valor = this.exp.getValor(arbol, tabla);
        if (valor) {
            let comp:any = undefined;
            if (this.exp instanceof VARIABLE) {
                comp = tabla.get(this.exp.nombre);
            }
            if(this.nombre.toUpperCase()=="ROUND"){
                    if (typeof(valor.valor) !== typeof(1)) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","El valor ingresado debe ser de tipo int o  double",this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    }
                    return new Literal(this.linea, this.columna, Math.round(valor.valor), tipos.ENTERO);
                }else{
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","función inexistente",this.linea, this.columna));
                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);

            }
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","El valor no existe",this.linea, this.columna));
        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
    }

    getNodo():NodeAST{
        let nodo = new NodeAST("Round");
        nodo.agregarHijo(this.nombre.toUpperCase());
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.exp.getNodo());
        nodo.agregarHijo(")");
        return nodo;
    }
}