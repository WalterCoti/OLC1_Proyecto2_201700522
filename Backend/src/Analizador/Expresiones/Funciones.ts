import Excepcion from "../Exceptions/Excepcion";
import { Expresion } from "./Expresion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";
import Literal from "./Literal";
import { NodeAST } from "../Abstracto/NodeAST";

export default class FUNCION extends Expresion {

    public nombre:string;
    public parametros:Array<Expresion> | any;
    constructor(linea: number, columna: number, nombre:string, parametros?:Array<Expresion>) {
        const tip = new Tipo(tipos.ENTERO);
        super(linea, columna, 0, tip);
        this.nombre = nombre;
        this.parametros = parametros;
    }
    public getValor(arbol: ArbolAST, tabla: Entorno): any {
        
        let Nuevo_Entorno = new Entorno(this.nombre,tabla);
        let nombre_nuevo = this.nombre+"#";
        let nombre_nuevo2 = this.nombre+"#";
        let calculo:any[] = [];
        if (this.parametros) {
            for(let par of this.parametros){
                let varr = par.getValor(arbol,tabla);
                nombre_nuevo+=""+varr.Tipo.tipos;
                if (varr.Tipo.tipos===tipos.ENTERO) {
                    nombre_nuevo2+=""+tipos.DOBLE;
                }else{
                    nombre_nuevo2+=""+varr.Tipo.tipos;
                }
                calculo.push(varr);
            }
        }
        var comprobar = arbol.global.get(nombre_nuevo);
        var comprobar2 = arbol.global.get(nombre_nuevo2);
        if(comprobar.tipo.tipos !== tipos.ERROR || comprobar2.tipo.tipos!==tipos.ERROR){
            let func:any = undefined;
            if (comprobar.tipo.tipos!==tipos.ERROR) {
                func = comprobar.valor;
            }else{
                func = comprobar2.valor;
            }
            if (func.PARAMETRO) {
                let x = 0;
                for(let declaracion of func.PARAMETRO){
                    let yy = calculo[x];
                    yy.linea = declaracion.linea;
                    yy.columna =declaracion.columna;
                    declaracion.exp = yy;
                    declaracion.ejecutar(arbol, Nuevo_Entorno);
                    x++; 
                }
            }
            arbol.pilaFuncion.push("funcion");
            for(let element of func.INSTRUCCION){
                if(typeof(element) !== typeof("")){
                    let res = element.ejecutar(arbol, Nuevo_Entorno);
                    if (typeof(res)===typeof({}) && !(res instanceof Expresion)) {
                        if (res.nombre==="RETURN") {
                            if(arbol.pilaFuncion.length>0){
                                let retorno = res.retorno;
                                if (retorno) {
                                    if (func.tipo.tipos===retorno.Tipo.tipos ||
                                        (func.tipo.tipos===tipos.ENTERO && retorno.Tipo.tipos===tipos.DOBLE
                                        || func.tipo.tipos===tipos.DOBLE && retorno.Tipo.tipos===tipos.ENTERO)) {
                                            let rest = retorno.getValor(arbol, Nuevo_Entorno);
                                            if(rest.Tipo.tipos===tipos.ERROR){
                                                arbol.num_error++;
                                                arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO", "Error en retorno",this.linea, this.columna));
                                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                            }
                                            rest.nombre = "FUNCION";
                                            arbol.pilaFuncion.pop();
                                            return rest;
                                    }else{
                                        arbol.num_error++;
                                        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTIO", "El tipo del retorno no es el correcto",this.linea, this.columna));
                                        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                    }
                                }
                                return new Literal(this.linea, this.columna, undefined, tipos.CADENA);

                            }else{
                                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","No se puee retornar fuera de una funcion", this.linea, this.columna));
                                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                                
                            } 
                        }
                        if (res.nombre==="BREAK") {
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO", "No se puede utilizar break dentro de una función",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);   
                        }
                        if (res.nombre==="CONTINUE") {
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTIO", "No se puede utilizar continue dentro de una función",this.linea, this.columna));
                            return new Literal(this.linea, this.columna, undefined, tipos.ERROR); 
                            
                        }
                    }
                }
            }
            if (!func.vector) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Se esperaba return",this.linea, this.columna));
                return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
            }
            arbol.pilaFuncion.pop();
            return;
        }else{
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","No se encontro la función",this.linea, this.columna));
            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
        }
    }

    getNodo():NodeAST{
        let nodo = new NodeAST("Llamada");
        nodo.agregarHijo(this.nombre);
        nodo.agregarHijo("(");
        if (this.parametros) {
            let nodo2 = new NodeAST("Parametros");
            for(let element of this.parametros){
                if (typeof(this.parametros)!==typeof("")) {
                    nodo2.agregarHijo(undefined, undefined, element.getNodo());
                }
            }
            nodo.agregarHijo(undefined, undefined, nodo2);
        }
        nodo.agregarHijo(")");
        return nodo;
    }
}