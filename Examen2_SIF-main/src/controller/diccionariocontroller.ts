import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Router, Request, Response } from "express";
import diccionarioservice from "../services/diccionarioservice";
import { CreateCategoryDto } from "../validadorDto";
import { selectCategory } from "../dtos/selectCategoryDto";

export class DiccionarioControllers{

    router = Router();

    constructor(){
        this.InitRoutes();
    }

    //Funcion rutas
    InitRoutes(){
        this.router.get('/diccionarios', this.getList)
        this.router.get('/diccionarios/:palabra', this.getNombre)
        this.router.post('/diccionarios/category', this.seleccionarCategoria)
        this.router.post('/diccionarios/indice', this.seleccionarIndice)
        //this.router.get('/diccionarios/:categoria', this.getListByCategoria)
        this.router.post('/diccionarios', this.create)
    }

    //Funcion lista
    async getList(req: Request , res: Response): Promise<Response>{
        const diccionario = await diccionarioservice.getList();
        return res.json(diccionario)
    } 

    //Funcion obtener un objeto 
    async getNombre(req: Request , res: Response): Promise<Response>{
        const {palabra} = req.params
        const diccionario = await diccionarioservice.getNombre(palabra);
        return res.json(diccionario);
    }

    //funcion obtener lista categoria    
    async getListByCategoria(req: Request , res: Response): Promise<Response>{
        const {categoria} = req.params
        const palabra = await diccionarioservice.getListByCategoria(categoria);
        return res.json(palabra);
    }

    async seleccionarCategoria(req: Request, res: Response): Promise<Response>{
        let payload = req.body

        let formateo = plainToClass(selectCategory, payload)
        
        const errors = await validate(formateo)
        if(errors.length>0){
            console.log(errors)

            return res.status(400).json({
                "validation-errors": errors
            })
        }

        return res.json(
            await diccionarioservice.selectCategory(formateo)
        )

    }

    async seleccionarIndice(){
        console.log("seleccionaste un indice")
    }

    async create(req: Request, res: Response): Promise<Response>{
        let payload = req.body
      /*  if(!payload){
            payload={"name":"probando"}
        }*/
        let formateo = plainToClass(CreateCategoryDto, payload)
        
        const errors = await validate(formateo)
        if(errors.length>0){
            console.log(errors)

            return res.status(400).json({
                "validation-errors": errors
            })
        }

        return res.json(
            await diccionarioservice.create(formateo)
        )

    }
    /*
    async create(req: Request , res: Response): Promise<Response>{
       
    }
    
*/
}