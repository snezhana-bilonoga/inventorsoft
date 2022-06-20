import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private roleService: RolesService
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER');
        await this.userRepository.save({ ...user, role });

        const newUser = await this.getUserByEmail(dto.email);
        return newUser;
    }

    async getAllUsers() {
        const users = await this.userRepository.find({ loadRelationIds: true });
        return users;
    }

    async updateUser(email: string, dto: CreateUserDto) {
        const user = await this.getUserByEmail(email);

        if (user) {
            const updatedUser = {
                ...user,
                email: dto.email,
                password: await bcrypt.hash(dto.password, 5),
            };
            this.userRepository.save(updatedUser);
            return updatedUser;
        }

        throw new HttpException('User not exists', HttpStatus.NOT_FOUND);
    }

    async deleteUserByEmail(email: string) {
        const user = await this.getUserByEmail(email);

        if (user) {
            await this.userRepository.remove(user);
            return user;
        }

        throw new HttpException('User not exists', HttpStatus.NOT_FOUND);
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOneBy({ email });
        return user;
    }
}
