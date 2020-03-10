import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.page.html',
  styleUrls: ['./my-data.page.scss'],
})
export class MyDataPage implements OnInit {

  myData = {
    rut: "1-9",
    email: "marco.betancourt@clamber.cl",
    nombre: "marco",
    apellidoMaterno: "marambio",
    apellidoPaterno: "betancourt",
    estado: "ACT",
    fechaCreacion: "04-03-2020",
    fechaNacimiento: "01-01-1980",
    password: "123456",

    ocupacion: "",
    telefono: '',
    celular: '',
    region: '',
    ciudad: '',

    dia: '',
    mes: '',
    anio: ''




  }
  // {
  //   "rut":"1-9",
  //   "email":"marco.betancourt@clamber.cl",
  //   "nombre":"marco",
  //   "apellidoMaterno":"marambio",
  //   "apellidoPaterno":"betancourt",
  //   "estado":"ACT",
  //   "fechaCreacion":"04-03-2020",
  //   "fechaNacimiento":"01-01-1980",
  //   "password":"123456"
  // }
  constructor() { }

  ngOnInit() {
  }

  validar(forma) {
    console.log('forma', forma);
  }


  myKeyUp(elemento) {
    console.log('presionado elemento: ', elemento);
  }
}
