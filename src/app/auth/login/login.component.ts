import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm: FormGroup = this.formBuilder.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required]],
    rememberme: [false],
  });
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private ngZone: NgZone
  ) {}
  ngAfterViewInit(): void {
    this.googleInit();
  }
  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '658435915505-naj4eltjkadu8j5fk69lqho1cpq4vaeh.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      //document.getElementById('buttonDiv'),
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'snall' } // customization attributes
    );
  }
  handleCredentialResponse(response: any) {
    this.usuarioService.loginWithGoogle(response.credential).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/dashboard');
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Oops!, Ha habido un error',
          text: err.error.msg,
          icon: 'error',
        });
      },
    });
  }

  public login(): void {
    this.usuarioService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (this.loginForm.get('rememberme')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        //Navegamos al dashboard
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        Swal.fire({
          title: 'Hubo un error',
          text: err.error.msg,
          icon: 'error',
        });
      },
    });
  }
}
