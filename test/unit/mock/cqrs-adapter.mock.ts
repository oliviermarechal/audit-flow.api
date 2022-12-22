import {
    CqrsAdapterInterface,
    CqrsCommandInterface,
    CqrsQueryInterface,
} from '../../../src/app/domain';

export class CqrsAdapterMock implements CqrsAdapterInterface {
    async executeCommand<T>(command: CqrsCommandInterface): Promise<T> {
        return;
    }

    async executeQuery<T>(query: CqrsQueryInterface): Promise<T> {
        return;
    }
}
