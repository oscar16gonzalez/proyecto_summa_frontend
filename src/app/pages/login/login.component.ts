import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

const alertify = require('alertifyjs');


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorResponse: string = '';

  constructor(private fb: FormBuilder,
    private userService: UsuariosService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.postLogin(this.loginForm.value).subscribe((data) => {
        if (data.access) {
          localStorage.setItem('user', JSON.stringify(data.usuario))
          this.router.navigate(['/template'])
        } else {
          alertify.alert('Error !', data.error, function () { alertify.success('Ok'); });
        }
      },
        err => this.errorResponse = `Error * | Usuario o Contraseña incorrecta`,
      )
    }
  }
}
