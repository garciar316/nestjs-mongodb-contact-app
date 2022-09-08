import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

//Para usar los valdators hay que modificar main.ts
export class CreatePhoneDto {
  @IsString()
  @IsNotEmpty()
  readonly contact_id: string;

  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  readonly phone: string;
}
