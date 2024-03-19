import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { Prisma } from '@prisma/client';



@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}
  @Post()
    async createNote(@Body() createNoteDto: Prisma.NoteCreateInput) {
       return this.noteService.createNote(createNoteDto)
   }

   @Get('getall')
   async getAllDesativados(@Query('take') take:string, @Query('skip') skip:string, @Query('filter') filter?:string   ){
 
     return this.noteService.getAll(take,skip,filter);
   }
  
}
