import { Test, TestingModule } from '@nestjs/testing';
import { FlimsServiceController } from './flims-service.controller';
import { FlimsServiceService } from './flims-service.service';

describe('FlimsServiceController', () => {
  let flimsServiceController: FlimsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FlimsServiceController],
      providers: [FlimsServiceService],
    }).compile();

    flimsServiceController = app.get<FlimsServiceController>(FlimsServiceController);
  });

  describe('flim::create', () => {
    it('user can add new flim', async () => {
      const flimInput = {
        title: 'Test Flim',
        director: 'Test Director',
        release_year: 1999,
        actors: ['actor1', 'actor2'],
      };
      const result = await flimsServiceController.createFlim({ id: null, ...flimInput});
      expect(result).toHaveProperty('message', 'flim created successfully');
      expect(result).toHaveProperty('flim');
      expect(result.flim).toMatchObject(flimInput);
    });
  });

  describe('flim::findByTitle', () => {
    it('user can find flim by its title', async () => {
      const flimTitle = 'Tomorror Land';
      const result = await flimsServiceController.searchByTitle({ title: flimTitle });
      expect(result).toHaveProperty('flim');
      expect(result.flim).toMatchObject({ title: flimTitle });
    });
  });

  describe('flim::update', () => {
    it('user can update flim', async () => {

      const flim = {
        id: 1,
        title: 'New Flim',
        director: 'New Director',
        release_year: 2009,
        actors: ['new actor 1', 'new actor 2'],
      };

      const result = await flimsServiceController.updateFlim(flim);
      expect(result).toHaveProperty('message', 'flim updated successfully');
      expect(result).toHaveProperty('flim');
      expect(result.flim).toMatchObject(flim);
    });
  });
  
  describe('flim::findAll', () => {
    it('user find all flim', async () => {
      const result = await flimsServiceController.findAll();
      expect(result).toHaveProperty('flims');
      expect(result).toHaveProperty('count');
      expect(result.flims.length).toBeGreaterThan(0);
      expect(result.count).toBeGreaterThan(0);
    });
  });

  describe('flim::search', () => {
    it('user search for flims', async () => {

      const searchQuery = {
        release_year: 2009,
      };

      const result = await flimsServiceController.searchFilms(searchQuery);
      expect(result).toHaveProperty('flims');
      expect(result).toHaveProperty('count');
      expect(result.flims.length).toBeGreaterThan(0);
      expect(result.count).toBeGreaterThan(0);
    });
  });

  describe('flim::delete', () => {
    it('user can delete flim', async () => {

      const flim = {
        id: 1,
        title: 'New Flim',
        director: 'New Director',
        release_year: 2009,
        actors: ['new actor 1', 'new actor 2'],
      };

      const result = await flimsServiceController.deleteFlim(flim);
      expect(result).toHaveProperty('message', 'flim delete successfully');
      expect(result).toHaveProperty('flim');
    });
  });

});
