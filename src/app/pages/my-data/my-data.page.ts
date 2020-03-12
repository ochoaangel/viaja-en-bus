import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { MyserviceService } from 'src/app/service/myservice.service';
import * as _ from 'underscore';
import * as moment from 'moment';
import { IntegradorService } from 'src/app/service/integrador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.page.html',
  styleUrls: ['./my-data.page.scss'],
})
export class MyDataPage implements OnInit {

  pageMyDataAsRegister = false
  nombreUsuario = 'Usuario'
  usuario
  loading = false
  myData = {
    rut: "",
    email: "",
    nombre: "",
    apellidoMaterno: "",
    apellidoPaterno: "",
    estado: "ACT",
    fechaCreacion: "",
    fechaNacimiento: "",
    fechaActivacion: "",
    password: "",

    ocupacion: "",
    telefono: '',
    celular: '',
    region: '',
    ciudad: '',

    dia: '',
    mes: '',
    anio: '',
    genero: ''
  }

  diaOptions = { header: 'Elige el día' };
  mesOptions = { header: 'Elige el mes' };
  anioOptions = { header: 'Elige el año' };

  constructor(
    private mys: MyserviceService,
    private integrador: IntegradorService,
    private router: Router,

  ) { }

  ngOnInit() {

    this.mys.checkIfExistUsuario().subscribe(existe => {
      if (existe) {
        console.log('Usuario Registrado, Entonces Modifica');
        this.pageMyDataAsRegister = false
        this.loading = true
        this.mys.getUser().subscribe(usuario => {
          console.log('usuario', usuario);
          this.loading = false
          this.usuario = usuario

          this.myData.nombre = this.titleCase(usuario.usuario.nombre)
          this.myData.apellidoPaterno = this.titleCase(usuario.usuario.apellidoPaterno)
          this.myData.apellidoMaterno = this.titleCase(usuario.usuario.apellidoMaterno)
          this.myData.email = usuario.usuario.email
          this.myData.estado = usuario.usuario.estado
          this.myData.rut = usuario.usuario.rut

          this.myData.dia = moment(usuario.usuario.fechaNacimiento).format('D')
          this.myData.mes = moment(usuario.usuario.fechaNacimiento).format('M')
          this.myData.anio = moment(usuario.usuario.fechaNacimiento).format('YYYY')

          this.myData.fechaNacimiento = moment(usuario.usuario.fechaNacimiento).format('L')
          this.myData.fechaCreacion = moment(usuario.usuario.fechaCreacion).format('DD-MM-YYYY')
          this.myData.fechaActivacion = moment(usuario.usuario.fechaActivacion).format('DD-MM-YYYY')

          if (usuario.usuario.nombre && usuario.usuario.apellidoPaterno) {
            this.nombreUsuario = usuario.usuario.nombre + ' ' + usuario.usuario.apellidoPaterno
            console.log('this.nombre', this.nombreUsuario);
          } else {
            this.nombreUsuario = 'Usuario'
            console.log('this.nombre2', this.nombreUsuario);
          }
        })

      } else {
        console.log('Usuario NO Registrado, Entonces Registra');
        this.pageMyDataAsRegister = true
        console.log('this.nombreUsuario', this.nombreUsuario);
      }
    })

  }



  myKeyUp(elemento) {
    console.log('presionado elemento: ', elemento);
  }

  genero($event) {


  }

  validar(forma) {
    this.myData.fechaNacimiento = `${this.myData.dia}-${this.myData.mes}-${this.myData.anio}`
    console.log('this.myData.fechaNacimiento', this.myData.fechaNacimiento);

    if (forma.controls.rut.errors) {
      this.mys.alertShow('Verifique!! ', 'alert', 'Introduzca un RUT válido')      // } else if (rut valido) {console.log('rut valido');
    } else if (forma.controls.nombre.errors) {
      this.mys.alertShow('Verifique!! ', 'alert', 'Introduzca un nombre válido')
    } else if (forma.controls.apellidoPaterno.errors) {
      this.mys.alertShow('Verifique!! ', 'alert', 'Introduzca un apellido Paterno válido')
    } else if (forma.controls.apellidoMaterno.errors) {
      this.mys.alertShow('Verifique!! ', 'alert', 'Introduzca un apellido materno válido')
    } else if (!moment(this.myData.fechaNacimiento, ["DD-MM-YYYY", "D-MM-YYYY", "D-M-YYYY", "DD-M-YYYY"], true).isValid()) {
      this.mys.alertShow('Verifique!! ', 'alert', 'Verifique que la fecha de nacimiento sea válida')
    } else if (forma.controls.email.errors) {
      this.mys.alertShow('Verifique!! ', 'alert', 'Introduzca un email válido')
    } else if (forma.controls.ocupacion.errors) {
      this.mys.alertShow('Verifique!! ', 'alert', 'Introduzca ocupacion válida')
    } else if (forma.controls.telefono.errors) {
      this.mys.alertShow('Verifique!! ', 'alert', 'Introduzca un teléfono válido')
    } else if (forma.controls.celular.errors) {
      this.mys.alertShow('Verifique!! ', 'alert', 'Introduzca un celular válido')
    } else if (forma.controls.region.errors) {
      this.mys.alertShow('Verifique!! ', 'alert', 'Introduzca una región válida')
    } else if (forma.controls.ciudad.errors) {
      this.mys.alertShow('Verifique!! ', 'alert', 'Introduzca una ciudad válida')
    } else {
      console.log('fiiiiiiiiinnnnnnnnnnnnnnnn');

      let objetoAenviar = {
        nombre: this.myData.nombre,
        apellidoPaterno: this.myData.apellidoPaterno,
        apellidoMaterno: this.myData.apellidoMaterno,
        email: this.myData.email,
        estado: this.myData.estado,
        fechaCreacion: this.myData.fechaCreacion,
        fechaNacimiento: this.myData.fechaNacimiento,
        password: this.myData.password,
        rut: this.myData.rut,
      }
      this.loading = true
      this.integrador.usuarioGuardar(objetoAenviar).subscribe((respuesta: any) => {
        this.loading = false

        if (respuesta.exito) {
          this.mys.alertShow('Éxito!! ', 'checkmark-circle', respuesta.mensaje)
          this.router.navigateByUrl('/user-panel')
        } else {
          this.mys.alertShow('Error ', 'alert', respuesta.mensaje || 'Hubo un error al guardar los datos del usuario..')
        }


        console.log('respuesta', respuesta);
      })



    }

  }// fin validar



  /**
   *  para cambiar nombres y apellidos a titulo capital
   * @param str 
   */
  titleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }


} // fin clase ppal


          ////////////////////////////////////////// Recibido de api
          // nombre: "angelox"
          // apellidoPaterno: "ochoa"
          // apellidoMaterno: "alarcon"
          // email: "ochoaangelox@gmail.com"
          // estado: "ACT"
          // fechaNacimiento: 435726000000
          // fechaCreacion: 1586487600000
          // fechaActivacion: 1586487600000
          // password: "d1079ca8833395c01233c96f4ec4065221801037"
          // rut: "11111111-1"
          ////////////////////////////////////////// Enviado a la api
          // {
          //   "nombre":"angelox",
          //   "apellidoPaterno":"ochoa",
          //   "apellidoMaterno":"alarcon",
          //   "email":"ochoaangelox@gmail.com",
          //   "estado":"ACT",
          //   "fechaCreacion":"10-04-2020",
          //   "fechaNacimiento":"23-10-1983",
          //   "password":"123456"
          //   "rut":"11111111-1",
          // }
