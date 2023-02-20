import { ReferentialRepositoryInterface } from '../../domain';
import {
    CREATE_REFERENTIAL_USECASES,
    CreateReferentialUsecases,
} from '../../usecases';

export const CreateReferentialUsecaseProvider = {
    inject: [ReferentialRepositoryInterface],
    provide: CREATE_REFERENTIAL_USECASES,
    useFactory: (referentialRepository: ReferentialRepositoryInterface) => {
        return new CreateReferentialUsecases(referentialRepository);
    },
};
