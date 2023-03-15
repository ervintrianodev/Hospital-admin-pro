import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartType, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css'],
})
export class DonaComponent implements OnChanges {
  @Input() titulo: string = 'Sin titulo';
  @Input() labelsGrafica: string[] = [];
  @Input() data: number[] = [];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.labelsGrafica,
    datasets: [
      {
        data: this.data,
        backgroundColor: ['#9E120E', '#FF5800', '#FFb414'],
      },
    ],
  };

  public doughnutChartType: ChartType = 'doughnut';
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartData = {
      labels: this.labelsGrafica,
      datasets: [
        {
          data: this.data,
          backgroundColor: ['#9E120E', '#FF5800', '#FFb414'],
        },
      ],
    };
  }
}
