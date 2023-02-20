import { Criteria } from '../model';

export interface CriteriaRepositoryInterface {
    save(criteria: Criteria): Promise<Criteria>;
    update(criteria: Criteria): Promise<Criteria>;
    find(id: string): Promise<Criteria>;
    findAll(): Promise<Criteria[]>;
    findByVersion(versionId: string): Promise<Criteria[]>;
    remove(id: string): Promise<void>;
}

export const CriteriaRepositoryInterface = Symbol(
    'CriteriaRepositoryInterface',
);
