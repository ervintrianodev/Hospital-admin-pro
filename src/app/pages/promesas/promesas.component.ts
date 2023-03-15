import { Component, OnInit } from '@angular/core';
import { resolve } from 'chart.js/dist/helpers/helpers.options';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css'],
})
export class PromesasComponent implements OnInit {
  usuarios: any = [];
  constructor() {}
  ngOnInit(): void {
    /*
    const promesa = new Promise((resolve) => {
      resolve('Hola mundo');
    });
    promesa.then((response) => {
      console.log(response);
    });

    console.log('Fin del init');
    */
    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
      this.usuarios = usuarios;
    });
  }
  getUsuarios(): Promise<any> {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((response) => {
          return response.json();
        })
        .then((body) => {
          resolve(body.data);
        });
    });
  }
}
