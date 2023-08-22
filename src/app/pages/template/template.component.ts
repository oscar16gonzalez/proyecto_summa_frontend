import { Component, OnInit } from '@angular/core';
import { RutasService } from 'src/app/pages/services/rutas.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CrearRutasComponent } from '../../modals/crear-rutas/crear-rutas.component';
import { Router } from '@angular/router';

import * as moment from 'moment';


const alertify = require('alertifyjs');

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'hora_salida', 'origen', 'destino', 'cupos_disponibles', 'star'];
  displayedColumnsMisRutas: string[] = ['fecha', 'hora_salida', 'origen', 'destino', 'cupos_disponibles'];
  pipe = new DatePipe('en-US');
  fechaActual = this.pipe.transform(Date.now(), 'dd-MM-yyyy')
  listRutas: any = [];
  misRutas: any = [];
  rutasSuscritas: any = [];
  dataSource: any;
  dataSourceMisRutas: any;
  dataSourceRutasSuscritas: any;
  fecha = new Date();
  todayWithPipe = null;
  dataUser: any;


  constructor(private rutas_service: RutasService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    console.log(moment(this.fecha).format('LT'));
    
    this.dataUser = localStorage.getItem('user');
    this.controlListaRutas();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CrearRutasComponent,{
      height: '600px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.controlListaRutas();
    });
  }
  
  controlListaRutas(){
    this.consultarRutas();
    this.consultarMisRutas();
    this.consultarMisRutasSuscirtas();
  }

  consultarRutas() {
    this.rutas_service.getRutas().subscribe((rutas) => {

      for (let index = 0; index < rutas.rutas.length; index++) {
        const fechaRuta = rutas.rutas[index].fecha;
        if (fechaRuta === this.fechaActual) {
          this.listRutas.push(rutas.rutas[index]);
        }
      }

      //Listar rutas por hora de salida de forma ascendente 
      this.listRutas.sort(function (a: any, b: any) {
        if (a.hora_salida > JSON.parse(b.hora_salida)){
          return 1;
        }
        if (a.hora_salida < JSON.parse(b.hora_salida)) {
          return -1;
        }
        return 0;
      });

      this.dataSource = new MatTableDataSource(this.listRutas);
    })
  }

  consultarMisRutasSuscirtas(){
    this.rutas_service.getRutasSuscritas(JSON.parse(this.dataUser).uid).subscribe((rutas) => {
      this.rutasSuscritas = rutas.rutas;
      this.dataSourceRutasSuscritas = new MatTableDataSource(this.rutasSuscritas);
    })
  }

  consultarMisRutas(){
    this.rutas_service.getRutasCreadas(JSON.parse(this.dataUser).uid).subscribe((rutas) => {
      this.misRutas = rutas.rutas;
      this.dataSourceMisRutas = new MatTableDataSource(this.misRutas);
    })
  }
  
  confirmarSuscripcion(elemnt: any): void {
    alertify.confirm('Deseas Suscribirte a esta ruta', `<br/> Fecha :  ${elemnt.fecha} - Hora Salida :  ${elemnt.hora_salida} <br/><br/>  Origen : ( ${elemnt.origen} ) - Destino : ( ${elemnt.destino} )`,
      function () { alertify.success('Suscrito correctamente') }, function () { alertify.error('Cancel') });
  }

  suscripciones(elemnt: any) {
    const usuario_id = [JSON.parse(this.dataUser).uid];
    const cupos_disponibles = elemnt.cupos_disponibles - 1;

    this.rutas_service.updateRutas(elemnt._id, { usuario_id: usuario_id, cupos_disponibles: cupos_disponibles }).subscribe(rutas => {
      this.listRutas = [];
      this.controlListaRutas();
    })
  }

  cancelarRuta(elemnt: any){
    this.rutas_service.deleteRuta(elemnt._id).subscribe(rutas => {
      this.misRutas = [];
      this.controlListaRutas();
    })
  }

  buscar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cerrarSesion() {
    localStorage.removeItem("user");
    this.router.navigate(['/'])
  }
}


