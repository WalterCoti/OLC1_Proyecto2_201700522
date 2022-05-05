import { Instruccion } from "../Abstracto/instrucciones";
import { NodeAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import { Expresion } from "../Expresiones/Expresion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";

export default class SWITCH extends Instruccion {
    public Variable: Expresion;
    public Case: any[] | any;
    public Default: Array<Instruccion> | any;
    
    constructor(linea:number, columna:number, Variable:Expresion, Case?:any[], Default?:Array<Instruccion>){
        super(linea, columna);
        this.Variable = Variable;
        this.Case = Case;
        this.Default = Default;
    }

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        
        let variable = this.Variable.getValor(arbol, tabla);
        if(variable.Tipo.tipos !== tipos.ERROR){
            let Nuevo_Entorno = new Entorno("IF",tabla);
            arbol.pilaCiclo.push("SWITCH");
            if (this.Case) {
                let correcto = false;
                for(let caso of this.Case){
                    if (typeof(caso)!==typeof("")) {
                        let val = caso.Case.getValor();
                        if (val.Tipo.tipos!== tipos.ERROR) {
                            if (variable.Tipo.tipos === val.Tipo.tipos ||
                                variable.Tipo.tipos === tipos.ENTERO && val.Tipo.tipos===tipos.DOBLE ||
                                (variable.Tipo.tipos === tipos.DOBLE && val.Tipo.tipos===tipos.ENTERO)) {
                                    if (val.valor === variable.valor || correcto) {
                                        correcto = true;
                                        for(let elemento of caso.INS){
                                            if(typeof(elemento) !== typeof("")){
                                                let res = elemento.ejecutar(arbol, Nuevo_Entorno);
                                                if(typeof(res) === typeof([])){
                                                    if (res.nombre==="RETURN") {
                                                        if(arbol.pilaFuncion.length>0){
                                                            arbol.pilaCiclo.pop();
                                                            return res;
                                                        }else{
                                                            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE RETORNAR FUERA DE UNA FUNCION", this.linea, this.columna));
                                                        } 
                                                    }else if(res.nombre==="BREAK"){
                                                        if(arbol.pilaCiclo.length>0){
                                                            arbol.pilaCiclo.pop();
                                                            return;
                                                        }else{
                                                            arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE UTILIZAR BREAK FUERA DE UN CICLO", this.linea, this.columna));
                                                        }
                                                    }else if(res.nombre==="CONTINUE"){
                                                        if(arbol.pilaCiclo.length>1){
                                                            arbol.pilaCiclo.pop();
                                                            return res;
                                                        }else{
                                                        arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE UTILIZAR CONTINUE FUERA DE UN CICLO", this.linea, this.columna));
                                                        }
                                                    }
                                                    return;
                                                }    
                                            }
                                        }
                                    }
                            }else{
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "Constante de Case incorrecta",this.linea, this.columna));
                                break;
                            }
                        }else{
                            arbol.num_error++;
                            arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO", "Constante de Case incorrecta",this.linea, this.columna));
                            break;
                        }
                    }
                }
            }

            if (this.Default) {
                for(let elemento of this.Default){
                    if(typeof(elemento) !== typeof("")){
                        let res = elemento.ejecutar(arbol, Nuevo_Entorno);
                        if(typeof(res) === typeof([])){
                            if (res.nombre==="RETURN") {
                                if(arbol.pilaFuncion.length>0){
                                    arbol.pilaCiclo.pop();
                                    return res;
                                }else{
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","No se puede retornar fuera de una funcion", this.linea, this.columna));
                                } 
                            }else if(res.nombre==="BREAK"){
                                if(arbol.pilaCiclo.length>0){
                                    arbol.pilaCiclo.pop();
                                    return;
                                }else{
                                    arbol.num_error++;
                                    arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","No se puede usar Beak", this.linea, this.columna));
                                }
                            }else if(res.nombre==="CONTINUE"){
                                if(arbol.pilaCiclo.length>1){
                                    arbol.pilaCiclo.pop();
                                    return res;
                                }else{
                                arbol.num_error++;
                                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","NO SE PUEDE UTILIZAR CONTINUE FUERA DE UN CICLO", this.linea, this.columna));
                                }
                            }
                            return;
                        }    
                    }
                }
            }

            arbol.pilaCiclo.pop();
            return;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","error al leer la variable condicional", this.linea, this.columna));
        return;
    }
    getNodo():NodeAST{
        let nodo:NodeAST = new NodeAST("Switch");
        nodo.agregarHijo("Switch");
        nodo.agregarHijo("(");
        nodo.agregarHijo(undefined, undefined, this.Variable.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        let cas = new NodeAST("CASOS");
        let raiz = cas;
        let x = 0;
        if (this.Case) {
            for(let caso of this.Case){
                if (typeof(caso)!==typeof("")) {
                    cas.agregarHijo("Case");
                    cas.agregarHijo(undefined, undefined, caso.Case.getNodo());
                    cas.agregarHijo(":")
                    if (caso.INS) {
                        let inst = new NodeAST("Instrucciones");
                        for(let instruccion of caso.INS){
                            if (typeof(instruccion)!==typeof("")) {
                                inst.agregarHijo(undefined, undefined, instruccion.getNodo());
                            }
                        }
                        cas.agregarHijo(undefined, undefined, inst);
                    }
                    x++;
                    if (x!==this.Case.length) {
                        let case2 = new NodeAST("CASOS");
                        cas.agregarHijo(undefined, undefined, case2);
                        cas = case2;
                    }
                }
            }
        }
        if (this.Default) {
            let def = new NodeAST("Default");
            for(let elemento of this.Default){
                if(typeof(elemento) !== typeof("")){
                    def.agregarHijo(undefined, undefined, elemento.getNodo());
                }
            }
            if (x==0) {
                cas = new NodeAST("Default");
            }else{
                cas.agregarHijo(undefined,undefined,def);
            }
        }
        if (this.Case || this.Default) {
            nodo.agregarHijo(undefined, undefined, raiz);
        }
        nodo.agregarHijo("}");
        return nodo;
    }
}