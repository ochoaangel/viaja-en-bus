import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/service/myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.page.html',
  styleUrls: ['./user-panel.page.scss'],
})
export class UserPanelPage implements OnInit {

  nombre='Pedro Perez'
  loading=false

  constructor( private mys:MyserviceService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loading = true
    this.mys.getUser().subscribe(usuario => {
      this.loading = false
      if (usuario.usuario.nombre && usuario.usuario.apellidoPaterno) {
        this.nombre = usuario.usuario.nombre + ' ' + usuario.usuario.apellidoPaterno
      } else {
        this.nombre = 'Usuario'
      } 
      
    })
  }


  cerrarSesion(){
    this.mys.closeSessionUser().subscribe(data=>{
      console.log('ejetutada closeSessionUser ');
      this.mys.alertShow('Éxito¡¡','checkmark-circle',', Sesión cerrada exitosamente..')
      this.router.navigateByUrl('/login')
    })
  }
}
