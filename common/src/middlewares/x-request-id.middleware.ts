import type { NextFunction, Request, Response } from 'express';
import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class XRequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const xRequestId = req.headers['x-request-id'] ?? crypto.randomUUID();

    req.headers['x-request-id'] = xRequestId;
    res.setHeader('x-request-id', xRequestId);

    next();
  }
}
