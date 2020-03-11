import { Component, OnInit } from '@angular/core';
import { IntegradorService } from 'src/app/service/integrador.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { MyserviceService } from 'src/app/service/myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // mydata = { username: "mauricio.fuentes@pullmancosta.cl", password: "CostaGps+2019" }
  mydata = { usuario: "", password: "" }
  showUsuarioError = false;
  showNoLoginError = "";
  loading = false;

  // login =
  //   {
  //     email: 'correo@correo.com',
  //     password: '1234567890'
  //   }
  // data = 
  // {
  //   genere:'M',
  //   city:'city',
  //   region:'region',
  //   rut:'xxxxxxxxx',
  //   firstName:'Carlos',
  //   lastNameP:'Pérez',
  //   lastNameM:'Pérez',
  //   birth:'1990/12/31',
  //   occupation:'Student',
  //   phone: '+261112223344',
  //   mobile:'+881112223344',
  //   email:'correo@correo.com',
  // }

  constructor(
    private integradorService: IntegradorService,
    private router: Router,
    private nativeStorage: NativeStorage,
    public platform: Platform,
    public mys: MyserviceService,


  ) { }

  ngOnInit() {
//     localStorage.setItem("usuario", JSON.stringify({
//     exito: true,
//     mensaje: "Exito",
//     token: "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJPQ0hPQUFOR0VMQEdNQUlMLkNPTSIsImlhdCI6MTU4Mzg3ODkxNywiZXhwIjoxNTgzODc5ODE3fQ.UoVM7smoFAxnzmgHZU0nhVBrla1WlHg8P3G31SMJjYe_zdyYPsiYbFZ8N02ECVNTpemNHeirCOf4CUbpqQxwx_o0rLgeNJ1dPDZZwCIyTLoGMtMzWbQK7IJ1L-bTqifLb2beNyWKdG72WAtCcBWlo00eXn-PU3J2ANCIK1FySr-Ww5eODj3lol_FvKDDegrXHJPN3r0pscj6nfipxJljk00gfzIe0sBUXCrSzxx3YHlEAcYvPfBnpi5E2xb-DDrRfFusw9MEDAu-K60lGCsZWFVV1dUNiymgfR6KjV8EBlPzciQ2DwMnzK4NMghlFwiQZ7EObLKavMxQ17Ln6E3_6A",
//     usuario: {
//         nombre: "angel",
//         apellidoPaterno: "ochoa",
//         apellidoMaterno: "alarcon",
//         email: "ochoaangel@gmail.com",
//         estado: "ACT",
//         fechaNacimiento: 435726000000,
//         fechaCreacion: 1586487600000,
//         fechaActivacion: 1586487600000,
//         password: "0934e6db7ebb6786eb83f617ae3e7b8fb2579e6f",
//         rut: "11111111-1"
//     },
//     cambiaClave: false,
//     urlInicial: null
// }));
// console.log('fffffffffffffffffffffffffffffffffff');

    this.mys.checkIfExistUsuario().subscribe(exist => {
      exist ? this.router.navigateByUrl('/user-panel') : console.log('No existe usuario logeado..'); 
    })


  }

  enviar() {

  }

  validar(forma) {
    console.log(forma)
    forma.controls.usuario.invalid ? this.showUsuarioError = true : null;

    if (forma.valid) {
      this.loading = true
      console.log('this.mydata', this.mydata);
      this.integradorService.autenticarLogin(this.mydata).subscribe((data: any) => {
        this.loading = false


        if (data.exito) {
          this.mys.saveUsuario(data).subscribe(result => {
            result ? this.router.navigateByUrl('/user-panel') : console.log('Error al guardar el usiario');
          })
        } else {
          this.showNoLoginError = data.mensaje
        }


      })
    }

  }

  myKeyUp(campo) {
    this.showUsuarioError = false
    this.showNoLoginError = ""
  }



  irAregistro(){
    this.mys.pageMyDataAsRegister=true;
    this.router.navigateByUrl('/my-data')
    console.log('Redirigiendo de login a Registro...'); 
  }
  
  irAolvidoCntrasena(){
    this.router.navigateByUrl('/recover-password')
    console.log('Redirigiendo de login a Olvidó contraseña...');

  }



}


