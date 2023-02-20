import { Referential } from '../model';

export interface ReferentialRepositoryInterface {
    create(referential: Referential): Promise<Referential>;
    update(referential: Referential): Promise<Referential>;
    findAll(): Promise<Referential[]>;
    findByOwnerOrPublic(userId: string): Promise<Referential[]>;
    find(id: string): Promise<Referential>;
}

export const ReferentialRepositoryInterface = Symbol(
    'ReferentialRepositoryInterface',
);
