import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  protected usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = usuarioService.usuario;
  }
  public logOut() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
    google.accounts.id.revoke('ervintdeveloper@gmail.com', () => {
      this.router.navigateByUrl('/login');
    });
  }
}
