import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../service/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private activeRequests = 0;
  private startTime: number = 0;  // لحفظ وقت بداية الطلب
  private endTime: number = 0;    // لحفظ وقت نهاية الطلب
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip loader if the request has the 'X-Skip-Loader' header
    this.startTime = new Date().getTime(); 
    if (req.headers.get('X-Skip-Loader') === 'true') {
      return next.handle(req);
    }

    // Increment active requests and show loader
    this.activeRequests++;
    this.loaderService.show();

    return next.handle(req).pipe(
      finalize(() => {
        // Decrement active requests and hide loader when all requests are complete
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.endTime = new Date().getTime();  // سجل وقت انتهاء الطلب
          const requestDuration = this.endTime - this.startTime;  // حساب مدة الطلب
          this.loaderService.hide(requestDuration);
        }
      })
    );
  }
}