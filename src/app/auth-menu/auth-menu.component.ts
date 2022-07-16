import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "../service/login.service";
import {MainMenuComponent} from "../main-menu/main-menu.component";
import {TokenStorageService} from "../service/token-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  EmployeeRegistrationComponent
} from "../dialogs/registration/employee-registration/employee-registration.component";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeInformation} from "../model/model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit {

  form: FormGroup = new FormGroup({
    login: new FormControl(),
    password: new FormControl(),
  });
  role: string = '';
  info: any;
  loginInfo: EmployeeInformation;

  constructor(private loginService: LoginService,
              private menuComponent: MainMenuComponent,
              private token: TokenStorageService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.role = this.token.getAuthorities();
    }
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
    }
    this.loginInfo = {} as EmployeeInformation;
  }

  loginRequest() {
    this.loginInfo.username = this.form.controls["login"].value;
    this.loginInfo.password = this.form.controls["password"].value;
    this.loginService.auth(this.loginInfo).subscribe(r => {
      if (r.token && r.username && r.employeeType) {
        this.token.saveToken(r.token);
        this.token.saveUsername(r.username);
        this.token.saveAuthorities(r.employeeType);

        this.role = this.token.getAuthorities();
        this.logIn();
      }
    }, error => {
      this.snackBar.open('Вход запрещен: неверные данные', 'Печально...', {
        duration: 5000,
      });
    });
  }

  registrationRequest() {
    this.dialog.open(EmployeeRegistrationComponent)
      .afterClosed().subscribe(result => {
       if (result != null) {
         this.loginService.register(result.data).subscribe(r => {
           this.snackBar.open('Сотрудник "' + result.data.username + '" зарегистрирован'  , 'ОК', {
             duration: 5000,
           });
         }, error => {
           this.snackBar.open('Регистрация отклонена'  , 'Печально...', {
             duration: 5000,
           });
         });
       }
    });
  }

  logIn() {
    this.loginService.isLoggedIn = true;
    this.router.navigate(['/products']);
  }

}
