import {
    Template,
    TemplateProps,
    TemplateRepositoryInterface,
} from '../../domain';
import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DB_PROVIDER } from '../../../core/app';
import { objectKeysToCamelCase } from '../../../core/app/tools';
import { Version } from '../../domain/model/version';

@Injectable()
export class TemplateRepository implements TemplateRepositoryInterface {
    constructor(
        @Inject(DB_PROVIDER)
        private readonly pool: Pool,
    ) {}
    async find(id: string): Promise<Template> {
        const queryResult = await this.pool.query(
            `SELECT * FROM template WHERE id = $1`,
            [id],
        );

        // TODO Fetch eager elements questions and answers ? Or make another method fetchEager
        return queryResult.rowCount > 0
            ? this.formatTemplate(queryResult.rows[0])
            : null;
    }

    async findByOwnerAndVersion(
        ownerId: string,
        versionId?: string,
    ): Promise<Template[]> {
        let query = `SELECT * FROM template WHERE owner_id = $1`;
        const params = [ownerId];
        if (versionId) {
            query += `AND version_id = $2`;
            params.push(versionId);
        }
        const queryResult = await this.pool.query(query, params);

        return queryResult.rowCount > 0
            ? await Promise.all(
                  queryResult.rows.map(async (r) => {
                      const template = await this.formatTemplate(r);
                      template.version = await this.loadVersionToTemplate(
                          template,
                      );
                      return template;
                  }),
              )
            : [];
    }

    async create(template: Template): Promise<Template> {
        const queryResult = await this.pool.query(
            `INSERT INTO template (name, version_id, owner_id) VALUES ($1, $2, $3) RETURNING *`,
            [template.name, template.versionId, template.ownerId],
        );

        return queryResult.rowCount > 0
            ? this.formatTemplate(queryResult.rows[0])
            : null;
    }

    async formatTemplate(templateRow: any): Promise<Template> {
        return new Template(
            await objectKeysToCamelCase<TemplateProps>(templateRow),
            templateRow.id,
        );
    }

    private async loadVersionToTemplate(template: Template): Promise<Version> {
        return objectKeysToCamelCase<Version>(
            (
                await this.pool.query(
                    `SELECT rv.id, rv.version, r.label as referential_name 
                    FROM referential_version rv 
                    LEFT JOIN referential r 
                        ON r.id = rv.referential_id
                    WHERE rv.id = $1`,
                    [template.versionId],
                )
            ).rows[0],
        );
    }
}
