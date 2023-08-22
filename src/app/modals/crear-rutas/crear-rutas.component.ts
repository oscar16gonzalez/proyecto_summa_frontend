import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutasService } from 'src/app/pages/services/rutas.service';
import { Router } from '@angular/router';
import { TemplateComponent } from '../../pages/template/template.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-rutas',
  templateUrl: './crear-rutas.component.html',
  styleUrls: ['./crear-rutas.component.css']
})
export class CrearRutasComponent implements OnInit {
  registerRutaForm!: FormGroup;
  dataUser: any = {};
  errorResponse: string = "";
  fecha: string = "";
  
  constructor(private fb: FormBuilder, private rutas_service: RutasService, private router: Router, private dialogRef: MatDialogRef<TemplateComponent>) { }

  ngOnInit(): void {
    this.dataUser = localStorage.getItem('user');
    const _id = JSON.parse(this.dataUser);

    this.registerRutaForm = this.fb.group({
      fecha: ['', Validators.required],
      tipo_vehiculo: ['', Validators.required],
      hora_salida: ['', Validators.required],
      cupos_disponibles: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      usuario: [_id.uid],
    });
  }

  onSubmit() {

    if (this.registerRutaForm.valid) {
      this.rutas_service.createRutas(this.registerRutaForm.value).subscribe((data: any)=>{
        console.log(data);
        this.closeDialog();
      })
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
