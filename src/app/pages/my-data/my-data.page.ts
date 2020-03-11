import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { MyserviceService } from 'src/app/service/myservice.service';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.page.html',
  styleUrls: ['./my-data.page.scss'],
})
export class MyDataPage implements OnInit {

  pageMyDataAsRegister = false
  nombre = ''
  usuario

  loading = false
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
    anio: '',
    male:false,
    female:false,





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
  constructor(
    private mys: MyserviceService
  ) { }

  ngOnInit() {

    this.mys.checkIfExistUsuario().subscribe(existe => {
      if (existe) {
        console.log('Usuario Registrado, Entonces Modifica');
        this.pageMyDataAsRegister = false
        this.loading = true
        this.mys.getUser().subscribe(usuario => {
          this.loading = false
          this.usuario = usuario
          if (usuario.usuario.nombre && usuario.usuario.apellidoPaterno) {
            this.nombre = usuario.usuario.nombre + ' ' + usuario.usuario.apellidoPaterno
            console.log('this.nombre',this.nombre);
          } else {
            this.nombre = 'Usuario'
            console.log('this.nombre2',this.nombre);

          }
        })

      } else {
        console.log('Usuario NO Registrado, Entonces Registra');
        this.pageMyDataAsRegister = true
        this.nombre = 'Usuario'
        console.log('this.nombre',this.nombre);
      }
    })







  }

  validar(forma) {
    console.log('forma', forma);
  }


  myKeyUp(elemento) {
    console.log('presionado elemento: ', elemento);
  }
}
