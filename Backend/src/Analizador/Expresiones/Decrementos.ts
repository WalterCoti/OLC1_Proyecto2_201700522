import { NodeAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";
import { Expresion } from "./Expresion";
import Literal from "./Literal";

export default class DECREMENTO extends Expresion {

    public exp:Expresion;
    constructor(linea: number, columna: number, exp:Expresion) {
        const tip = new Tipo(tipos.ENTERO);
        super(linea, columna, 0, tip);
        this.exp = exp;
    }
    public getValor(arbol: ArbolAST, tabla: Entorno): Expresion {
        let name_=this.exp.nombre;
        let val = this.exp.getValor(arbol, tabla);
        if (val.nombre === "FUNCION") {
            this.exp.nombre = "";
        }
        if (val.Tipo.tipos === tipos.DOBLE || val.Tipo.tipos === tipos.ENTERO) {
            if(this.exp.nombre!=="" && this.exp.nombre!==undefined){
                let expre = tabla.get(this.exp.nombre);
                if (expre.tipo.tipos !== tipos.ERROR && (expre.tipo.tipos===tipos.DOBLE || expre.tipo.tipos===tipos.ENTERO)){
                    if (this.exp.posicion===-1) {
                        let v = expre.getValor(arbol, tabla);
                        var v2 = new Literal(this.linea, this.columna, v.valor-1, expre.valor.Tipo.tipos);
                        tabla.update(this.exp.nombre, v2);
                        return new Literal(this.linea, this.columna, expre.valor.valor, expre.tipo.tipos);
                    }else{
                        let value = expre.valor.valor[this.exp.posicion.valor];
                        let v = new Literal(this.linea, this.columna, value, expre.tipo.tipos);
                        let dir = new Literal(this.linea, this.columna, this.exp.posicion.valor, this.exp.Tipo.tipos);
                        tabla.update(this.exp.nombre, v, dir);
                        return new Literal(this.linea, this.columna, value-1, expre.tipo.tipos);
                    }
                }
            }else{
                let expre:any = undefined;
                if (val.nombre === "FUNCION") {
                    expre = val;
                    this.exp.nombre = name_;
                }else{
                    expre = this.exp.getValor(arbol, tabla)
                }
                return new Literal(this.linea, this.columna, expre.valor-1, expre.Tipo.tipos);
            }
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Se esperaba un valor numerico",this.linea, this.columna));
        return new Literal(this.linea, this.columna, "ERROR", tipos.ERROR);
    }

    getNodo():NodeAST{
        let nodo = new NodeAST("Decremento");
        nodo.agregarHijo(undefined, undefined, this.exp.getNodo());
        nodo.agregarHijo("--");
        return nodo;
    }

}