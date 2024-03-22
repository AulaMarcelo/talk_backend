import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './DTO/createNote';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UpdatePrompt } from './DTO/updatePrompt';

@Injectable()
export class NoteService {
  private genAI:any;
  private genAiProModel:any;

    constructor (private prisma:PrismaService){
      this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      this.genAiProModel = this.genAI.getGenerativeModel({ model: "gemini-pro"});
    }


   
    async createNote(creaateNoteDto:CreateNoteDto){
     try{
      const {email,...dataWithoutEmail }  = creaateNoteDto
     

    
       const user = await this.prisma.user.findUnique({
        where:{
          email:creaateNoteDto.email
        }
       })
       if(!user){
        return {error:"Usuario não existe"}
       }
       const prompt = user.prompt + ' ' + dataWithoutEmail.text
       const result = await this.genAiProModel.generateContent(prompt);
       const response = await result.response;
       const textprompt = response.text();
       console.log(textprompt);
        const dataFinal = {
         ...dataWithoutEmail,
         text:textprompt ? textprompt : dataWithoutEmail.text
        }
       const data = {
        ...dataFinal,
          userId: user.id
         
       }
       const note = await this.prisma.note.create({
        data:data
       })
       return note
     }catch(error){
        return {error: error.message}
     }
    }

   async getAll(email:string,take:string,skip:string,filter:string) {
      try{
          const takeNumber = parseInt(take);
          const skipNumber = parseInt(skip);
          const page = (skipNumber == 0) ? skipNumber :  skipNumber * takeNumber;
            
        
           const note = await this.prisma.note.findMany(
              {
                where:{
                    title:{
                    contains : filter
                  },
                 user:{
                  email:email
                 }
                  
                },
             
                orderBy: {    
                    createdAt: 'desc'         
                },
               
                take:takeNumber,
                skip:page,
             }
          );
          return note;
      }catch(error){
          return {error: error.message}; 
      }
   }

   async removeNote(id:string){
    try{
      const deleteNote = await this.prisma.note.delete({
        where:{
          id:id,
        }
      })
      return deleteNote;
    }
    catch(error){
      return {error: error.message};
    }
   }

   async updatePrompt(data:UpdatePrompt){
    try{
      const usuario = await this.prisma.user.update({
        where:{
          email:data.email,
        },
        data:{
          prompt:data.prompt
        }
      })
      if(!usuario){
        return {error: "Usuario não existe"}
      }
      return usuario;
    }
    catch(error){
      return {error: error.message};
    }
   }


   async getPrompt(email:string) {
    try{
       
         const user = await this.prisma.user.findUnique({
          where:{
            email:email,
          }
         })
          
     
        return user;
    }catch(error){
        return {error: error.message}; 
    }
 }


}
