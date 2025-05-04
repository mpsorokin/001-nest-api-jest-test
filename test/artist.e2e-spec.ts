import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { ArtistDto } from '../src/artist/dto/artist.dto';

const dto: ArtistDto = {
  name: 'test artist 01',
  genre: 'pop',
};

describe('ArtistController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.artist.deleteMany();
    await app.close();
  });

  it('POST /artists - should create artist', async () => {
    const response = await request(app.getHttpServer())
      .post('/artists')
      .send(dto)
      .expect(201);

    expect(response.body).toMatchObject(dto);
    expect(response.body).toHaveProperty('id');
  });

  it('GET /artists/:id - should return 404 if artist not found', async () => {
    await request(app.getHttpServer()).get('/artists/not-exist').expect(404);
  });

  it('GET /artists/:id - should return artist by id', async () => {
    const created = await request(app.getHttpServer())
      .post('/artists')
      .send(dto)
      .expect(201);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const artistId: string = created.body.id;

    const response = await request(app.getHttpServer())
      .get(`/artists/${artistId}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: artistId,
      name: dto.name,
      genre: dto.genre,
    });
    expect(created.body).toHaveProperty('id');
  });
});
