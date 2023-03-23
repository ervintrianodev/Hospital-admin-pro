import { environment } from 'src/environments/environment';

export class Usuario {
  public _id?: string;
  public nombre: string = '';
  public email: string = '';
  public password?: string = '';
  public imagen?: string = 'no-image';
  public google?: boolean = false;
  public role?: string = 'USER_ROLE';
  constructor() {}

  get getImageUrl() {
    if (this.imagen?.includes('https')) {
      return this.imagen;
    } else if (this.imagen) {
      return `${environment.baseUrl}/api/uploads/usuarios/${this.imagen}`;
    } else {
      return `${environment.baseUrl}/api/uploads/usuarios/no-image`;
    }
  }
}
