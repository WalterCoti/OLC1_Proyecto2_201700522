import { NodeAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";
import { Expresion } from "./Expresion";
import Literal from "./Literal";
import VARIABLE from "./Variables";

export default class NATIVA extends Expresion {
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
            switch(this.nombre.toUpperCase()){
                case "LENGTH":
                    if (!(valor.valor instanceof Array) && typeof(valor.valor)!== typeof("")) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","El valor ingresado no es vector o string",this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    }
                    return new Literal(this.linea, this.columna, valor.valor.length, tipos.ENTERO);
                case "ROUND":
                    if (typeof(valor.valor) !== typeof(1)) {
                        arbol.num_error++;
                        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","El valor ingresado debe ser de tipo int o  double",this.linea, this.columna));
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                    }
                    return new Literal(this.linea, this.columna, Math.round(valor.valor), tipos.ENTERO);
                case "TYPEOF":
                    switch(valor.Tipo.tipos){
                        case tipos.ENTERO:
                            return new Literal(this.linea, this.columna, "INT", tipos.CADENA);
                        case tipos.BOOLEANO:
                            return new Literal(this.linea, this.columna, "BOOLEAN", tipos.CADENA);
                        case tipos.CARACTER:
                            return new Literal(this.linea, this.columna, "CHAR", tipos.CADENA);
                        case tipos.DOBLE:
                            return new Literal(this.linea, this.columna, "DOUBLE", tipos.CADENA);
                        case tipos.CADENA:
                            return new Literal(this.linea, this.columna, "STRING", tipos.CADENA);
                        default:
                            return new Literal(this.linea, this.columna, "error", tipos.ERROR);
                    }
                case "TOSTRING":
                    if (valor.valor instanceof Literal) {
                        if (valor.valor.valor instanceof Array) {
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","No se puede convertir un vector  en string",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, "error", tipos.ERROR);
                        }
                    }
                    return new Literal(this.linea, this.columna, String(valor.valor), tipos.CADENA);
                default:
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
        let nodo = new NodeAST("Nativa");
        nodo.agregarHijo(this.nombre.toUpperCase());
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.exp.getNodo());
        nodo.agregarHijo(")");
        return nodo;
    }
}