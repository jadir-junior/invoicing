import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private clickSource = new Subject<Message | Message[]>();

  click$ = this.clickSource.asObservable();

  add(message: Message): void {
    if (message) {
      this.clickSource.next(message);
    }
  }
}
