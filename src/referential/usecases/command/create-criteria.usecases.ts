import { ForbiddenException, Usecases } from '../../../core/domain';
import {
    Criteria,
    CriteriaProps,
    CriteriaRepositoryInterface,
    ReferentialVersionRepositoryInterface,
    ReferentialVersionStatusEnum,
} from '../../domain';

export class CreateCriteriaUsecases implements Usecases {
    constructor(
        private readonly referentialVersionRepository: ReferentialVersionRepositoryInterface,
        private readonly criteriaRepository: CriteriaRepositoryInterface,
    ) {}

    async execute(userId, versionId: string, props: CriteriaProps) {
        if (
            !(await this.referentialVersionRepository.isOwner(
                versionId,
                userId,
            ))
        ) {
            throw new ForbiddenException();
        }

        const version = await this.referentialVersionRepository.find(versionId);
        if (version.status === ReferentialVersionStatusEnum.Published) {
            throw new Error(
                'Vous ne pouvez pas ajouter de critères sur une version publié',
            );
        }

        return this.criteriaRepository.save(
            Criteria.create({ ...props, versionId }),
        );
    }
}

export const CREATE_CRITERIA_USECASES = Symbol('CreateCriteriaUsecases');
