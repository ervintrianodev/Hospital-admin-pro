import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css'],
})
export class Grafica1Component {
  public labelsGrafica1: string[] = ['Gohan', 'Goku', 'Kakaroto'];
  public labelsGrafica2: string[] = ['Mexico', 'Colombia', 'Canada'];
  public labelsGrafica3: string[] = ['PC Gamer', 'Laptop', 'PC Dino'];
  public labelsGrafica4: string[] = ['Cupcake', 'Pastel 3 leches', 'Pizza'];

  public data1: number[] = [10, 20, 70];
  public data2: number[] = [12, 150, 70];
  public data3: number[] = [34, 20, 676];
  public data4: number[] = [456, 65, 770];
}
