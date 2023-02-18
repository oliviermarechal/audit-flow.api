import { ReferentialDataMapping } from '../model';

export interface DataMappingRepositoryInterface {
    save(dataMapping: ReferentialDataMapping): Promise<ReferentialDataMapping>;
    findByVersion(versionId: string): Promise<ReferentialDataMapping>;
    removeFromVersion(versionId: string): Promise<void>;
}

export const DataMappingRepositoryInterface = Symbol(
    'DataMappingRepositoryInterface',
);
