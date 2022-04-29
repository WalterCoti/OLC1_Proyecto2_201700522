import expres, {Application, Request, Response} from 'express';
import IndexRoutes from './src/Routes/IndexRoutes';
import morgan from 'morgan';
import cors from 'cors';

class Server{
    public app: Application;
    constructor(){
        this.app = expres();
        this.config();
        this.routes();

    }
    config(): void{
        this.app.set('port', process.env.PORT || 3500);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(expres.json());
        this.app.use(expres.urlencoded({extended:false}));
    }
    routes(): void{
        this.app.use(IndexRoutes);
    }
    start(): void{
        this.app.listen(this.app.get('port'),()=>{
            console.log("Server port: ", this.app.get('port'))
        });
    }
}

const backend = new Server();
backend.start();