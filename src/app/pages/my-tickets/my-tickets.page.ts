import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/service/myservice.service';
import { IntegradorService } from 'src/app/service/integrador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.page.html',
  styleUrls: ['./my-tickets.page.scss'],
})
export class MyTicketsPage implements OnInit {

  boletosAll = []
  transaccionesAll = []
  usuario
  loading = 0
  constructor(
    private mys: MyserviceService,
    private integrador: IntegradorService,
    private router: Router,

  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.mys.getUser().subscribe(usuario => {
      this.usuario = usuario
      this.loading++
      let data = { email: (usuario.usuario.email).toLowerCase() }
      this.integrador.buscarTransaccionPorEmail(data).subscribe(transacciones => {
        this.loading--
        this.transaccionesAll = transacciones

        if (transacciones.length < 1) {
          this.mys.alertShow('Sin Transacciones', 'alert', 'no hay transacciones registradas para mostrar')
          this.router.navigateByUrl('/my-cancellations')
        } else {
          this.transaccionesAll.forEach(transaccion => {
            // buscando cada boleto de cada transaccion
            this.loading++
            this.integrador.buscarBoletoPorCodigo({ email: usuario.usuario.email, codigo: transaccion.codigo }).subscribe(boletos => {
              this.loading--
              boletos.forEach(element => { element['selected'] = false });
              this.boletosAll = [...this.boletosAll, ...boletos]
              console.log('this.boletosAll',this.boletosAll);
            })
          });

        }


      })
    })
  }

  anular(){
    console.log('this.boletosAll',this.boletosAll);
  }

  ionViewWillLeave() {
    this.boletosAll=[]
  }

}
