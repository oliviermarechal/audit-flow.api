import { ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppAdapters } from '../../../src/app/app';
import { FixturesLoaderService } from '../../../src/app/app/tools';
import { ReferentialModule } from '../../../src/referential/app/referential.module';

export const createTestApp = async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [
            CqrsModule,
            ConfigModule.forRoot(),
            TypeOrmModule.forRootAsync({
                imports: [ConfigModule],
                useFactory: (configService: ConfigService) => ({
                    type: 'postgres',
                    host: configService.get('DATABASE_HOST'),
                    port: +configService.get('DATABASE_PORT'),
                    username: configService.get('DATABASE_USERNAME'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    entities: ['src/**/**/*.entity.ts'],
                    synchronize: false,
                }),
                inject: [ConfigService],
            }),
            ReferentialModule.forRoot(),
        ],
        providers: [...AppAdapters, FixturesLoaderService],
    }).compile();

    const app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    return app.init();
};
