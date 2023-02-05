import { AggregateRoot } from '@nestjs/cqrs';
import { ReferentialVersion } from './referential-version';

export interface ReferentialProps {
    id?: string;
    label: string;
    url?: string;
    description: string;
    updatedAt?: Date;
    versions?: ReferentialVersion[];
}

export class Referential extends AggregateRoot {
    id?: string;
    label: string;
    url?: string;
    description: string;
    public = true;
    owner?: string; // TODO user
    updatedAt?: Date;
    versions?: ReferentialVersion[] = [];

    constructor(props: ReferentialProps) {
        super();
        this.id = props.id;
        this.label = props.label;
        this.url = props.url;
        this.description = props.description;
        this.updatedAt = props.updatedAt;

        if (props.versions) {
            this.versions = props.versions;
        }
    }

    public static create(props: ReferentialProps) {
        if (!props.label || props.description) {
            // TODO
        }

        return new Referential(props);
    }

    public hasVersion(version: string): boolean {
        return !!this.versions.find((v) => v.version === version);
    }

    public getVersion(version: string): ReferentialVersion {
        return this.versions.find((v) => v.version === version);
    }
}
