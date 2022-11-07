import { Length, IsNotEmpty } from "class-validator";

export class selectIndice{
    @Length(1,1,{message:"el dato debe ser una de los indices disponibles!"})
    @IsNotEmpty()
    indice: string
}