import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  
   id?: string;

   @IsNotEmpty()
   userId: string;

   @IsNotEmpty()
   tag: string;
   
   @IsNotEmpty()
   title: string;
   
   @IsNotEmpty()
   text: string;
  
  @IsEmail()
  email: string;

}

