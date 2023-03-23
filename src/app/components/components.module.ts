import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaserComponent } from './increaser/increaser.component';
import { FormsModule } from '@angular/forms';
import { DonaComponent } from './dona/dona.component';
import { NgChartsModule } from 'ng2-charts';
import { ImageModalComponent } from './image-modal/image-modal.component';

@NgModule({
  declarations: [IncreaserComponent, DonaComponent, ImageModalComponent],
  imports: [CommonModule, FormsModule, NgChartsModule],
  exports: [IncreaserComponent, DonaComponent, ImageModalComponent],
})
export class ComponentsModule {}
