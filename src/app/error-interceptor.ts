import { ErrorComponent } from './error/error.component';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dailog: MatDialog) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An Unknown Error Occured!!';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dailog.open(ErrorComponent, { data: { message: errorMessage } });
        // alert(error.error.error.message);
        return throwError(error);
      })
    );
  }
}
