import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.roleService.getAllRoles();
    }
}
