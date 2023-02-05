import {
    Referential,
    ReferentialProps,
    ReferentialRepositoryInterface,
} from '../../domain';
import { Usecases } from '../../../core/domain';

export class CreateReferentialUsecases implements Usecases {
    constructor(
        private readonly referentialRepository: ReferentialRepositoryInterface,
    ) {}

    async execute(
        label: string,
        description: string,
        url?: string,
    ): Promise<Referential> {
        const referentialProps = {
            label,
            url,
            description,
        } satisfies ReferentialProps;
        const referential = Referential.create(referentialProps);

        return this.referentialRepository.create(referential);
    }
}

export const CREATE_REFERENTIAL_USECASES = 'CreateReferentielUseCases';
