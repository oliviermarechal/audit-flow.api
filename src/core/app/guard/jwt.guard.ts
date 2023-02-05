import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);
        const requiredRoles = null;
        // const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
        //     context.getHandler(),
        //     context.getClass()
        // ]);

        if (!requiredRoles) {
            return true;
        }

        // const { user } = context.switchToHttp().getRequest();

        // return Boolean(requiredRoles.includes(user.user.role));
    }
}
