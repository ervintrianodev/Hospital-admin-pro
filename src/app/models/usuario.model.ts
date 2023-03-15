export class Usuario {
  public uid?: string;
  public nombre: string = '';
  public email: string = '';
  public passwprd?: string = '';
  public img?: string = 'no-image';
  public google?: boolean = false;
  public role?: string = 'USER_ROLE';
  constructor() {}
}
