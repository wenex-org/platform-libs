import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { NamingConvention } from 'naming-conventions-modeler';
import { convention } from 'naming-conventions-modeler';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { nestedTransformation } from '../utils';

@Injectable()
export class NamingConventionsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();

      const xnc: NamingConvention = req.headers['x-naming-convention'];

      if (xnc) {
        const transformer = convention(xnc).to;
        res.setHeader('x-naming-convention', xnc);

        req.body = nestedTransformation(req.body, transformer);

        return next.handle().pipe(map((data) => (data ? nestedTransformation(data, transformer) : data)));
      }
    }

    return next.handle();
  }
}
