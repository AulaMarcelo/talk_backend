import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [HttpModule],
})
export class NoteModule {}
