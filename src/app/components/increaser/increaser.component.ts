import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrls: ['./increaser.component.css'],
})
export class IncreaserComponent {
  @Input() progress: number = 40;
  @Input() btnClass: string = 'btn btn-primary';

  @Output() outputValue: EventEmitter<number> = new EventEmitter<number>();

  changeProgressValue(value: number): number {
    if (this.progress >= 100 && value >= 0) {
      this.outputValue.emit(100);
      return (this.progress = 100);
    }
    if (this.progress <= 0 && value < 0) {
      this.outputValue.emit(0);
      return (this.progress = 0);
    }

    this.outputValue.emit((this.progress += value));
    return (this.progress += value);
  }

  onChange(value: number): void {
    if (value >= 100) value = 100;
    if (value <= 0) value = 0;
    if (isNaN(value)) value = 0;
    this.outputValue.emit(+value);
    console.log(value);
  }
}
