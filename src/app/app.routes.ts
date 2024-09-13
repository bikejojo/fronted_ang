import { Routes } from '@angular/router';
//componentes
import { ClienteAngComponent } from './cliente-ang/cliente-ang.component';
import { ProductoComponent } from './producto/producto.component';
import { OrdenComponent } from './orden/orden.component';
import { ProductoDComponent } from './producto-d/producto-d.component';
import { AuthoComponent } from './autho/autho.component';

export const routes: Routes = [
    {path:'cliente', component: ClienteAngComponent},
    {path:'producto', component: ProductoComponent},
    {path:'orden/:id', component: OrdenComponent},
    {path:'producto-d/:id', component:ProductoDComponent},
    {path:'autho', component:AuthoComponent}
];


