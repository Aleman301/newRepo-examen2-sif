import { Length, IsNotEmpty } from "class-validator";

export class selectCategory{
    @Length(1,10,{message:"el dato debe ser una de las cateogiras disponibles!"})
    @IsNotEmpty()
    category: string
}