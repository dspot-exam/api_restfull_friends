import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  @IsString()
  img: string;

  @ApiProperty()
  @IsString()
  @Length(3, 20)
  first_name: string;

  @ApiProperty()
  @IsString()
  @Length(3, 20)
  last_name: string;

  @ApiProperty()
  @IsString()
  @Length(8, 20)
  phone: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  @Length(3, 20)
  city: string;

  @ApiProperty()
  @IsString()
  @Length(2)
  state: string;

  @ApiProperty()
  @IsString()
  @Length(3, 20)
  zipcode: string;

  @ApiProperty()
  @IsBoolean()
  available: boolean;
}
