import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Artist } from '../../generated/prisma';
import { ArtistDto } from './dto/artist.dto';
import { ArtistService } from './artist.service';
import { PrismaService } from '../prisma/prisma.service';

const artistId = uuidv4();

const artists: Artist[] = [
  { id: artistId, name: 'test name 01', genre: 'pop' },
  { id: uuidv4(), name: 'test name 02', genre: 'pop' },
  { id: uuidv4(), name: 'test name 03', genre: 'pop' },
];

const artist: Artist = artists[0];

const dto: ArtistDto = { name: artist.name, genre: artist.genre };

const db = {
  artist: {
    findMany: jest.fn().mockResolvedValue(artists),
    findUnique: jest.fn().mockResolvedValue(artist),
    create: jest.fn().mockResolvedValue(artist),
  },
};

describe('ArtistService', () => {
  let service: ArtistService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtistService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<ArtistService>(ArtistService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of artists', async () => {
    const result = await service.findAll();
    expect(result).toEqual(artists);
  });

  it('should return a single artist by id', async () => {
    const result = await service.findOne(artistId);
    expect(result).toEqual(artist);
  });

  it('should create a new Artist', async () => {
    expect(service.create(dto)).resolves.toEqual(artist);
  });
});
