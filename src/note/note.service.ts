import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './DTO/createNote';

@Injectable()
export class NoteService {
    constructor (private prisma:PrismaService){}
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
       const data = {
        ...dataWithoutEmail,
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
}
