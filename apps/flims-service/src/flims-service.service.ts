import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Flim } from './entities/flim.entity';
import { IFlim } from './interfaces/flim';
import { IFlimsSearch } from './interfaces/search';

@Injectable()
export class FlimsServiceService {

  private logger = new Logger(FlimsServiceService.name);

  constructor(
    @InjectRepository(Flim)
    private flimsRepository: Repository<Flim>,
  ) {
    this.logger.log('initilized');
  }

  async create(input: IFlim) {
    this.logger.log(`[${FlimsServiceService.name}] ${this.create.name} was called with: ${JSON.stringify(input)}`);

    const titleAlreadyExists = await this.flimsRepository.findOneBy({
      title: input.title,
    });

    if (titleAlreadyExists) {
      throw new RpcException({ message: 'flim already registered with given title', code: 'Flim_001' });
    }

    const flim = new Flim();
    Object.assign(flim, input);

    this.logger.log('calling FlimsRepository.save');
    await this.flimsRepository.save(flim);

    return { message: 'flim created successfully', flim }; 
  }

  async update(input: IFlim) {
    this.logger.log(`[${FlimsServiceService.name}] ${this.update.name} was called`);
    const flim = await this.flimsRepository.findOneBy({ id: input.id });

    /* if different title is provided - check: that title already registered! */
    const titleAlreadyExists =  flim.title !== input.title ? await this.flimsRepository.findOneBy({ title: input.title }) : null

    if (titleAlreadyExists) {
      throw new RpcException({ message: 'flim already registered with given title', code: 'Flim_001' });
    }

    Object.assign(flim, input);

    this.logger.log('calling FlimsRepository.save');
    await this.flimsRepository.save(flim);

    return { message: 'flim updated successfully', flim };
  }

  async delete(input: IFlim) {
    this.logger.log(`[${FlimsServiceService.name}] ${this.delete.name} was called`);

    this.logger.log('calling FlimsRepository.findOneBy');
    const flim = await this.flimsRepository.findOneBy({ id: input.id });

    if (!flim) {
      throw new RpcException({ error: 'flim not found!', code: 'Flim_002' })
    }

    this.logger.log('calling FlimsRepository.remove');
    await this.flimsRepository.remove(flim);

    return { message: 'flim delete successfully', flim };
  }

  async search(input: IFlimsSearch) {
    this.logger.log(`[${FlimsServiceService.name}] ${this.search.name} was called`);

    const where: FindOptionsWhere<Flim> = {};

    if (input.title) where.title = input.title;
    if (input.director) where.director = input.director;
    if (input.release_year) where.release_year = input.release_year;
    if (input.actors) where.actors = Like(`%${input.actors.join('%')}%`);

    this.logger.log('calling FlimsRepository.findAndCount');
    const [ flims, count ] = await this.flimsRepository.findAndCount({ where });
    return { flims, count };
  }

  async findByTitle(title: string) {
    this.logger.log(`[${FlimsServiceService.name}] ${this.findByTitle.name} was called`);

    this.logger.log('calling FlimsRepository.findOneBy');
    const flim = await this.flimsRepository.findOneBy({ title });
    if (!flim) return null;
    return { flim };
  }

  async findAll() {
    this.logger.log(`[${FlimsServiceService.name}] ${this.findAll.name} was called`);

    this.logger.log('calling FlimsRepository.findAndCount');
    const [ flims, count ] = await this.flimsRepository.findAndCount();
    return { flims, count };
  }
}
