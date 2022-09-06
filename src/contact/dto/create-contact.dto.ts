import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  MaxLength,
} from 'class-validator';

//Para usar los valdators hay que modificar main.ts
export class CreateContactDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly surname: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly state: boolean;
}
