import {
    CriteriaRepositoryInterface,
    ReferentialVersionRepositoryInterface,
} from '../../domain';
import { LIST_CRITERIA_USECASES, ListCriteriaUsecases } from '../../usecases';

export const ListCriteriaUsecaseProvider = {
    inject: [
        ReferentialVersionRepositoryInterface,
        CriteriaRepositoryInterface,
    ],
    provide: LIST_CRITERIA_USECASES,
    useFactory: (
        referentialVersionRepository: ReferentialVersionRepositoryInterface,
        criteriaRepository: CriteriaRepositoryInterface,
    ) => {
        return new ListCriteriaUsecases(
            referentialVersionRepository,
            criteriaRepository,
        );
    },
};
