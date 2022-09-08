import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

//Para usar los valdators hay que modificar main.ts
export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  readonly password: string;
}
