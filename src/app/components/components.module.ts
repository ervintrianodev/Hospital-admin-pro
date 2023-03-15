import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaserComponent } from './increaser/increaser.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [IncreaserComponent, DonaComponent],
  imports: [CommonModule, FormsModule, NgChartsModule],
  exports: [IncreaserComponent, DonaComponent],
})
export class ComponentsModule {}
