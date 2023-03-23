import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Error404Component } from './pages/error/error404/error404.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioComponent } from './pages/mantenimientos/usuario/usuario.component';
import { MedicosComponent } from './pages/mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './pages/mantenimientos/hospitales/hospitales.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    UsuarioComponent,
    MedicosComponent,
    HospitalesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
