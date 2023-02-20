import { Entity } from '../../../core/domain';

export interface CriteriaProps {
    id?: string;
    label: string;
    externalId: string;
    category?: string;
    description?: string;
    versionId: string;
}
export class Criteria extends Entity<CriteriaProps> {
    id?: string;
    label: string;
    externalId: string;
    category?: string;
    description?: string;
    versionId: string;

    constructor(props: CriteriaProps) {
        super();
        this.id = props.id;
        this.label = props.label;
        this.externalId = props.externalId;
        this.category = props.category;
        this.description = props.description;
        this.versionId = props.versionId;
    }

    static create(props: CriteriaProps) {
        return new Criteria(props);
    }

    public update(props: CriteriaProps) {
        this.label = props.label;
        this.externalId = props.externalId;
        this.category = props.category;
        this.description = props.description;
    }
}
