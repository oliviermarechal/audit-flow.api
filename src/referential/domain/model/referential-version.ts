import { Entity } from '../../../core/domain';
import { ReferentialDataMapping } from './referential-data-mapping';

export enum ReferentialSyncModeEnum {
    MANUAL = 'MANUAL',
    API = 'API',
}
export interface ReferentialVersionProps {
    id?: string;
    url?: string;
    version: string;
    updatedAt?: Date;
    syncMode: ReferentialSyncModeEnum;
    versionInUrl?: boolean;
    dataMapping?: ReferentialDataMapping;
    referentialId: string;
}

export class ReferentialVersion extends Entity<ReferentialVersionProps> {
    id: string;
    url?: string;
    version: string;
    updatedAt?: Date;
    syncMode: ReferentialSyncModeEnum;
    versionInUrl?: boolean;
    dataMapping?: ReferentialDataMapping;
    referentialId: string;

    constructor(props: ReferentialVersionProps) {
        super();
        this.url = props.url;
        this.version = props.version;
        this.updatedAt = props.updatedAt;
        this.syncMode = props.syncMode;
        this.versionInUrl = props.versionInUrl;
        this.dataMapping = props.dataMapping;
        this.referentialId = props.referentialId;
    }

    public static create(props: ReferentialVersionProps) {
        if (!ReferentialVersion.validate(props)) {
            throw new Error('invalid entity'); // TODO Create domain exception
        }

        return new ReferentialVersion(props);
    }

    static validate(props: ReferentialVersionProps): boolean {
        if (props.syncMode === ReferentialSyncModeEnum.API) {
            if (!props.dataMapping) {
                return false;
            }
        }

        return !!props.syncMode && !!props.referentialId;
    }
}
