import { CriteriaRepositoryInterface } from '../../domain/repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CriteriaEntity } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CriteriaInterface } from '../../domain/model';

@Injectable()
export class CriteriaRepository implements CriteriaRepositoryInterface {
    constructor(
        @InjectRepository(CriteriaEntity)
        private readonly repository: Repository<CriteriaEntity>,
    ) {}

    async save(criteria: CriteriaInterface): Promise<CriteriaInterface> {
        return this.repository.save(criteria);
    }

    async findAll(): Promise<CriteriaInterface[]> {
        return this.repository.find();
    }
}
