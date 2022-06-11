import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER');
        await user.$set('roles', [role.id]);

        const newUser = await this.getUserByEmail(dto.email);
        return newUser;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: { all: true },
        });
        return users;
    }

    async updateUser(email: string, dto: CreateUserDto) {
        const user = await this.getUserByEmail(email);

        if (user) {
            user.set('email', dto.email);
            user.set('password', await bcrypt.hash(dto.password, 5));
            await user.save();
            return user;
        }

        throw new HttpException('User not exists', HttpStatus.NOT_FOUND);
    }

    async deleteUserByEmail(email: string) {
        const user = await this.getUserByEmail(email);

        if (user) {
            await user.destroy();
            return user;
        }

        throw new HttpException('User not exists', HttpStatus.NOT_FOUND);
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });

        return user;
    }
}
