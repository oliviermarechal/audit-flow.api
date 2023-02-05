import { Referential } from '../model';

export interface ReferentialRepositoryInterface {
    create(referential: Referential): Promise<Referential>;
    findAll(): Promise<Referential[]>;
    find(id: string): Promise<Referential>;
}

export const ReferentialRepositoryInterface = Symbol(
    'ReferentialRepositoryInterface',
);
