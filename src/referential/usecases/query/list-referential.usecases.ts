import { Usecases } from '../../../core/domain';
import { Referential, ReferentialRepositoryInterface } from '../../domain';

export class ListReferentialUsecases implements Usecases {
    constructor(
        public readonly referentialRepository: ReferentialRepositoryInterface,
    ) {}

    async execute(): Promise<Referential[]> {
        // TODO Add public where clause and owner = user.id filter
        const data = await this.referentialRepository.findAll();

        console.log(data[0].versions);
        return data;
    }
}

export const LIST_REFERENTIAL_USECASES = Symbol('ListReferentialUsecases');
