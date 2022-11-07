import { Length, IsNotEmpty } from "class-validator";

export class CreateCategoryDto{
    @Length(1,10,{message:"el dato debe ser de 10 letras"})
    @IsNotEmpty()
    name: string
}