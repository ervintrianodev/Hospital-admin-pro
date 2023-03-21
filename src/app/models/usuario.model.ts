import { environment } from 'src/environments/environment';

export class Usuario {
  public uid?: string;
  public nombre: string = '';
  public email: string = '';
  public password?: string = '';
  public img?: string = 'no-image';
  public google?: boolean = false;
  public role?: string = 'USER_ROLE';
  constructor() {}

  get getImageUrl() {
    if (this.img?.includes('https')) {
      return this.img;
    }
    if (this.img) {
      return `${environment.baseUrl}/api/uploads/usuarios/${this.img}`;
    } else {
      return `${environment.baseUrl}/api/uploads/usuarios/no-image`;
    }
  }
}
