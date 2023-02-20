import {
    ReferentialRepositoryInterface,
    ReferentialVersionRepositoryInterface,
} from '../../domain';
import {
    ADD_VERSION_USECASES,
    AddReferentialVersionUsecases,
} from '../../usecases';

export const AddReferentialVersionUsecaseProvider = {
    inject: [
        ReferentialRepositoryInterface,
        ReferentialVersionRepositoryInterface,
    ],
    provide: ADD_VERSION_USECASES,
    useFactory: (
        referentialRepository: ReferentialRepositoryInterface,
        referentialVersionRepository: ReferentialVersionRepositoryInterface,
    ) => {
        return new AddReferentialVersionUsecases(
            referentialRepository,
            referentialVersionRepository,
        );
    },
};
