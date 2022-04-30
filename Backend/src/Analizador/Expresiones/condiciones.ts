import { NodeAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";
import { Expresion } from "./Expresion";
import Literal from "./Literal";

export default class condicion extends Expresion {
    public Expizquierdo:Expresion|undefined;
    public Expderecho: Expresion|undefined;
    public operador = "";
    constructor(linea:number, columna:number, valor:any, operador:string, iz:Expresion, der?:Expresion){
        super(linea,columna,valor,new Tipo(tipos.BOOLEANO));
        if (der) {
            this.Expderecho =der;
        }
        this.Expizquierdo = iz;
        this.operador = operador;
    }

    getValor(arbol: ArbolAST, tabla: Entorno):Expresion {
        var izquierda:Expresion|undefined;
        var derecha:Expresion|undefined;
        if (this.Expizquierdo) {
            izquierda = this.Expizquierdo.getValor(arbol, tabla);
        }
        if (this.Expderecho) {
            derecha = this.Expderecho.getValor(arbol, tabla);
        }

        switch(this.operador){
            case "<":
                switch(izquierda?.Tipo.tipos){
                    case tipos.ENTERO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor < derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CARACTER:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor.charCodeAt() < derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor.charCodeAt() < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor.charCodeAt() < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CADENA:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                if (izquierda?.valor < derecha?.valor.toChar) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    case tipos.DOBLE:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor < derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.BOOLEANO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                if (izquierda?.valor < derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    default:
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }
            case ">":
                switch(izquierda?.Tipo.tipos){
                    case tipos.ENTERO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor > derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CARACTER:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor.charCodeAt() > derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor.charCodeAt() > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor.charCodeAt() > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CADENA:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                if (izquierda?.valor > derecha?.valor.toChar) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    case tipos.DOBLE:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor > derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.BOOLEANO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                if (izquierda?.valor > derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    default:
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }
            case "<=":
                switch(izquierda?.Tipo.tipos){
                    case tipos.ENTERO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor <= derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CARACTER:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor.charCodeAt() <= derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor.charCodeAt() <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor.charCodeAt() <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CADENA:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                if (izquierda?.valor <= derecha?.valor.toChar) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    case tipos.DOBLE:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor <= derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.BOOLEANO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                if (izquierda?.valor <= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    default:
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }

            case ">=":
                switch(izquierda?.Tipo.tipos){
                    case tipos.ENTERO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor >= derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CARACTER:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor.charCodeAt() >= derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor.charCodeAt() >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor.charCodeAt() >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CADENA:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                if (izquierda?.valor >= derecha?.valor.toChar) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    case tipos.DOBLE:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor >= derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.BOOLEANO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                if (izquierda?.valor >= derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    default:
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }

            case "==":
                switch(izquierda?.Tipo.tipos){
                    case tipos.ENTERO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor === derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CARACTER:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor.charCodeAt() === derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor.charCodeAt() === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor.charCodeAt() === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CADENA:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                if (izquierda?.valor === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    case tipos.DOBLE:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor === derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.BOOLEANO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                if (izquierda?.valor === derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    default:
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }


            case "!=":
                switch(izquierda?.Tipo.tipos){
                    case tipos.ENTERO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Entero con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor !== derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CARACTER:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un char con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor.charCodeAt() !== derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor.charCodeAt() !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor.charCodeAt() !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.CADENA:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                if (izquierda?.valor !== derecha?.valor.toChar) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un caracter", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Entero", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un String con un Dooble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    case tipos.DOBLE:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un booleano", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Double con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                if (izquierda?.valor !== derecha?.valor.charCodeAt()) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.ENTERO:
                                if (izquierda?.valor !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.DOBLE:
                                if (izquierda?.valor !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                        }
                    case tipos.BOOLEANO:
                        switch(derecha?.Tipo.tipos){
                            case tipos.BOOLEANO:
                                if (izquierda?.valor !== derecha?.valor) {
                                    return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                                }
                                return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                            case tipos.CADENA:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un string", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.CARACTER:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un char", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.ENTERO:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un int", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                            case tipos.DOBLE:
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "No se puede comparar un Booleano con un Doble", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                        }
                    default:
                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }

            case "!":
                if (izquierda?.Tipo.tipos===tipos.BOOLEANO) {
                    if (!izquierda?.valor) {
                        return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                    }
                    return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                }
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Se esperaba tipo booleano",this.linea, this.columna));
            case "&&":
                if (izquierda?.Tipo.tipos===tipos.BOOLEANO && derecha?.Tipo.tipos===tipos.BOOLEANO) {
                    if (izquierda.valor && derecha.valor) {
                        return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                    }
                    return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                }
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Se esperaba tipo booleano",this.linea, this.columna));
            case "||":
                if (izquierda?.Tipo.tipos===tipos.BOOLEANO && derecha?.Tipo.tipos===tipos.BOOLEANO) {
                    if (izquierda.valor || derecha.valor) {
                        return new Literal(this.linea, this.columna, true, tipos.BOOLEANO);
                    }
                    return new Literal(this.linea, this.columna, false, tipos.BOOLEANO);
                }
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Se esperaba tipo booleano",this.linea, this.columna));
        }
        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
    }

    getNodo():NodeAST{
        let nodo = new NodeAST("CONDICION");
        if (this.Expderecho && this.Expizquierdo) {
            nodo.agregarHijo(undefined,undefined,this.Expizquierdo.getNodo());
            nodo.agregarHijo(this.operador);
            nodo.agregarHijo(undefined,undefined,this.Expderecho.getNodo());
        }else if (this.Expizquierdo) {
            nodo.agregarHijo(this.operador);
            nodo.agregarHijo(undefined,undefined,this.Expizquierdo.getNodo());
        }
        return nodo;
    }
    
}