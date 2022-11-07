import express, {json} from "express"
import {DiccionarioControllers} from "./controller/diccionariocontroller"


class App{

    public express: express.Application;
    diccionarioController : DiccionarioControllers;

    constructor(){
        this.express = express();
        this.controllers();
        this.middlewares()
        this.routes();        
    }

    middlewares(){
        this.express.use(json()); 
    }

    listen(port:number){
        this.express.listen(port, () => console.log(`Server running in: http://localhost:${port}`));
    }
    
    routes(){
        this.express.use('/api', this.diccionarioController.router)
    }

    controllers() {
    this.diccionarioController = new DiccionarioControllers();
    }

}

export default new App();