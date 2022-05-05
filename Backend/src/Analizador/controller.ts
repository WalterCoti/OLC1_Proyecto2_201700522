import {Request, Response} from "express";
import Excepcion from "./Exceptions/Excepcion";
import ArbolAST from './AST/ASTTree';
import Entorno from './AST/Environment';

class Control {
    
    public async index( res: Response) {
        res.json();
    }

    public interpretar(req: Request, res: Response) {
        const {input} = req.body;
        try {
            
            let parsergen = require("./analizador");
            let ast = new ArbolAST([]); 
            try{
                ast = parsergen.parse(input);
                if (typeof(ast)==typeof(true)) {
                    ast = new ArbolAST([]);
                    ast.num_error++;
                    ast.errores.push(new Excepcion(ast.num_error, "SINTACTICO","Error sintactico",-1,-1));
                }
            }catch(e){
                ast.num_error++;
                ast.errores.push(new Excepcion(ast.num_error, "SINTACTICO","Error inrecuperable",0,0));
            }
            if (typeof(ast)===typeof(new ArbolAST([]))) {
                            
                const tabla = new Entorno();
                ast.global = tabla;
                ast.EjecutarBloque();
                if (ast.errores.length>0) {
                    ast.consola+="\n-----Errores Detectados-----";
                    for(let error of ast.errores){
                        ast.consola+="\n"+error.toString();
                    }
                }
                res.json({consola: ast.consola, Errores: ast.errores, Simbolo:ast.lst_simbolos});
            }else{
                res.json({consola:"", Errores:[], Simbolo:[]});
            }
        } catch (err) {
            console.log(err);
            res.json({consola:"", Errores:[], Simbolo:[]});
        }
    }

    public open(req: Request, res: Response){
        try{
            const {input} = req.body;
            let parse = require("./analizador");
            let ast = new ArbolAST([]);
            ast = parse.parse(input);
            ast.openFile();
        }catch{}
    }
}

export const control = new Control();