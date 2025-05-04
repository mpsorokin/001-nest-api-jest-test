import { Injectable } from '@nestjs/common';
import { SpotifyService } from './spotify/spotify.service';

@Injectable()
export class AppService {
  constructor(private readonly spotifyService: SpotifyService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getArtist(id: string) {
    const artist = await this.spotifyService.getArtist(id);

    return artist;
  }
}
