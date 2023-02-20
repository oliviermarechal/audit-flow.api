import { Criteria, Referential, ReferentialVersion } from '../model';

export interface ReferentialGatewayInterface {
    fetchReferential(version: ReferentialVersion): Promise<Criteria[]>;
}

export const ReferentialGatewayInterface = Symbol(
    'ReferentialGatewayInterface',
);
