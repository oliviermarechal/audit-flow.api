import { CqrsCommandInterface } from './cqrs-command.interface';
import { CqrsQueryInterface } from './cqrs-query.interface';

export interface CqrsAdapterInterface {
    executeCommand<T>(command: CqrsCommandInterface): Promise<T>;
    executeQuery<T>(query: CqrsQueryInterface): Promise<T>;
}

export const CqrsAdapterInterface = Symbol('CqrsAdapterInterface');
