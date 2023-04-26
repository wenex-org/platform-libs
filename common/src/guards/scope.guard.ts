import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import type { Resource } from '../enums';
import { Scope } from '../enums';
import { CHECK_SCOPE_KEY, CONTROLLER_RESOURCE_KEY } from '../metadatas';
import type { JwtToken } from '../types';

@Injectable()
export class ScopeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctxClass = context.getClass();
    const ctxHandler = context.getHandler();

    const { resource }: { resource?: Resource } = this.reflector.getAllAndOverride<{
      resource: Resource;
    }>(CONTROLLER_RESOURCE_KEY, [ctxHandler, ctxClass]);

    if (!resource) throw new Error('Resource must be set with @SetResource decorator');

    const scope = this.reflector.getAllAndOverride<Scope>(CHECK_SCOPE_KEY, [ctxHandler, ctxClass]);

    if (!scope) throw new Error('Scope guard must be used with @SetScope decorator');

    const request = context.switchToHttp().getRequest();

    const token: JwtToken = request.token;

    return (
      token.scope.includes(Scope.Whole) ||
      token.scope.includes(`${resource}:${Scope.Manage}`) ||
      token.scope.includes(`${resource}:${scope}`)
    );
  }
}
