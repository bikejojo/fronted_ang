import { Component ,OnInit, viewChild  } from '@angular/core';
import {  HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../servicio/producto.service';
import { Producto } from '../servicio/producto';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { OrdenComponent } from '../orden/orden.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autho',
  standalone: true,
  imports: [HttpClientModule, CommonModule,FormsModule],
  templateUrl: './autho.component.html',
  styleUrl: './autho.component.scss'
})
export class AuthoComponent {

}
