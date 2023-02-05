import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from '../../../domain';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: DomainException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        response.status(exception.statusCode).json({
            statusCode: exception.statusCode,
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
