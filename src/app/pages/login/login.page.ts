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
    // localStorage.setItem("usuario", JSON.stringify({primero:'hola',segundo:'como estas?'}));
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
            result ? this.router.navigateByUrl('/my-data') : console.log('Error al guardar el usiario');
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
}


