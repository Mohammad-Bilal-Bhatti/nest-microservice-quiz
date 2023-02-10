import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlimsServiceService } from './flims-service.service';
import { IFlim } from './interfaces/flim';
import { IFlimsSearch } from './interfaces/search';

@Controller()
export class FlimsServiceController {
  constructor(private readonly service: FlimsServiceService) {}

  @MessagePattern('flim::create')
  createFlim(@Payload() input: IFlim) {
    return this.service.create(input);
  }
   
  @MessagePattern('flim::findByTitle')
  searchByTitle(@Payload() input: { title: string }) {
    return this.service.findByTitle(input.title);
  }

  @MessagePattern('flim::update')
  updateFlim(@Payload() input: IFlim) {
    return this.service.update(input);
  }

  @MessagePattern('flim::delete')
  deleteFlim(@Payload() input: IFlim) {
    return this.service.delete(input);
  }

  @MessagePattern('flim::search')
  searchFilms(@Payload() input: IFlimsSearch) {
    return this.service.search(input);
  }

  @MessagePattern('flim::findAll')
  findAll() {
    return this.service.findAll();
  }
}
