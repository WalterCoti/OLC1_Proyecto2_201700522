import Entorno from "./Environment";
import Excepcion from "../Exceptions/Excepcion";
import { Instruccion } from "../Abstracto/instrucciones";
import lstSimbolo from "./Lsimbolos";
import { Expresion } from "../Expresiones/Expresion";
import { NodeAST } from "../Abstracto/NodeAST";


export default class ArbolAST {
    public instrucciones: Array<any>;
    public Listfunciones: Array<Instruccion> = new Array<Instruccion>();
    public errores: Array<Excepcion> = new Array<Excepcion>();
    public consola: String;
    public global: Entorno;
    public raiz:NodeAST = new NodeAST("INSTRUCCIONES");
    public num_error:number = 0;
    public pilaCiclo:any[] = [];
    public pilaFuncion:any[] = [];
    private c:number=0;
    private grafo:string="";
    public run_: Array<Expresion> = new Array<Expresion>();
    public lst_simbolos:Array<any> = new Array<any>();
    
    constructor(instrucciones: Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new Entorno();
    }

    public writeconsola(update:String){
        this.consola = `${this.consola}${update}\n`;
    }

    public EjecutarBloque() {
        if (this.run_.length===0) {
            this.num_error++;
            this.errores.push(new Excepcion(this.num_error, "SEMANTICO", "No existe ninguna función principal RUN", 0, 0));
            return;
        }
        if (this.run_.length>1) {
            this.num_error++;
            this.errores.push(new Excepcion(this.num_error, "SEMANTICO", "Existe mas de una llamada RUN", -1, -1));
            return;
        }
        for(let elemento of this.Listfunciones){
            if(typeof(elemento) !== typeof("")){
                elemento.ejecutar(this, this.global);
            }
        }
        
        for(let elemento of this.instrucciones){
            if(typeof(elemento) !== typeof("")){
                let valor = elemento;
                if (valor.ID && !valor.Posicion_ && valor.CANTIDAD && valor.DIMENSION) {
                    elemento.ejecutar(this, this.global);
                }else{
                    this.num_error++;
                    this.errores.push(new Excepcion(this.num_error, "SEMANTICO", "no es posible ejecutar una instrucción fuera de una función o metodo", elemento.linea, elemento.columna));
                }
            }
        }
        if (this.run_.length===1) {
            this.run_[0].getValor(this, this.global);
        }
    }

    public graphAST():void
    {
        let name:string = "AST";
        let ext:string = "svg";
        var fs = require('fs');
        var stream = fs.createWriteStream(`./src/reportes/${name}.dot`);
        stream.once('open',() =>{
            stream.write(this.getDot(this.raiz));
            stream.end();

        });
        const exec = require('child_process').exec;
        exec(`dot -T svg -o ./src/reportes/${name}.${ext} ./src/reportes/${name}.dot`, (err:any, stdout:any)=>{
            if (err) {
                throw err;
            }
            exec(`start ./src/reportes/${name}.${ext}`);
        });
    }
    
    public openFile(){
        const exec = require('child_process').exec;
        let r:string = "AST";
        let ext:string = "svg";
        try{
            let init:NodeAST = new NodeAST("RAIZ");
            let instr:NodeAST  = new NodeAST("INSTRUCCIONES");


            for(let elemento of this.Listfunciones){
                if(typeof(elemento) !== typeof("")){
                    instr.agregarHijo(undefined, undefined, elemento.getNodo());
                }
            }
            if (this.run_.length===1) {
                let nodo = new NodeAST("RUN");
                nodo.agregarHijo("RUN");
                nodo.agregarHijo(undefined, this.run_[0].getNodo().getHijos(), undefined);
                instr.agregarHijo(undefined, undefined, nodo);
            }
            let x = 0;
            for(let elemento of this.instrucciones){
                if (typeof(elemento)!==typeof("")) {
                    instr.agregarHijo(undefined, undefined, elemento.getNodo());
                }
            }
            init.agregarHijo(undefined, undefined, instr);
            this.raiz = init;
            this.graphAST();
        }catch(e){console.log(e)}
    }

    public getDot(raiz:NodeAST):string
    {
        this.grafo = "";
        this.grafo += "digraph {\n";
        var re = /\"/gi; 
        this.grafo += "n0[label=\"" + raiz.getValor().replace(re, "\\\"") + "\"];\n";
        this.c = 1;
        this.recorrerAST("n0",raiz);
        this.grafo += "}";
        return this.grafo;
    }
    
    public recorrerAST(padre:string , nPadre:NodeAST)
    {
        for(let hijo of nPadre.getHijos())
        {
            let nombreHijo:string = "n" + this.c;
            var re = /\"/gi; 
            this.grafo += nombreHijo + "[label=\"" + hijo.getValor().replace(re, "\\\"") + "\"];\n";
            this.grafo += padre + "->" + nombreHijo + ";\n";
            this.c++;
            this.recorrerAST(nombreHijo,hijo);
        }
    }
}