import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//componentes
import { ClienteAngComponent } from '../cliente-ang/cliente-ang.component';
import { ProductoComponent } from '../producto/producto.component';
import { AuthoComponent } from '../autho/autho.component';

const routes: Routes = [
  {path:'cliente', component: ClienteAngComponent},
  {path:'producto',component:ProductoComponent},
  {path:'autho',component:AuthoComponent}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule , RouterModule.forRoot(routes)],
    exports:[RouterModule ]
})
export class AppRoutingModule { }
