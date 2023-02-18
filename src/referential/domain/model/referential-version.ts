import { Entity } from '../../../core/domain';
import {
    ReferentialDataMapping,
    ReferentialDataMappingProps,
} from './referential-data-mapping';

export enum ReferentialSyncModeEnum {
    MANUAL = 'MANUAL',
    API = 'API',
}

export enum ReferentialVersionStatusEnum {
    Draft = 'Draft',
    Published = 'Published',
    Archived = 'Archived',
}

export interface UpdateReferentialVersionDataInterface {
    id: string;
    url?: string;
    version: string;
    updatedAt?: Date;
    syncMode: ReferentialSyncModeEnum;
    dataMapping?: ReferentialDataMappingProps;
    referentialId: string;
    status?: ReferentialVersionStatusEnum;
}

export interface ReferentialVersionProps {
    id?: string;
    url?: string;
    version: string;
    updatedAt?: Date;
    syncMode: ReferentialSyncModeEnum;
    dataMapping?: ReferentialDataMapping;
    referentialId: string;
    status?: ReferentialVersionStatusEnum;
}

export class ReferentialVersion extends Entity<ReferentialVersionProps> {
    id: string;
    url?: string;
    version: string;
    updatedAt?: Date;
    syncMode: ReferentialSyncModeEnum;
    dataMapping?: ReferentialDataMapping;
    referentialId: string;
    status = ReferentialVersionStatusEnum.Draft;

    constructor(props: ReferentialVersionProps) {
        super();
        this.url = props.url;
        this.version = props.version;
        this.updatedAt = props.updatedAt;
        this.syncMode = props.syncMode;
        if (props.dataMapping) {
            this.dataMapping = props.dataMapping;
        }
        this.referentialId = props.referentialId;
    }

    public update(data: UpdateReferentialVersionDataInterface) {
        this.url = data.url;
        this.version = data.version;
        this.updatedAt = data.updatedAt;
        this.syncMode = data.syncMode;
        this.updatedAt = new Date();

        const dataMappingValueObject = ReferentialDataMapping.create(
            data.dataMapping,
        );

        if (
            data.dataMapping &&
            !this.dataMapping.equals(dataMappingValueObject)
        ) {
            this.dataMapping = dataMappingValueObject;
        }
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
                console.log('ça va pas ?');
                return false;
            }
        }

        return !!props.syncMode && !!props.referentialId;
    }
}
