import { Instruccion } from "../Abstracto/instrucciones";
import { NodeAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import { Expresion } from "./Expresion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";
import Literal from "./Literal";

export default class TERNARIO extends Expresion {
    public condicion: Expresion;
    public exp1: Expresion;
    public exp2: Expresion;
    
    constructor(linea:number, columna:number, condicion:Expresion, exp1: Expresion, exp2:Expresion){
        super(linea, columna, undefined,new Tipo(tipos.ENTERO));
        this.condicion = condicion;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    getValor(arbol: ArbolAST, tabla: Entorno) {
        let condicion = this.condicion.getValor(arbol, tabla);
        if (condicion.Tipo.tipos!==tipos.ERROR) {
            if(condicion.Tipo.tipos === tipos.BOOLEANO){
                if(condicion.valor){
                    let res = this.exp1.getValor(arbol, tabla);
                    if (res.Tipo.tipos!==tipos.ERROR) {
                        this.Tipo = res.Tipo;
                        return res;
                    }
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","el valor indicado no existe",this.linea, this.columna))
                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }else{
                    let res = this.exp2.getValor(arbol, tabla);
                    if (res.Tipo.tipos!==tipos.ERROR) {
                        this.Tipo = res.Tipo;
                        return res;
                    }
                    arbol.num_error++;
                    arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","el valor indicado no existe",this.linea, this.columna))
                    return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
                }
            }
            arbol.num_error++;
            arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","se esperaba un valor Bolean",this.linea, this.columna))
            return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error, "SINTACTICO","la variable indicada en la condición no existe",this.linea, this.columna))
        return new Literal(this.linea, this.columna, undefined, tipos.ERROR);
    }

    getNodo():NodeAST{
        let nodo = new NodeAST("Ternario");
        nodo.agregarHijo(undefined, undefined, this.condicion.getNodo());
        nodo.agregarHijo("?");
        nodo.agregarHijo(undefined, undefined,this.exp1.getNodo());
        nodo.agregarHijo(":")
        nodo.agregarHijo(undefined, undefined,this.exp2.getNodo());
        return nodo;
    }
}