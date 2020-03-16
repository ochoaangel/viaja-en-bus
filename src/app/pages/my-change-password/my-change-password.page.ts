import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/service/myservice.service';
import { IntegradorService } from 'src/app/service/integrador.service';


@Component({
  selector: 'app-my-change-password',
  templateUrl: './my-change-password.page.html',
  styleUrls: ['./my-change-password.page.scss'],
})
export class MyChangePasswordPage implements OnInit {

  loading = false
  myData = {
    email: "",
    password: "",
    nuevaPassword: "",
    nuevaPasswordReperida: ''
  }
  nombre = ''
  respuestaApi = ''

  constructor(
    public mys: MyserviceService,
    private integradorService: IntegradorService,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loading = true
    this.mys.getUser().subscribe(usuario => {
      this.loading = false
      if (usuario.usuario.nombre && usuario.usuario.apellidoPaterno) {
        this.nombre = usuario.usuario.nombre + ' ' + usuario.usuario.apellidoPaterno
      } else {
        this.nombre = 'Usuario'
      }
      this.myData.email = usuario.usuario.email
    })
  }


  validar(forma) {
    if (forma.invalid) { this.mys.alertShow('Verifique!! ', 'alert', 'Complete todos los campos y deben ser mínimo 8 caracteres') }
    else if (this.myData.nuevaPassword !== this.myData.nuevaPasswordReperida) { this.mys.alertShow('Verifique!! ', 'alert', 'Las nuevas password deben coincidir..') }
    else {

      console.log('Listoo, pasó las validaciones..');
      let dataFiltrada = this.myData
      delete dataFiltrada.nuevaPasswordReperida
      console.log('dataFiltrada', dataFiltrada);
      this.loading = true
      this.integradorService.usuarioCambiarPassword(dataFiltrada).subscribe((resultado: any) => {
        this.loading = false
        console.log('resultado', resultado)
        if (resultado.exito) {
          this.myData.nuevaPassword = ''
          this.myData.nuevaPasswordReperida = ''
          this.myData.password = ''
          this.mys.alertShow('Éxito!! ', 'checkmark-circle', resultado.mensaje)
        } else {
          this.myData.nuevaPassword = ''
          this.myData.nuevaPasswordReperida = ''
          this.myData.password = ''
          this.mys.alertShow('Verifique!! ', 'alert', resultado.mensaje || 'Verifique los datos ingresados e<br>Intente nuevamente..')

        }
      })




      //   respuesta:
      //   {
      //     "exito": true,
      //     "mensaje": "Password modificada exitosamente!",
      //     "id": null
      // }

    }
  }



}
