import {
    CqrsAdapterInterface,
    CqrsCommandInterface,
    CqrsQueryInterface,
} from '../../domain';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class CqrsAdapter implements CqrsAdapterInterface {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    async executeCommand<T>(command: CqrsCommandInterface): Promise<T> {
        return this.commandBus.execute(command);
    }

    async executeQuery<T>(query: CqrsQueryInterface): Promise<T> {
        return this.queryBus.execute(query);
    }
}
