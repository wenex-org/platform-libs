import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { NamingConvention } from 'naming-conventions-modeler';
import { Modeler } from 'naming-conventions-modeler';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NamingConventionsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();

      const xnc: NamingConvention = req.headers['x-naming-convention'];

      if (xnc) {
        res.setHeader('x-naming-convention', xnc);

        req.body = Modeler.build(req.body, xnc);

        return next
          .handle()
          .pipe(
            map((data) =>
              data ? Modeler.convert(Modeler.build(data, xnc)) : data,
            ),
          );
      }
    }

    return next.handle();
  }
}
