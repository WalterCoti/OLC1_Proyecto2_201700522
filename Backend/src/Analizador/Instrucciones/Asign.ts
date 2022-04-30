import { Instruccion } from "../Abstracto/instrucciones";
import { NodeAST } from "../Abstracto/NodeAST";
import Excepcion from "../Exceptions/Excepcion";
import { Expresion } from "../Expresiones/Expresion";
import ArbolAST from "../AST/ASTTree";
import Entorno from "../AST/Environment";
import Tipo, { tipos } from "../AST/Stype";
import Literal from "../Expresiones/Literal";


export default class ASIGNAR extends Instruccion {
    public exp: Expresion | undefined;
    public ID:string;
    public Posicion_: any;
    public tip:string;
    public ubic: Literal|any;
    constructor(linea:number, columna:number, ID:string,Posicion_?:any, exp?:Expresion, tipv:string=""){
        super(linea, columna);
        this.exp = exp;
        this.ID=ID;
        if (Posicion_) {
            this.Posicion_ = Posicion_;
        }else{
            this.Posicion_ = -1;
        }
        this.tip = tipv;
    }

    

    ejecutar(arbol: ArbolAST, tabla: Entorno) {
        const expre = tabla.get(this.ID);
        let ubic = -1;
        if(this.Posicion_!=-1){
            ubic = this.Posicion_.getValor(arbol, tabla);
        }
        if(expre.tipo.tipos!== tipos.ERROR){
            let value = this.exp?.getValor(arbol, tabla);

            if (this.tip ==="VECTOR" && expre.DIMENSION===-1) {
                arbol.num_error++;
                arbol.errores.push(new Excepcion(arbol.num_error,"SEMANTICO","Llamada de vector erronea",this.linea, this.columna));
                return false;
            }
            
            if (expre.tipo.tipos!==value?.Tipo.tipos && expre.tipo.tipos!==tipos.ENTERO
                && expre.tipo.tipos!==tipos.DOBLE && value?.Tipo.tipos!== tipos.ENTERO
                && value?.Tipo.tipos!==tipos.DOBLE) {
                arbol.errores.push(new Excepcion(arbol.num_error,"Semantico","el tipado de la variable no coincide con el del valor indicado", this.linea, this.columna));
                return false;
            }
            this.ast = true;
            const comprobar = tabla.update(this.ID, value, ubic);
            if (!comprobar){
                arbol.errores.push(new Excepcion(arbol.num_error,"Semantico","No se encontro la variable "+this.ID, this.linea, this.columna));
                return false;
            }
            this.ubic = ubic;
            return true;
        }
        arbol.num_error++;
        arbol.errores.push(new Excepcion(arbol.num_error, "SEMANTICO","Variable no declarada",this.linea, this.columna));
        return false;
        //ERROR
    }

    getNodo():NodeAST{
        let nodo:NodeAST = new NodeAST("ASIGNAR");
        if (this.Posicion_!==-1) {
            if (this.tip==="LIST") {
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo("[");
                nodo.agregarHijo("[");
                nodo.agregarHijo(this.ubic.getNodo());
                nodo.agregarHijo("]");
                nodo.agregarHijo("]");
                nodo.agregarHijo("=");
                nodo.agregarHijo(undefined, undefined, this.exp?.getNodo());
            }else{
                nodo.agregarHijo(this.ID);
                nodo.agregarHijo("[");
                nodo.agregarHijo(this.ubic.getNodo());
                nodo.agregarHijo("]");
                nodo.agregarHijo("=");
                nodo.agregarHijo(undefined, undefined, this.exp?.getNodo());
            }
        }else{
            nodo.agregarHijo(this.ID);
            nodo.agregarHijo("=")
            nodo.agregarHijo(undefined, undefined, this.exp?.getNodo());
        }
        return nodo;
    }
}