import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Request, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor<Request, Response> {
  private logger: Logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {    
    const request: Request = context.switchToHttp().getRequest();
    const requestBody = JSON.stringify(this.removeSensitiveFields(request.body));

    this.logger.log(`Recieved Request: [${request.method}] on ${request.url} with body: ${requestBody}`)

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap((response) => {
          const responseBody = JSON.stringify(response);
          this.logger.log(`Sending Reponse: [${request.method}] ${request.url} with payload: ${responseBody} took ${Date.now() - now}ms`)
        }),
      );
  }

  private removeSensitiveFields(body: any) {
    const { password, ...rest } = body;
    return rest;
  }
}