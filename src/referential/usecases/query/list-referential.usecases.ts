import { Usecases } from '../../../core/domain';
import { Referential, ReferentialRepositoryInterface } from '../../domain';

export class ListReferentialUsecases implements Usecases {
    constructor(
        public readonly referentialRepository: ReferentialRepositoryInterface,
    ) {}

    async execute(ownerId: string): Promise<Referential[]> {
        return this.referentialRepository.findByOwnerOrPublic(ownerId);
    }
}

export const LIST_REFERENTIAL_USECASES = Symbol('ListReferentialUsecases');
