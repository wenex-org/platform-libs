import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { WsException } from '@nestjs/websockets';
import type { Observable } from 'rxjs';

import { AES } from '../helpers';
import type { GRequest } from '../interfaces';
import { IS_PUBLIC_KEY } from '../metadatas';
import type { JwtToken } from '../types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<GRequest>();

    const rawToken = request.headers.authorization?.split(/\s+/g)[1] ?? (request.query.token as string);
    if (!rawToken) return false;

    const jwtToken: Partial<JwtToken> = { ip: request.ip };

    try {
      Object.assign(jwtToken, this.jwtService.verify(AES.decrypt(rawToken)));
    } catch {
      switch (context.getType()) {
        case 'rpc':
          throw new RpcException('not authorized');

        case 'ws':
          throw new WsException('not authorized');

        default:
          throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED);
      }
    }

    request.token = jwtToken as JwtToken;
    return !!request.token;
  }
}
