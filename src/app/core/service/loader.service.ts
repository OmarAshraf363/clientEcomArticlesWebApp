import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();

  show() {
    console.log('Showing loader...');
    this.isLoading.next(true);
  }
  
  hide(requestDuration: number) {
    console.log('Hiding loader...');
    console.log(requestDuration)
    // تأخير إخفاء اللودر بناءً على مدة الطلب أو الحد الأدنى
    setTimeout(() => {
      this.isLoading.next(false);
    }, Math.max(400, requestDuration));  // تأخير إخفاء اللودر بناءً على وقت الطلب أو 800ms
  }
}
