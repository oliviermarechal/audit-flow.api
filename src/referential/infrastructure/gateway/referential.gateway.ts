import {
    Criteria,
    Referential,
    ReferentialGatewayInterface,
    ReferentialSyncModeEnum,
    ReferentialVersion,
} from '../../domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReferentialGateway implements ReferentialGatewayInterface {
    async fetchReferential(version: ReferentialVersion): Promise<Criteria[]> {
        if (version.syncMode !== ReferentialSyncModeEnum.API) {
            throw new Error(
                'Other mode than API to take criterias is not available actually',
            );
        }

        const url = version.url;

        // TODO create default Http client in App layer!
        const response = await fetch(url);
        // TODO Manage error
        const referentialData = await response.json();

        const dataMapping = version.dataMapping;
        const criteriasData = referentialData[dataMapping.referentialCriteria];

        const criterias: Criteria[] = [];
        for (const criteria of criteriasData) {
            criterias.push(
                Criteria.create({
                    label: criteria[dataMapping.label],
                    externalId: criteria[dataMapping.identifier],
                    category: criteria[dataMapping.category],
                    description: criteria[dataMapping.description],
                    versionId: version.id,
                }),
            );
        }

        return criterias;
    }
}
