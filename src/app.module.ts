import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistModule } from './artist/artist.module';
import { SpotifyModule } from './spotify/spotify.module';
import { getSpotifyConfig } from './config/spotify.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ArtistModule,
    SpotifyModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getSpotifyConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
