export class NodeAST {

    public hijos: Array<NodeAST> = new Array<NodeAST>();
    public valor:string;

    constructor(valor:string) {
        this.valor = valor;
    }

    public setHijos(hijos:Array<NodeAST>){
        this.hijos = hijos;
    }

    public agregarHijo(cad?:string, hijos?:Array<NodeAST>, hijo?:NodeAST){
        if (cad) {
            this.hijos.push(new NodeAST(cad));
        }
        else if (hijos) {
            for(let hijo of hijos)
            {
                this.hijos.push(hijo);
            }
        }else if(hijo){
            this.hijos.push(hijo);
        }
    }
    public agregarPrimerHijo(cad?:string, hijo?:NodeAST)
    {
        if (cad) {
            this.hijos.unshift(new NodeAST(cad));
        }else if (hijo) {
            this.hijos.unshift(hijo);
        }
    }

    public getValor():string
    {
        return this.valor;
    }
    
    public setValor(cad:string)
    {
        this.valor = cad;
    }
    
    public getHijos():Array<NodeAST> 
    {
        return this.hijos;
    }
}