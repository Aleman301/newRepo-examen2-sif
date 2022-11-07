import fs from 'fs' //leer archivo .json y para escribir en archivo
import path from 'path' //modulo de node para realizar acciones con rutas de archivos
import { Json } from 'sequelize/types/utils';
import { selectCategory } from '../dtos/selectCategoryDto';
import { CreateCategoryDto} from "../validadorDto"
class DiccionarioService{

    public diccionario=[]; //almacenar los datos del json de manera temporal

    newData=[
        {"palabra": "oso" , "categoria": "animal"}
    ]

    constructor(){
        const path_rutas = path.dirname(__dirname) + '/data/palabras.json'
        this.diccionario = JSON.parse(fs.readFileSync( path_rutas , {encoding: 'utf-8'}))
    }

    public async getList(){
        const categorias = "fruta, clima"
        console.log("bienvenido al juego: seleccione una categoria: " + categorias)
    }

    public async getListByCategoria(categoria: string){
        const palabra = this.diccionario.filter((c) => c.categoria == categoria)
        return palabra;
    }

    public async getNombre(palabra: string){
        const word = this.diccionario.map((valoractual)=> {
            if(valoractual.categoria==palabra){
                return valoractual
            }else{
                return
            }
         
        })
        let valorescorrectos=[]
        let indice = 0
        
        console.log("seleccione una de las siguientes opciones enviando por POST el indice")
        for (let i = 0; i <= word.length; i++) {
            if(word[i]){
                valorescorrectos.push(word[i])

                let cantidadLetras=word[i].palabra.length
                let palabraImpriimr = ""
                //console.log(word[i].palabra)
                for(let j =0; j<cantidadLetras;j++){
                    palabraImpriimr=palabraImpriimr+"_"
                }
                indice++
                console.log((indice)+":"+palabraImpriimr)
            }
            
        }
    }

    public async create(createCategoryDTO: CreateCategoryDto){
       console.log(createCategoryDTO)
    }

    public async selectCategory(selectCategoryDTO: selectCategory){
        if(selectCategoryDTO.category=="fruta" || selectCategoryDTO.category=="clima"){
            this.getNombre(selectCategoryDTO.category)
        }else{
            console.log("categoria no encontrada")
        }

     }
}

export default new DiccionarioService();