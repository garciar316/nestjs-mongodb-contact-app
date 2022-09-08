import { IsNotEmpty, IsString, IsBoolean, MaxLength } from 'class-validator';

//Para usar los valdators hay que modificar main.ts
export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  readonly surname: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly state: boolean;
}
