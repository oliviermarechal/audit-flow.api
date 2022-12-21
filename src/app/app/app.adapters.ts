import { CqrsAdapterInterface } from '../domain';
import { CqrsAdapter } from '../infrastructure';

export const AppAdapters = [
    { provide: CqrsAdapterInterface, useClass: CqrsAdapter },
];
