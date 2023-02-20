import {
    CriteriaRepositoryInterface,
    ReferentialVersionRepositoryInterface,
} from '../../domain';
import {
    CREATE_CRITERIA_USECASES,
    CreateCriteriaUsecases,
} from '../../usecases';

export const CreateCriteriaUsecaseProvider = {
    inject: [
        ReferentialVersionRepositoryInterface,
        CriteriaRepositoryInterface,
    ],
    provide: CREATE_CRITERIA_USECASES,
    useFactory: (
        referentialVersionRepository: ReferentialVersionRepositoryInterface,
        criteriaRepository: CriteriaRepositoryInterface,
    ) => {
        return new CreateCriteriaUsecases(
            referentialVersionRepository,
            criteriaRepository,
        );
    },
};
