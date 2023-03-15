import { Component, OnDestroy } from '@angular/core';
import {
  filter,
  interval,
  map,
  Observable,
  retry,
  Subscription,
  take,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnDestroy {
  private unsubscribeInterval: Subscription;

  constructor() {
    const observable = new Observable<number>((observer) => {
      let i = 0;
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        /* if (i == 2) {
          observer.error('i llego al valor 2');
        } */
      }, 1000);
    });

    /* observable.pipe(retry()).subscribe({
      next: (valor) => {
        console.log('Valor Observer: ', valor);
      },
      error: (error) => {
        console.error('Error: ', error);
      },
      complete: () => {
        console.log('La tarea del observador se ha completado');
      },
    }); */

    this.unsubscribeInterval = this.returnInterval().subscribe((valor) => {
      console.log(valor);
    });
  }
  ngOnDestroy(): void {
    this.unsubscribeInterval.unsubscribe();
  }
  returnInterval(): Observable<number> {
    return interval(500).pipe(
      map((valor) => {
        return valor + 1;
      }),
      filter((valor) => {
        return valor % 2 == 0;
      })
      //take(4)
    );
  }
}
