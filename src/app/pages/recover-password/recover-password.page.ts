import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  constructor() { }
  myData = {
    email: "MARCO.BETANCOURT@CLAMBER.CL",
    password: "123456",
    nuevaPassword: "12345678"
  }

  ngOnInit() {
  }

}
