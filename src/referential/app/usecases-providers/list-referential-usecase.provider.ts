import { ReferentialRepositoryInterface } from '../../domain';
import {
    LIST_REFERENTIAL_USECASES,
    ListReferentialUsecases,
} from '../../usecases';

export const ListReferentialUsecaseProvider = {
    inject: [ReferentialRepositoryInterface],
    provide: LIST_REFERENTIAL_USECASES,
    useFactory: (referentialRepository: ReferentialRepositoryInterface) => {
        return new ListReferentialUsecases(referentialRepository);
    },
};
