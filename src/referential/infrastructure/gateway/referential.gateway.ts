import { Injectable } from '@nestjs/common';
import {
    Criteria,
    Referential,
    ReferentialSyncModeEnum,
    ReferentialGatewayInterface,
} from '../../domain';

@Injectable()
export class ReferentialGateway implements ReferentialGatewayInterface {
    async fetchReferential(
        referential: Referential,
        version: string,
    ): Promise<Criteria[]> {
        const refVersion = referential.getVersion(version);

        if (refVersion.syncMode !== ReferentialSyncModeEnum.API) {
            throw new Error(
                'Other mode than API to take criterias is not available actually',
            );
        }

        const url = refVersion.versionInUrl
            ? refVersion.url.replace('<version>', version)
            : refVersion.url;

        // TODO create http fetcher service
        const response = await fetch(url);
        // TODO Manage error
        const referentialData = await response.json();

        const dataMapping = refVersion.dataMapping;
        const criteriasData = referentialData[dataMapping.referentialCriteria];

        const criterias: Criteria[] = [];
        for (const criteria of criteriasData) {
            criterias.push({
                label: criteria[dataMapping.label],
                externalId: criteria[dataMapping.identifier],
                category: criteria[dataMapping.category],
                description: criteria[dataMapping.description],
                implement: criteria[dataMapping.implement],
                control: criteria[dataMapping.control],
                referentialId: referential.id,
            });
        }

        return criterias;
    }
}
