import fs from 'fs' //leer archivo .json y para escribir en archivo
import path from 'path' //modulo de node para realizar acciones con rutas de archivos
import { Json } from 'sequelize/types/utils';
import { enviarDato } from '../dtos/enviardatodto';
import { selectCategory } from '../dtos/selectCategoryDto';
import { selectIndice } from '../dtos/selectIndiceDto';
import { CreateCategoryDto} from "../validadorDto"
class DiccionarioService{

    public diccionario=[]; //almacenar los datos del json de manera temporal
    private palabraActual
    private palabraImprimirRevenge
    private actualCategoria
    private valorescorrectos = []

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
        this.valorescorrectos=[]
        let indice = 0
        
        console.log("seleccione una de las siguientes opciones enviando por POST el indice")
        for (let i = 0; i <= word.length; i++) {
            if(word[i]){
                this.valorescorrectos.push(word[i])

                let cantidadLetras=word[i].palabra.length
                let palabraImpriimr = ""
                //console.log(word[i].palabra)
                for(let j =0; j<cantidadLetras;j++){
                    palabraImpriimr=palabraImpriimr+" _"
                }
                indice++
                console.log((indice)+":"+palabraImpriimr)
            }
            
        }

        this.actualCategoria = palabra

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

     public async selectIndice(selectIndiceDto: selectIndice){

        let indice = Number(selectIndiceDto.indice)

        if(indice){
            this.palabraActual=this.valorescorrectos.find((valorActual, index)=>{
                if(index==(indice-1)){
                    return valorActual
                }
            })

            let palabraImprimir = ""
            for(let i=0; i<this.palabraActual.palabra.length; i++){
                palabraImprimir = palabraImprimir +  " _"
            }

            let mitad = this.palabraActual.palabra.length
            let division = mitad / 2
            let redondear = Math.floor(division)
            let intentos = redondear +1

            console.log("ud tiene " + intentos +  " intentos")
            console.log(palabraImprimir)

        }else{
            console.log("no sleccionaste nada")
        }

     }

     public async enviarDato(enviarDatoDTO: enviarDato){
            let letra = enviarDatoDTO.dato
            
            let valoresAnteriores = this.palabraImprimirRevenge
            this.palabraImprimirRevenge = ""
            for(let i=0; i<this.palabraActual.palabra.length; i++){
                if(this.palabraActual.palabra[i]==letra){
                    this.palabraImprimirRevenge = this.palabraImprimirRevenge + letra
                }else if(valoresAnteriores){
                    if(this.palabraActual.palabra[i]==valoresAnteriores[i]){
                        this.palabraImprimirRevenge = this.palabraImprimirRevenge + valoresAnteriores[i]
                    }else{
                        this.palabraImprimirRevenge = this.palabraImprimirRevenge + "_"
                    }
                    
                }
                else{
                    this.palabraImprimirRevenge = this.palabraImprimirRevenge + "_"
                }


            }

            if(this.palabraImprimirRevenge == this.palabraActual.palabra){
                console.log(this.palabraImprimirRevenge)
                console.log("felicidades, compeltaste la palabra! :)")
                this.palabraImprimirRevenge = undefined
                this.palabraActual = undefined
            }else{
                let mitad = this.palabraActual.palabra.length
                let division = mitad / 2
                let redondear = Math.floor(division)
                let intentos = redondear +1

                console.log("ud tiene " + intentos +  " intentos")
                console.log(this.palabraImprimirRevenge)
            }

            
        
     }

}

export default new DiccionarioService();