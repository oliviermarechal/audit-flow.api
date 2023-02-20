import { ForbiddenException, Usecases } from '../../../core/domain';
import {
    CriteriaRepositoryInterface,
    ReferentialVersionRepositoryInterface,
    ReferentialVersionStatusEnum,
} from '../../domain';

export class RemoveCriteriaUsecases implements Usecases {
    constructor(
        private readonly referentialVersionRepository: ReferentialVersionRepositoryInterface,
        private readonly criteriaRepository: CriteriaRepositoryInterface,
    ) {}

    async execute(userId: string, criteriaId: string) {
        const criteria = await this.criteriaRepository.find(criteriaId);

        if (
            !(await this.referentialVersionRepository.isOwner(
                criteria.versionId,
                userId,
            ))
        ) {
            throw new ForbiddenException();
        }

        const version = await this.referentialVersionRepository.find(
            criteria.versionId,
        );
        if (version.status !== ReferentialVersionStatusEnum.Draft) {
            throw new Error(
                'Vous ne pouvez pas supprimer de critère sur une version déjà publié',
            );
        }

        await this.criteriaRepository.remove(criteria.id);
    }
}

export const REMOVE_CRITERIA_USECASES = Symbol('RemoveCriteriaUsecases');
