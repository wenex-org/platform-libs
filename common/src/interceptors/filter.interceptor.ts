import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { isObject } from 'class-validator';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';

import type { GRequest } from '../interfaces';

@Injectable()
export class FilterInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') return next.handle();

    const { permission } = context.switchToHttp().getRequest<GRequest>();

    if (!permission) throw new Error('Permission is required please check your code and use @PolicyGuard');

    return next.handle().pipe(tap((res) => (isObject(res) ? permission.filter(res) : res)));
  }
}
