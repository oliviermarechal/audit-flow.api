import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { AppAdapters } from '../../../src/app/app';
import { ReferentialModule } from '../../../src/referential/app/referential.module';

export const createTestApp = async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
            CqrsModule,
            ConfigModule.forRoot(),
            ReferentialModule.forRoot(),
        ],
        providers: [...AppAdapters],
    }).compile();

    const app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    return app.init();
};
