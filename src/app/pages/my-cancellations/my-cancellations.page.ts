import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/service/myservice.service';
import { IntegradorService } from 'src/app/service/integrador.service';


@Component({
  selector: 'app-my-cancellations',
  templateUrl: './my-cancellations.page.html',
  styleUrls: ['./my-cancellations.page.scss'],
})
export class MyCancellationsPage implements OnInit {

  listaBoletosAll = []
  usuario
  loading = false
  tipoDeCuentaOptions = { header: 'Tipo de Cuenta' }
  bancoOptions = { header: 'Banco' }
  myData = {
    tiposDeCuentas: [
      {
        codigo: "CuentaCorriente",
        nombre: "Cuenta Corriente"
      },
      {
        codigo: "CuentaVista",
        nombre: "Cuenta Vista"
      }
    ],
    tipoDeCuenta: [],
    codigoBoletoAconsultar: '',
    numeroDeCuenta: '',
    bancos: [
      {
        codigo: "Banco BICE",
        nombre: "Banco BICE"
      },
      {
        codigo: "BBVA",
        nombre: "BBVA"
      },
      {
        codigo: "Banco Btg Pactual Chile",
        nombre: "Banco Btg Pactual Chile"
      },
      {
        codigo: "Banco Consorcio",
        nombre: "Banco Consorcio"
      },
      {
        codigo: "Banco de Chile",
        nombre: "Banco de Chile"
      },
      {
        codigo: "BCI",
        nombre: "BCI"
      },
      {
        codigo: "Banco Estado",
        nombre: "Banco Estado"
      },
      {
        codigo: "Banco do Brasil S.A.",
        nombre: "Banco do Brasil S.A."
      },
      {
        codigo: "Banco Falabella",
        nombre: "Banco Falabella"
      },
      {
        codigo: "Banco Internacional",
        nombre: "Banco Internacional"
      },
      {
        codigo: "Banco Itaú Chile",
        nombre: "Banco Itaú Chile"
      },
      {
        codigo: "Banco Penta",
        nombre: "Banco Penta"
      },
      {
        codigo: "Banco Ripley",
        nombre: "Banco Ripley"
      },
      {
        codigo: "Banco Santander",
        nombre: "Banco Santander"
      },
      {
        codigo: "Banco Security",
        nombre: "Banco Security"
      },
      {
        codigo: "Corpbanca",
        nombre: "Corpbanca"
      },
      {
        codigo: "Deutsche Bank Chile",
        nombre: "Deutsche Bank Chile"
      },
      {
        codigo: "HSBC Bank Chile",
        nombre: "HSBC Bank Chile"
      },
      {
        codigo: "JP Morgan Chase Bank",
        nombre: "JP Morgan Chase Bank"
      },
      {
        codigo: "Rabobank Chile",
        nombre: "Rabobank Chile"
      },
      {
        codigo: "Scotiabank",
        nombre: "Scotiabank"
      }
    ],
    rut: '',
    banco: ''
  }

  constructor(
    private mys: MyserviceService,
    private integrador: IntegradorService
  ) { }

  ngOnInit() {
    // this.loading = true
    // this.integrador.buscarBancos().subscribe(bancos => {
    //   this.myData.bancos = bancos
    //   this.integrador.buscarTipoDeCuentas({ codigo: "VD" }).subscribe(tiposDeCuentas => {
    //     this.myData.tiposDeCuentas = tiposDeCuentas
    //     this.loading = false
    //     console.log('this.myData', this.myData);
    //   })
    // })
  }

  ionViewWillEnter() {

    this.mys.getUser().subscribe(usuario => {
      this.usuario = usuario
      console.log('usuario:', usuario);
    })



  }


  consultar() {
    console.log('presionado btn consultar', this.myData.codigoBoletoAconsultar);

    if (this.myData.codigoBoletoAconsultar) {
      this.loading = true
      this.integrador.buscarBoletoPorCodigo({ email:  this.usuario.usuario.email.toLowerCase(), codigo: this.myData.codigoBoletoAconsultar }).subscribe(boletos => {
        this.loading = false
        this.listaBoletosAll = boletos
        console.log('listaBoletosAll', this.listaBoletosAll);
        if (boletos.length === 0) {
          this.mys.alertShow('Verifique!!', 'alert', 'No hubo concidencias de su perfil con el código de transacción suministrado..')
        } else {
          this.listaBoletosAll.forEach(element => {
            element['selected'] = false
          });
          console.log('listaBoletosAll', this.listaBoletosAll);
        }
      })
    } else {
      console.log('caso cuando no hay this.myData.codigoBoletoAconsultar');
    }

  }


  anular() {
    console.log('this.listaBoletosAll', this.listaBoletosAll);

  }



}
