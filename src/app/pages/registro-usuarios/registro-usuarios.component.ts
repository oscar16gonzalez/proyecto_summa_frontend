import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {
  registerUserForm!: FormGroup;
  errorResponse: string = '';

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UsuariosService) { }

  ngOnInit() {
    this.registerUserForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['USER_ROLE', Validators.required],

    });
  }

  onSubmit() {

    if (this.registerUserForm.valid) {
      this.userService.createUser(this.registerUserForm.value).subscribe(
        res => console.log('HTTP response', res),
        // err => this.errorResponse = 'Error * | revisa los datos ingresados',
        err => this.errorResponse = err.errors[0].msg,
        () => this.router.navigate(['/template'])
      )
    }
  }

}
