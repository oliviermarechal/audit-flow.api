import { ValueObject } from '../../../core/domain';

export interface ReferentialDataMappingProps {
    versionId: string;
    referentialCriteria: string;
    identifier: string;
    label: string;
    category?: string;
    description?: string;
}

export class ReferentialDataMapping extends ValueObject<ReferentialDataMappingProps> {
    referentialCriteria: string;
    identifier: string;
    label: string;
    category?: string;
    description?: string;
    versionId: string;

    constructor(props) {
        super(props);
        this.referentialCriteria = props.referentialCriteria;
        this.identifier = props.identifier;
        this.label = props.label;
        this.category = props.category;
        this.description = props.description;
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
            !!props.label &&
            !!props.versionId
        );
    }
}
