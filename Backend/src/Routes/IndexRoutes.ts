import {Router} from 'express';
import {control} from "../Analizador/controller";
class IndexRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    public config(): void {
        this.router.post("/compile", control.interpretar);
        this.router.post("/graficar", control.open);
    }
}
const indexRoutes = new IndexRoutes();
export  default indexRoutes.router;