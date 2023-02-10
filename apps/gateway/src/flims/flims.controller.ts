import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { AddFlimDto, UpdateFlimDto } from "./dtos/flim.dto";

@Controller('flims')
export class FlimsController {
  
  @Patch(':id')
  updateFlim(@Body() input: UpdateFlimDto) {

  }

  @Delete(':title')
  deleteFlim() {

  }

  @Get('search')
  searchFilms() {

  }

  @Get()
  getAllFlims() {

  }

  @Post()
  addFlim(@Body() input: AddFlimDto) {

  }

}