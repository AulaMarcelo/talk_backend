import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
    constructor (private prisma:PrismaService){}
    async createNote(creaateNoteDto:Prisma.NoteCreateInput){
     try{
      
       const note = await this.prisma.note.create({
        data:creaateNoteDto
       })
       return note
     }catch(error){
        return {error: error.message}
     }
    }

   async getAll(take:string,skip:string,filter:string) {
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
}
