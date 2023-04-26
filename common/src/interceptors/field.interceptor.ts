import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { isObject } from 'class-validator';
import type { Observable } from 'rxjs';

import type { GRequest } from '../interfaces';

@Injectable()
export class FieldInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') return next.handle();

    const request = context.switchToHttp().getRequest<GRequest>();
    const permission = request.permission;

    if (!permission) throw new Error('Permission is required please check your code and use @PolicyGuard');

    // TODO: it could be problem
    // TODO:  also we should check scope
    request.body = request.body && isObject(request.body) ? permission.field(request.body) : request.body;

    return next.handle();
  }
}
