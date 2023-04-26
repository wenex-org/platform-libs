import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientGrpc } from '@nestjs/microservices';
import { Permission } from 'abacl';
import { lastValueFrom } from 'rxjs';

import { PACKAGE_NAME } from '../consts';
import type { Action, Resource } from '../enums';
import type { GRequest } from '../interfaces';
import type { AuthorizationService } from '../interfaces/packages/auth';
import { CHECK_POLICY_KEY, CONTROLLER_RESOURCE_KEY } from '../metadatas';

@Injectable()
export class PolicyGuard implements CanActivate {
  private authorizationService: AuthorizationService;

  constructor(
    private reflector: Reflector,
    @Inject(PACKAGE_NAME.AUTHORIZATION)
    private readonly authorizationClient: ClientGrpc,
  ) {
    this.authorizationService =
      this.authorizationClient.getService<AuthorizationService>(
        'AuthorizationService',
      );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctxClass = context.getClass();
    const ctxHandler = context.getHandler();

    // eslint-disable-next-line fp/no-let
    let { resource }: { resource: Resource | string } =
      this.reflector.getAllAndOverride<{
        resource: Resource | string;
      }>(CONTROLLER_RESOURCE_KEY, [ctxHandler, ctxClass]);

    if (!resource)
      throw new Error('Resource must be set with @SetResource decorator');

    const {
      action,
      resourceAttribute,
    }: { action: Action; resourceAttribute?: string } =
      this.reflector.getAllAndOverride<{
        action: Action;
        resourceAttribute?: string;
      }>(CHECK_POLICY_KEY, [ctxHandler, ctxClass]);

    const request = context.switchToHttp().getRequest<GRequest>();
    const token = request.token;
    if (!token)
      throw new Error('Policy guard must be used with @AuthGuard decorator');

    if (resourceAttribute) {
      resource = `${resource}:${resourceAttribute}`;
    }

    const perm = await lastValueFrom(
      this.authorizationService.can({
        token,
        action,
        object: resource as Resource,
      }),
    );

    if (!perm.granted || !perm.grants.length) return false;

    request.permission = Permission.build(perm.granted, perm.grants);

    return perm.granted;
  }
}
