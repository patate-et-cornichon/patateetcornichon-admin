import { EventEmitter, Injectable } from '@angular/core';


@Injectable()
export class LayoutWrapperService {

  event: EventEmitter<boolean> = new EventEmitter();

  setLoadingState(isLoading: boolean) {
    this.event.emit(isLoading);
  }
}
