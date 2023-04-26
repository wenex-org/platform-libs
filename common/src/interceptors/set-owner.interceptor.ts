import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';

import type { GRequest } from '../interfaces';
import type { JwtToken } from '../types';

@Injectable()
export class SetOwnerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') return next.handle();

    const request = context.switchToHttp().getRequest<GRequest>();
    const token: JwtToken = request.token;

    const owner = token.uid ?? token.cid;
    const clients = new Set<string>([...(request.body?.clients ?? []), token.cid]);

    if ('files' in request) {
      request.files.forEach((file) => {
        file.owner = owner;
        file.created_by = token.uid ?? token.cid;
        file.created_in = token.aid ?? token.cid;
        file.clients = [...clients];
      });
    } else {
      request.body.owner = owner;
      request.body.clients = clients;
    }

    request.body.created_by = token.uid ?? token.cid;
    request.body.created_in = token.aid ?? token.cid;

    return next.handle();
  }
}
