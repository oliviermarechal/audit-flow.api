import { ReferentialVersion } from './referential-version';
import { Entity } from '../../../core/domain';

export interface ReferentialProps {
    id?: string;
    label: string;
    url?: string;
    description: string;
    updatedAt?: Date;
    versions?: ReferentialVersion[];
    ownerId?: string;
    owner?: {
        id: string;
        email: string;
    };
    isPublic?: boolean;
}

export class Referential extends Entity<ReferentialProps> {
    id?: string;
    label: string;
    url?: string;
    description: string;
    isPublic = true;
    ownerId?: string;
    owner?: { id: string; email: string };
    updatedAt?: Date;
    versions?: ReferentialVersion[] = [];

    constructor(props: ReferentialProps) {
        super();
        this.id = props.id;
        this.label = props.label;
        this.url = props.url;
        this.description = props.description;
        this.updatedAt = props.updatedAt;
        this.ownerId = props.ownerId;

        if (props.isPublic) {
            this.isPublic = props.isPublic;
        }
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
