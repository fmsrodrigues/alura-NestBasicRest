import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { NestResponse } from './nestResponse';

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  constructor(private adpterHost: HttpAdapterHost) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((nestResponse: NestResponse) => {
        if (!(nestResponse instanceof NestResponse)) {
          return nestResponse;
        }

        const ctx = context.switchToHttp();
        const res = ctx.getResponse();
        const { headers, status, body } = nestResponse;

        const headerNames = Object.getOwnPropertyNames(headers);
        headerNames.forEach((headerName) => {
          const headerValue = headers[headerName];
          this.adpterHost.httpAdapter.setHeader(res, headerName, headerValue);
        });

        this.adpterHost.httpAdapter.status(res, status);

        return body;
      }),
    );
  }
}
