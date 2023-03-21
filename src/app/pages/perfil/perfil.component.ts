import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public profileForm: FormGroup = new FormGroup({});
  public usuario: Usuario = new Usuario();
  protected image!: File;
  protected imgTem!: string | ArrayBuffer | null;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
    console.log(this.image);
  }
  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
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
        console.log(resp);
        this.usuario.img = resp.nombreArchivo;
        Swal.fire({
          title: 'Imagen actualizada',
          text: 'La imagen del usuario ha sido actualizada con exito!',
          icon: 'success',
        });
      });
  }
  public actualizarPerfil(): void {
    this.usuarioService.updateUser(this.profileForm.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.usuario.nombre = resp.usuario.nombre;
        this.usuario.email = resp.usuario.email;
        this.usuario.img = resp.usuario.img;
        Swal.fire({
          title: 'Usuario actualizado',
          text: resp.msg,
          icon: 'success',
        });
      },
      error: (err) => {
        Swal.fire({ title: 'Oops!', text: err.error.msg, icon: 'error' });
      },
    });
  }
}
