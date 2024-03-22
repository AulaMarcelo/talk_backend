import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdatePrompt {

   @IsNotEmpty()
   prompt: string;
  
  @IsEmail()
  email: string;

}

