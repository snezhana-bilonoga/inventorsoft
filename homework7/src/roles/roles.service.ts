import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role-dto';
import { Role } from '../roles/roles.model';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>;

    async createRole(dto: CreateRoleDto) {
        const role = this.roleRepository.save(dto);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOneBy({ value });
        return role;
    }

    async getAllRoles() {
        const roles = await this.roleRepository.find();
        return roles;
    }
}
