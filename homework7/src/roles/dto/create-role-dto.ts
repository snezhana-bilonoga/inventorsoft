import { IsString, Length } from 'class-validator';

export class CreateRoleDto {
    @IsString({ message: 'Should be String' })
    @Length(1, 16, { message: 'Should have length 1-16' })
    readonly value: string;

    @IsString({ message: 'Should be String' })
    @Length(0, 200, { message: 'Should have length 0-200' })
    readonly description: string;
}
