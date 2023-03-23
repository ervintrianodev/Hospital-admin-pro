import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  protected usuarios: Usuario[] = [];
  protected totalUsuarios: number = 0;
  protected from: number = 0;
  protected valueFrom = 5;
  protected cangando: boolean = false;
  protected usuariosTmp: Usuario[] = [];

  constructor(
    private usuarioservice: UsuarioService,
    private busquedaService: BusquedaService,
    private imageModalService: ImageModalService
  ) {}
  ngOnInit(): void {
    this.loadUsers();
    this.imageModalService.imagenSubida.subscribe((image) => {
      this.loadUsers();
    });
  }

  public busquedas(query: string) {
    if (query.length === 0) {
      this.usuarios = this.usuariosTmp;
    }
    this.busquedaService.buscar('usuarios', query).subscribe({
      next: (resp: any) => {
        this.usuarios = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private loadUsers() {
    this.cangando = true;
    this.usuarioservice.cargarUsuariosPaginados(this.from).subscribe({
      next: (resp: any) => {
        this.usuarios = resp.usuarios.usuarios;
        this.usuariosTmp = this.usuarios;
        this.totalUsuarios = resp.total;
        this.cangando = false;
      },
      error: (err) => {
        ///TODO: Crear mensaje de error
        console.log(err);
        this.cangando = false;
      },
    });
  }
  public nexPage() {
    this.from += this.valueFrom;
    if (this.from > this.totalUsuarios) {
      this.from =
        this.valueFrom * Math.floor(this.totalUsuarios / this.valueFrom);
    } else {
      console.log('from ', this.from);
      this.loadUsers();
    }
  }
  public previosPage() {
    this.from -= this.valueFrom;
    if (this.from < 0) {
      this.from = 0;
    } else {
      console.log(this.from);
      this.loadUsers();
    }
  }
  public eliminarUsuario(usuario: Usuario): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta accion no se podra revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('id: ', usuario._id);
        if (usuario._id) {
          this.usuarioservice.eliminarUsuario(usuario._id).subscribe({
            next: (resp: any) => {
              this.usuarios = this.usuarios.filter((user) => {
                return user._id !== usuario._id;
              });
              Swal.fire({
                title: 'Usuario',
                text: resp.msg,
                icon: 'success',
              });
            },
            error: (err) => {
              Swal.fire({
                title: 'Oops!',
                text: err.error.msg,
                icon: 'error',
              });
            },
          });
        } else {
          return;
        }
      }
    });
  }
  public updateRole(usuario: Usuario): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Realmente deseas cambiar el ROL de este usuarios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Cambialo!',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.usuarioservice.updateUsuario(usuario).subscribe({
          next: (resp: any) => {
            Swal.fire({
              title: 'Usuario actualizado',
              text: `El ROL del usuario ${resp.usuario.nombre} ha sido actualizado`,
              icon: 'info',
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Oops!',
              text: err.error.msg,
              icon: 'error',
            });
          },
        });
      }
    });
  }

  public openModal(usuario: Usuario): void {
    if (usuario._id)
      this.imageModalService.showModal('usuarios', usuario._id, usuario.imagen);
  }
}
