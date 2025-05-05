import { Controller } from '@nestjs/common';
import { SpotifyService } from './spotify.service';

@Controller({ version: '2' })
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}
}
