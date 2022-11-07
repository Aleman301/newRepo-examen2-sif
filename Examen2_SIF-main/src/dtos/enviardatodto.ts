import { Length, IsNotEmpty } from "class-validator";

export class enviarDato{
    @Length(1,1,{message:"el dato debe ser una letra!"})
    @IsNotEmpty()
    dato: string
}