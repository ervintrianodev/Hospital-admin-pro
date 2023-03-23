import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageModalService {
  private _hideModal: boolean = true;
  private id: string = '';
  private collection: string = '';
  public image = 'no-image';
  public imagenSubida: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  get hideModal() {
    return this._hideModal;
  }
  get urlImage() {
    return this.image;
  }
  showModal(
    collection: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    image = 'no-image'
  ) {
    this.id = id;
    this.collection = collection;
    if (image.includes('https')) {
      this.image = image;
    } else {
      this.image = `${environment.baseUrl}/api/uploads/${collection}/${image}`;
    }
    console.log(this.image);
    this._hideModal = false;
  }
  closeModal() {
    this._hideModal = true;
  }
}
