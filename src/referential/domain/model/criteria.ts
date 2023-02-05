import { Referential } from './referential';

export class Criteria {
    id?: string;
    label: string;
    externalId: string;
    category: string; // TODO Create Category entity ?
    description: string;
    // Implement & control => EAV ?
    implement?: string;
    control?: string;
    referentialId: string;
    referential?: Referential;
}
