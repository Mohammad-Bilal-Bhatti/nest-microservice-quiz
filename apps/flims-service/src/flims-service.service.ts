import { Injectable } from '@nestjs/common';
import { IFlim } from './interfaces/flim';
import { IFlimsSearch } from './interfaces/search';

@Injectable()
export class FlimsServiceService {
  create(input: IFlim) {
    console.log(`[${FlimsServiceService.name}] ${this.create.name} was called with: ${JSON.stringify(input)}`);
    return { message: 'flim created successfully', id: 123 };
  }

  update(input: IFlim) {
    console.log(`[${FlimsServiceService.name}] ${this.update.name} was called with: ${JSON.stringify(input)}`);
    return { message: 'flim updated successfully', id: 123 };
  }

  delete(input: IFlim) {
    console.log(`[${FlimsServiceService.name}] ${this.delete.name} was called with: ${JSON.stringify(input)}`);
    return { message: 'flim delete successfully', id: 123 };
  }

  search(input: IFlimsSearch) {
    console.log(`[${FlimsServiceService.name}] ${this.search.name} was called with: ${JSON.stringify(input)}`);
    return { flims: [1, 2, 3] };
  }

  findByTitle(title: string) {
    console.log(`[${FlimsServiceService.name}] ${this.findByTitle.name} was called with: ${title}`);
    return { flim: 1 };
  }

  findAll() {
    console.log(`[${FlimsServiceService.name}] ${this.findAll.name} was called`);
    return { flims: [1, 2, 3] };
  }

}
