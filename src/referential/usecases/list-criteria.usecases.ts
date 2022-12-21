import { CqrsAdapterInterface, UsecasesInterface } from '../../app/domain';
import { ListCriteriaQuery } from '../app/query';

export class ListCriteriaUsecases implements UsecasesInterface {
    constructor(private readonly cqrsAdapter: CqrsAdapterInterface) {}

    execute<T>(): Promise<T> {
        return this.cqrsAdapter.executeQuery(new ListCriteriaQuery());
    }
}

export const LIST_CRITERIA_USECASES = 'ListCriteriaUseCases';
