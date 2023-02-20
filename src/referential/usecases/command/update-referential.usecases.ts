import {
    Referential,
    ReferentialProps,
    ReferentialRepositoryInterface,
} from '../../domain';
import { ForbiddenException, Usecases } from '../../../core/domain';

export class UpdateReferentialUsecases implements Usecases {
    constructor(
        private readonly referentialRepository: ReferentialRepositoryInterface,
    ) {}

    async execute(
        referentialId: string,
        userId: string,
        label: string,
        description: string,
        url?: string,
    ): Promise<Referential> {
        const referential = await this.referentialRepository.find(
            referentialId,
        );

        if (referential.ownerId !== userId) {
            throw new ForbiddenException();
        }

        const referentialProps = {
            label,
            url,
            description,
        } satisfies ReferentialProps;
        // Todo maybe create UpdateReferentialProps ? for restriction data update like ownerId

        referential.update(referentialProps);

        return this.referentialRepository.update(referential);
    }
}

export const UPDATE_REFERENTIAL_USECASES = 'UpdateReferentialUsecases';
