import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import type { Permission } from 'abacl';
import type { Observable } from 'rxjs';

import { GrantAuthority } from '../enums';
import type { Filter, GRequest, Query } from '../interfaces';
import type { JwtToken } from '../types';
import { createProjection, logger, sanitizeQuery } from '../utils';

@Injectable()
export class AuthorityInterceptor implements NestInterceptor {
  private readonly logger = logger(AuthorityInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<GRequest>();
    const { token, permission } = request;

    if (!permission) throw new Error('Permission is required please check your code and use @PolicyGuard');

    const { projection, query, sort, limit, skip, scope, ...rest } = request.query;

    const filter: any = {
      projection: createProjection(projection),
      query: {
        ...(query as any),
        ...rest,
      },
      pagination: {
        sort,
        limit,
        skip,
      },
    };

    request.filter.query = this.createRestrictionsOnQuery(
      token,
      permission,
      filter.query,
      scope as GrantAuthority[],
    );

    return next.handle();
  }

  /* eslint complexity: ["error", 25] */
  protected createRestrictionsOnQuery(
    token: JwtToken,
    permission: Permission,
    q: Filter['query'],
    scopes = [GrantAuthority.Own, GrantAuthority.Shared, GrantAuthority.Client], // if no scope specified
  ): Filter['query'] {
    // this.logger.debug('Permission: \n', permission);
    // this.logger.debug('Raw Query: \n', q);
    if (permission.hasAny() && permission.hasAll()) return q;

    this.parseNestedProperties(q); // TODO: rewrite this method in better way

    const query = sanitizeQuery(q);
    this.logger.debug('Sanitized Query: ', query);

    if (scopes.some((scope) => GrantAuthority[scope] === scope))
      throw new BadRequestException('Scope must be included as one of owner, shared, zone or client');

    if (!permission.has(GrantAuthority.Client)) {
      this.removeNestedProperty(query, 'owner');
      this.removeNestedProperty(query, 'shares');
    }

    if (scopes.includes(GrantAuthority.Client) && permission.has(`.+:${GrantAuthority.Client}$`))
      query.clients = token.cid;

    if (scopes.includes(GrantAuthority.Own) && permission.has(`.+:${GrantAuthority.Own}$`))
      query.owner = token.uid ?? token.cid;

    if (scopes.includes(GrantAuthority.Shared) && permission.has(`.+:${GrantAuthority.Shared}$`))
      query.c = token.uid ?? token.cid;

    if (!query.owner && !query.shares && !query.clients) throw new BadRequestException('Request not allowed');

    return this.generateQuery(query, token);
  }

  protected generateQuery(query: Query, token: JwtToken): Query {
    const $or = [];

    if (query.zones) {
      const _zones = [{ zones: query.zones }, { zones: { $regex: `\\.[${token.domain}]$` } }];
      if (query.$and) query.$and.push(..._zones);
      else query.$and = _zones;
      delete query.zones;
    } else {
      query.zones = { $regex: `\\.[${token.domain}]$` };
    }

    if (query.owner) $or.push({ owner: query.owner });
    if (query.shares) $or.push({ shares: query.shares });

    if ($or.length === 2) {
      delete query.owner;
      delete query.shares;
    }

    if (query.$or) {
      const $and = [
        {
          $or: query.$or,
        },
      ];

      if ($or.length) $and.push({ $or });
      delete query.$or;

      query.$and = $and;
    } else {
      query.$or = $or;
    }

    this.logger.debug('Generated Query: \n', query);
    return query;
  }

  protected parseNestedProperties(obj: any) {
    // eslint-disable-next-line fp/no-loops
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        if (typeof obj[k] === 'object') {
          this.parseNestedProperties(obj[k]);
        } else if (typeof obj[k] === 'string' && obj[k].startsWith('$date:')) {
          obj[k] = new Date(obj[k].split('$date:').pop());
        } else if (typeof obj[k] === 'string' && obj[k].startsWith('$regex:')) {
          obj[k] = new RegExp(obj[k].split('$regex:').pop());
        }
      }
    }
  }

  protected removeNestedProperty(obj: any, key: string) {
    // eslint-disable-next-line fp/no-loops
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        if (typeof obj[k] === 'object') {
          this.removeNestedProperty(obj[k], key);
        } else if (k === key) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete obj[k];
        }
      }
    }
  }
}
