import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'Should be String' })
    @IsEmail({}, { message: 'Should be correct Email' })
    readonly email: string;

    @IsString({ message: 'Should be String' })
    @Length(4, 16, { message: 'Should have length 4-16' })
    readonly password: string;
}
