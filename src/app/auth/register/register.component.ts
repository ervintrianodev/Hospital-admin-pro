import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public isFormSubmitted = false;

  public registerForm = this.formBuilder.group(
    {
      nombre: ['Ervin', [Validators.required, Validators.minLength(3)]],
      email: ['test1@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(5)]],
      password2: ['123456', [Validators.required, Validators.minLength(5)]],
      terminos: [true, [Validators.required]],
    },
    { validators: this.passwordsIguales('password', 'password2') }
  );
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  public createUser(): void {
    this.isFormSubmitted = true;
    if (this.registerForm.invalid) return;
    //realizar e guardado de los datos
    this.usuarioService.createUser(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);
        Swal.fire({
          title: 'Usuario guardado',
          text: 'El usuario ha sido guardado',
          icon: 'success',
        });
      },
      error: (errors) => {
        console.log(errors);
        Swal.fire({
          title: 'Error',
          text: errors.error.msg,
          icon: 'error',
        });
      },
    });
  }
  public passwordsNoValidas(): boolean {
    const pass = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if (pass !== pass2 && this.isFormSubmitted) {
      return true;
    } else return false;
  }
  public campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.isFormSubmitted)
      return true;
    else return false;
  }

  public passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noSonIguales: true });
      }
    };
  }
}
