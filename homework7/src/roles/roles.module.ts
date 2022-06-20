import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { User } from '../users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [TypeOrmModule.forFeature([Role, User]), AuthModule],
    exports: [RolesService],
})
export class RolesModule {}
