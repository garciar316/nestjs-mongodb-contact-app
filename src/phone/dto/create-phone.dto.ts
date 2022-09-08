import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

//Para usar los valdators hay que modificar main.ts
export class CreatePhoneDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly contact_id: number;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly phone: number;
}
