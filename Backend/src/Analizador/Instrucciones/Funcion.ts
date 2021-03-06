import { Instruccion } from "../Abstracto/instrucciones";
import { NodeAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import DECLARAR from "./Declarar";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import ListaSimbolo from "../AST/Lsimbolos";
import Tipo, { tipos } from "../AST/Stype";

export default class FUNCIONF extends Instruccion {
    
    public tipo:Tipo;
    public nombre:string;
    public PARAMETRO: Array<DECLARAR> | any;
    public INSTRUCCION: Array<any>;
    public vector:boolean;
    public registrada:boolean = false;
    public reg = false;
    constructor(linea:number, columna:number, tipo:Tipo, nombre:string, INS:Array<Instruccion>, Parametro?:Array<DECLARAR>, vector:boolean=false){
        super(linea, columna);
        this.tipo = tipo;
        this.nombre = nombre;
        this.INSTRUCCION = INS;
        this.PARAMETRO = Parametro;
        this.vector = vector;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        
        let up = this.nombre.toUpperCase();
        if (up==="LENGTH" || up==="ROUND" 
            || up==="TYPEOF" || up==="TOSTRING" || up==="TOCHARARRAY") {
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "Existe una función con este nombre", this.linea, this.columna));
            return;
        }
        let nuevo_nombre = this.nombre+"#";
        if (this.PARAMETRO) {
            for(let par of this.PARAMETRO){
                nuevo_nombre+=""+par.tipo.tipos;
            }
        }
        var comprobar = tabla.get(nuevo_nombre);
        if (comprobar.tipo.tipos===tipos.ERROR) {
            if (!this.reg) {
                if (this.vector) {
                    arbol.lst_simbolos.push(new ListaSimbolo(arbol.lst_simbolos.length,nuevo_nombre, "METODO", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));        
                }else{
                    arbol.lst_simbolos.push(new ListaSimbolo(arbol.lst_simbolos.length,nuevo_nombre, "FUNCION", this.tipo.getTipo(), this.linea, this.columna, tabla.nombre));        
                }
                this.reg = true;
            }
            if (!this.registrada) {
                let Nuevo_Entorno = new Entorno(this.nombre, tabla);
                if (this.PARAMETRO) {
                    for(let sim of this.PARAMETRO){
                        let valor = sim;

                        if (valor.CANTIDAD!==-1) {
                            arbol.lst_simbolos.push(new ListaSimbolo(arbol.lst_simbolos.length,valor.ID, "lst", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre)); 
                        }else if(valor.DIMENSION!==-1){

                            arbol.lst_simbolos.push(new ListaSimbolo(arbol.lst_simbolos.length,valor.ID, "VECTOR", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre)); 
                        }else{
                            if (valor.valor instanceof FUNCIONF) {
                                arbol.lst_simbolos.push(new ListaSimbolo(arbol.lst_simbolos.length,valor.ID, "FUNCION", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre)); 
                            }
                            arbol.lst_simbolos.push(new ListaSimbolo(arbol.lst_simbolos.length,valor.ID, "VARIABLE", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre)); 
                        }

                    }

                }
                if (this.INSTRUCCION) {
                    for(let element of this.INSTRUCCION){
                        if (typeof (element) !== typeof ("")) {
                            let valor = element;
                            if (valor.ID && !valor.Pos && valor.CANTIDAD && valor.DIMENSION) {
                                if (valor.ID==="caracteres") {
                                }
                                if (valor.CANTIDAD !== -1) {
                                    arbol.lst_simbolos.push(new ListaSimbolo(arbol.lst_simbolos.length, valor.ID, "lst", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre));
                                }
                                else if (valor.DIMENSION !== -1) {
                                    arbol.lst_simbolos.push(new ListaSimbolo(arbol.lst_simbolos.length, valor.ID, "VECTOR", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre));
                                }
                                else if (element.ID) {
                                    if (valor.exp instanceof FUNCIONF) {
                                        arbol.lst_simbolos.push(new ListaSimbolo(arbol.lst_simbolos.length, valor.ID, "FUNCION", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre));
                                    }
                                    arbol.lst_simbolos.push(new ListaSimbolo(arbol.lst_simbolos.length, valor.ID, "VARIABLE", valor.tipo.getTipo(), valor.linea, valor.columna, Nuevo_Entorno.nombre));
                                }
                            }
                        }
                    }
                }
                this.registrada = true;
            }
            tabla.set(nuevo_nombre, this, this.tipo, -1, -1);
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "Ya existe una función con el mismo identificador", this.linea, this.columna));
        return;
        // ERROR
    }
    getNodo():NodeAST{
        let nodo:NodeAST = new NodeAST("FUNCION");
        let nodo2 = new NodeAST("PARAMETROS");
        let nodo3 = new NodeAST("INSTRUCCIONES");
        if (this.vector) {
            nodo.agregarHijo(this.nombre);
            nodo.agregarHijo("(");
            if (this.PARAMETRO) {
                if (this.PARAMETRO.length>0) {
                    for(let element of this.PARAMETRO){
                        nodo2.agregarHijo(undefined, undefined, element.getNodo());
                    }
                    nodo.agregarHijo(undefined, undefined, nodo2);
                }
            }
            nodo.agregarHijo(")");
            nodo.agregarHijo(":");
            nodo.agregarHijo("VOID");
            nodo.agregarHijo("{");
            
            for(let element of this.INSTRUCCION){
                nodo3.agregarHijo(undefined, undefined, element.getNodo());
            }
            nodo.agregarHijo(undefined, undefined, nodo3);
            nodo.agregarHijo("}");
        }else{
            
            nodo.agregarHijo(this.nombre);
            nodo.agregarHijo("(");
            if (this.PARAMETRO.length>0) {
                for(let element of this.PARAMETRO){
                    nodo2.agregarHijo(undefined, undefined, element.getNodo());
                }
                nodo.agregarHijo(undefined, undefined, nodo2);
            }
            nodo.agregarHijo(")");
            nodo.agregarHijo(":");
            nodo.agregarHijo(undefined, undefined,this.tipo.getNodo());
            nodo.agregarHijo("{");
            for(let element of this.INSTRUCCION){
                nodo3.agregarHijo(undefined, undefined, element.getNodo());
            }
            nodo.agregarHijo(undefined, undefined, nodo3);
            nodo.agregarHijo("}");
        }
        return nodo;
    }
}