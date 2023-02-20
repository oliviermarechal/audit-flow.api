import { ReferentialRepositoryInterface } from '../../domain';
import {
    UPDATE_REFERENTIAL_USECASES,
    UpdateReferentialUsecases,
} from '../../usecases';

export const UpdateReferentialUsecaseProvider = {
    inject: [ReferentialRepositoryInterface],
    provide: UPDATE_REFERENTIAL_USECASES,
    useFactory: (referentialRepository: ReferentialRepositoryInterface) => {
        return new UpdateReferentialUsecases(referentialRepository);
    },
};
