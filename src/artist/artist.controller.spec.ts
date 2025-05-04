import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';

const artistId = uuidv4();

const artist = {
  id: artistId,
  name: 'Test Artist',
  genre: 'Test Genre',
};

const dto = {
  name: 'Test Artist',
  genre: 'Test Genre',
};

describe('ArtistController', () => {
  let controller: ArtistController;
  let service: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        {
          provide: ArtistService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([artist]),
            findOne: jest.fn().mockResolvedValue(artist),
            create: jest.fn().mockResolvedValue(artist),
          },
        },
      ],
    }).compile();

    controller = module.get<ArtistController>(ArtistController);
    service = module.get<ArtistService>(ArtistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of artists', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([artist]);
  });

  it('should return a single artist by id', async () => {
    const result = await controller.findOne(artistId);
    expect(result).toEqual(artist);
  });

  it('should throw an exception if id does not exist', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValueOnce(new NotFoundException('Artist not found'));

    try {
      await controller.findOne('1');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Artist not found');
    }
  });

  it('should create a new Artist', async () => {
    const result = await controller.create(dto);
    expect(result).toEqual(artist);
  });
});
