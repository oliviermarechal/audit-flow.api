import { ValueObject } from '../../../core/domain';

export interface ReferentialDataMappingProps {
    versionId: string;
    referentialCriteria: string;
    identifier: string;
    label: string;
    category: string;
    description: string;
    implement: string;
    control: string;
}

export class ReferentialDataMapping extends ValueObject<ReferentialDataMappingProps> {
    referentialCriteria: string;
    identifier: string;
    label: string;
    category: string;
    description?: string;
    implement?: string;
    control?: string;
    versionId: string;

    constructor(props) {
        super(props);
        this.referentialCriteria = props.referentialCriteria;
        this.identifier = props.identifier;
        this.label = props.label;
        this.category = props.category;
        this.description = props.description;
        this.implement = props.implement;
        this.control = props.control;
        this.versionId = props.versionId;
    }

    static create(props: ReferentialDataMappingProps) {
        if (!ReferentialDataMapping.validate(props)) {
            throw new Error('invalid value object');
        }

        return new ReferentialDataMapping(props);
    }

    static validate(props: ReferentialDataMappingProps): boolean {
        return (
            !!props.referentialCriteria &&
            !!props.identifier &&
            !!props.category &&
            !!props.label &&
            !!props.versionId
        );
    }
}
