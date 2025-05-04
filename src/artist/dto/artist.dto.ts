import { IsNotEmpty, IsString } from 'class-validator';

export class ArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  genre: string;
}
