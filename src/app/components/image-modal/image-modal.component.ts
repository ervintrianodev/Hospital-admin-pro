import { Component, EventEmitter } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css'],
})
export class ImageModalComponent {
  protected image!: File;
  protected imgTem!: string | ArrayBuffer | null;

  constructor(
    public imageModalService: ImageModalService,
    private fileUploadService: FileUploadService
  ) {}
  public closeModal(): void {
    this.imgTem = null;
    this.imageModalService.closeModal();
  }
  public changeImage(event: any) {
    this.image = event.target.files[0];
    if (!this.image) {
      this.imgTem = null;
      return;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(this.image);
    reader.onloadend = () => {
      this.imgTem = reader.result;
    };
  }

  public uploadImage() {
    this.fileUploadService
      .updatePhoto(this.image, 'usuarios', localStorage.getItem('uid') || '')
      .then((resp) => {
        console.log('Response de imagenes', resp);
        this.closeModal();
        this.imageModalService.imagenSubida.emit(this.image.name);
        Swal.fire({
          title: 'Imagen actualizada',
          text: 'La imagen del usuario ha sido actualizada con exito!',
          icon: 'success',
        });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Oops!',
          text: 'Hubo un error al subir la imagen',
          icon: 'error',
        });
      });
  }
}
