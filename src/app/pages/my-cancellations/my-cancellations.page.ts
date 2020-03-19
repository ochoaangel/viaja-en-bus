import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/service/myservice.service';
import { IntegradorService } from 'src/app/service/integrador.service';
import { PopoverController } from '@ionic/angular';
import { PopMenuComponent } from 'src/app/components/pop-menu/pop-menu.component';
import { PopCartComponent } from 'src/app/components/pop-cart/pop-cart.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-my-cancellations',
  templateUrl: './my-cancellations.page.html',
  styleUrls: ['./my-cancellations.page.scss'],
})
export class MyCancellationsPage implements OnInit {

  listaBoletosAll = []
  usuario
  nBoletosSeleccionados = 0
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
    tipoDeCuenta: '',
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
    rutTitular: '',
    banco: ''
  }

  constructor(
    private mys: MyserviceService,
    private integrador: IntegradorService,
    private popoverCtrl: PopoverController,
    private router: Router,
    

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
    this.nBoletosSeleccionados = 0

    if (this.myData.codigoBoletoAconsultar) {
      this.loading = true
      this.integrador.buscarBoletoPorCodigo({ email: this.usuario.usuario.email.toLowerCase(), codigo: this.myData.codigoBoletoAconsultar }).subscribe(boletos => {
        this.loading = false

        // this.listaBoletosAll = boletos



        console.log('boletos',boletos);
        if (boletos.length === 0) {
          this.mys.alertShow('Verifique!!', 'alert', 'No hubo concidencias de su perfil con el código de transacción suministrado..')
        } else {
          this.listaBoletosAll =[]
          boletos.forEach(element => {
            if (element.estado==='ACT') {
              element['selected'] = false
              this.listaBoletosAll.push(element)
            }
          });
          console.log('listaBoletosAll', this.listaBoletosAll);
        }
      })
    } else {
      this.mys.alertShow('Verifique!!', 'alert', 'Debe ingresar un código de transacción válido')
      this.listaBoletosAll = []
      console.log('caso cuando no hay this.myData.codigoBoletoAconsultar');
    }

  }

  checkboxChanged() {
    console.log('CHANGED_this.listaBoletosAll', this.listaBoletosAll);
    let nSelected = 0
    this.listaBoletosAll.forEach(element => {
      element.selected ? nSelected++ : null
    });
    this.nBoletosSeleccionados = nSelected
    console.log('nSelected', nSelected);
  }


  anular() {
    // let data = {
    //   boleto: "INT072593",
    //   codigoTransaccion: "EOL64694093",
    //   rutSolicitante: "11111111-1",
    //   usuario: "IVAN VALENZUELA",
    //   banco: "BANCO BICE",
    //   tipoCuenta: "CUENTACORRIENTE",
    //   numeroCuenta: "3333",
    //   rutTitular: "11111111-1",
    //   integrador: 1004
    // }



    // console.log('patron',/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(this.myData.rutTitular));

    // console.log('this.listaBoletosAll', this.listaBoletosAll);
    // console.log('usuario', this.usuario);


    if (!this.myData.rutTitular) {
      this.mys.alertShow('Verifique', 'alert', 'Ingrese rut del Titular')
    } else if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(this.myData.rutTitular)) {
      this.mys.alertShow('Verifique', 'alert', 'Ingrese rut del Titular válido, sin puntos ni espacios')
    } else if (!this.myData.banco) {
      this.mys.alertShow('Verifique', 'alert', 'Seleccione un Banco')
    } else if (!this.myData.tipoDeCuenta) {
      this.mys.alertShow('Verifique', 'alert', 'Seleccione tipo de cuenta')
    } else if (!this.myData.numeroDeCuenta) {
      this.mys.alertShow('Verifique', 'alert', 'Ingrese un numero de cuenta')
    } else {

      this.listaBoletosAll.forEach(boleto => {
        // selecciona los seleccionado y activos
        if (boleto.selected) {

          let data = {
            boleto: boleto.boleto,
            codigoTransaccion: boleto.codigo,
            rutSolicitante: this.usuario.usuario.rut,
            usuario: `${this.usuario.usuario.nombre} ${this.usuario.usuario.apellidoPaterno}`,
            banco: this.myData.banco,
            tipoCuenta: this.myData.tipoDeCuenta,
            numeroCuenta: this.myData.numeroDeCuenta,
            rutTitular: this.myData.rutTitular,
            integrador: boleto.integrador
          }

          this.loading = true
          this.integrador.anularBoleto(data).subscribe((resultado: any) => {
            this.loading = false
            console.log('resultado', resultado);
            if (resultado.exito) {
              alert(`Boleto ${data.boleto} \n${resultado.mensaje}`)
            } else {
              alert(`Boleto ${data.boleto} \n${resultado.mensaje}`)
            }
          })

        }
      });


    }


  }

  ionViewWillLeave() {
    this.listaBoletosAll = []
    this.nBoletosSeleccionados = 0
  }

  
  async popMenu(event) {
    console.log('event',event);
    const popoverMenu = await this.popoverCtrl.create({
      component: PopMenuComponent,
      event,
      mode: 'ios',
      backdropDismiss: true,
      cssClass: "popMenu"
    });
    await popoverMenu.present();

    // recibo la variable desde el popover y la guardo en data
    const { data } = await popoverMenu.onWillDismiss();
    
    if (data && data.destino) {
      this.router.navigateByUrl(data.destino);
    }
    }

  async popCart(event) {
    const popoverCart = await this.popoverCtrl.create({
      component: PopCartComponent,
      event,
      mode: 'ios',
      backdropDismiss: true,
      cssClass: "popCart"
    });
    await popoverCart.present();

    // recibo la variable desde el popover y la guardo en data
    // const { data } = await popoverCart.onWillDismiss();
    // this.router.navigateByUrl(data.destino);
  }

}

// codigo: "DDX64694278"
// boleto: "INT072826"