import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface RoleCreation {
    value: string;
    description: string;
}

@Entity({
    name: 'roles',
})
export class Role implements RoleCreation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    value: string;

    @Column()
    description: string;
}
