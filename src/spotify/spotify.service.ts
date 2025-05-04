import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AuthResponse } from './interfaces/auth-response.interface';

@Injectable()
export class SpotifyService {
  private accessToken: string | null;
  private readonly tokenExpiry: number = 0;

  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.CLIENT_ID = configService.getOrThrow<string>('SPOTIFY_CLIENT_ID');
    this.CLIENT_SECRET = configService.getOrThrow<string>(
      'SPOTIFY_CLIENT_SECRET',
    );
  }

  private async authenticate(): Promise<void> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return;
    }

    const creds = Buffer.from(
      `${this.CLIENT_ID}:${this.CLIENT_SECRET}`,
    ).toString('base64');

    const response = await firstValueFrom(
      this.httpService.post<AuthResponse>(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic: ${creds}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );

    this.accessToken = response.data.access_token;
  }
}
