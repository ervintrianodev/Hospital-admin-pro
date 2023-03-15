import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnDestroy {
  public titulo: string = '';
  public tituloSubs: Subscription;

  constructor(private router: Router) {
    this.tituloSubs = this.router.events
      .pipe(
        filter(
          (event): event is ActivationEnd => event instanceof ActivationEnd
        ),
        filter((event: ActivationEnd) => {
          return event.snapshot.firstChild === null;
        }),
        map((event: ActivationEnd) => {
          return event.snapshot.data;
        })
      )
      .subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = `AdminPro | ${titulo}`;
      });
  }
  ngOnDestroy(): void {
    this.tituloSubs.unsubscribe();
  }
}
