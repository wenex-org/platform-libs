import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';

import type { RawFilter } from '../interfaces';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'rpc') {
      const data = context.switchToRpc().getData();

      const transformFilter = (filter: RawFilter) => {
        if ('query' in filter) filter.query = JSON.parse(filter.query);
        if ('projection' in filter) filter.projection = JSON.parse(filter.projection);
        if ('pagination' in filter) filter.pagination = JSON.parse(filter.pagination);
      };

      if ('filter' in data) transformFilter(data.filter);
      else transformFilter(data);

      return next.handle();
    } else return next.handle();
  }
}
