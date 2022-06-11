import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:email')
    updateUser(@Param('email') email: string, @Body() dto: CreateUserDto) {
        return this.usersService.updateUser(email, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:email')
    deleteUserByEmail(@Param('email') email: string) {
        return this.usersService.deleteUserByEmail(email);
    }
}
