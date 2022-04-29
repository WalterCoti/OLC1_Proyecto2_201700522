import {Request, Response} from "express";
import Excepcion from "./Exceptions/Excepcion";
import ArbolAST from './AST/ASTTree';
import Entorno from './AST/Environment';

class Control {

    public  async index(req: Request, res: Response) {
        res.json();
    }

    public interpretar(req: Request, res: Response) {
        const compita = req.body.compilar;
        console.log(compita);
        try {
            let parse = require("./analizador");
            let ast = new ArbolAST([]);
            try{
                ast = parse.parse(compita);
                if (typeof(ast)==typeof(true)) {
                    ast = new ArbolAST([]);
                    ast.num_error++;
                    ast.errores.push(new Excepcion(ast.num_error, "SINTACTICO","Error inrecuperable",-1,-1));
                }
            }catch(e){
                ast.num_error++;
                ast.errores.push(new Excepcion(ast.num_error, "SINTACTICO","Error inrecuperable",-1,-1));
            }
            if (typeof(ast)===typeof(new ArbolAST([]))) {
                const tabla = new Entorno();
                ast.global = tabla;
                ast.EjecutarBloque();
                if (ast.errores.length>0) {
                    ast.consola+="\n*******************Errores*********************";
                    for(let error of ast.errores){
                        ast.consola+="\n"+error.toString();
                    }
                }
                res.json({consola: ast.consola, Errores: ast.errores, Simbolo:ast.lista_simbolos});
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
            const Contenido = req.body.Contenido;
            let parse = require("./Analizador/analizador");
            let ast = new ArbolAST([]);
            ast = parse.parse(Contenido);
            ast.openFile();
        }catch{}
    }
}

export const control = new Control();