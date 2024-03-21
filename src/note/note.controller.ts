import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { Prisma } from '@prisma/client';
import { CreateNoteDto } from './DTO/createNote';



@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}
  @Post()
    async createNote(@Body() createNoteDto: CreateNoteDto) {
       return this.noteService.createNote(createNoteDto)
   }

   @Delete('delete/:id')
   async deleteNote(@Param('id') id: string) {
      return this.noteService.removeNote(id)
  }


   @Get('getall')
   async getAllDesativados(@Query('email') email:string, @Query('take') take:string, @Query('skip') skip:string, @Query('filter') filter?:string   ){
 
     return this.noteService.getAll(email,take,skip,filter);
   }
  
}
