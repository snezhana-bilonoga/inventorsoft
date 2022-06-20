import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from '../roles/roles.model';

interface UserCreation {
    email: string;
    password: string;
}
@Entity({
    name: 'users',
})
export class User implements UserCreation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Role)
    role: Role;
}
