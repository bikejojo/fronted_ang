import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClienteAngComponent } from "./cliente-ang/cliente-ang.component";
import { ProductoComponent } from './producto/producto.component';
import { OrdenComponent } from './orden/orden.component';
import { ProductoDComponent } from './producto-d/producto-d.component';
import { AuthoComponent } from './autho/autho.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductoDComponent
    ,ClienteAngComponent,ProductoComponent,OrdenComponent,
  AuthoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'appFron';
}
