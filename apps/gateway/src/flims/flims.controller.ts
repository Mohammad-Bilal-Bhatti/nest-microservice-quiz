import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { concatMap } from "rxjs";
import { Service } from "../shared/available.services";
import { AddFlimDto, UpdateFlimDto } from "./dtos/flim.dto";
import { SearchFlimsInput } from "./dtos/search-flims-input.dto";

@Controller('flims')
export class FlimsController {

  constructor(@Inject(Service.Flims) private readonly flimsService: ClientProxy) {}
  
  @Patch(':id')
  updateFlim(@Body() input: UpdateFlimDto) {
    return this.flimsService.send('flim::update', input);
  }

  @Delete(':title')
  deleteFlim(@Param('title') flimTitle: string) {
    return this.flimsService.send('flim::findByTitle', { title: flimTitle }).pipe(
      concatMap(flim => {
        return this.flimsService.send('flim::delete', flim);
      })
    );
  }

  @Get('search')
  searchFilms(@Query() input: SearchFlimsInput) {
    return this.flimsService.send('flim::search', input);
  }

  @Get()
  getAllFlims() {
    return this.flimsService.send('flim::findAll', {});
  }

  @Post()
  addFlim(@Body() input: AddFlimDto) {
    return this.flimsService.send('flim::create', input);
  }

}