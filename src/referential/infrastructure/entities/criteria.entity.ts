import { CriteriaInterface } from '../../domain/model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('criteria')
export class CriteriaEntity implements CriteriaInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'external_id' })
    externalId: string;

    @Column()
    url: string;

    @Column()
    category: string; // TODO Create Category entity ?

    @Column()
    target: string;

    @Column()
    implement: string;

    @Column()
    control: string;
}
