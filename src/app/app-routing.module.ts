import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroUsuariosComponent } from './pages/registro-usuarios/registro-usuarios.component';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'template', component:TemplateComponent},
  { path: 'registro/usuarios', component:RegistroUsuariosComponent},
  { path: '**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
