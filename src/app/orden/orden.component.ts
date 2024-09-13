import { Component , OnInit  } from '@angular/core';
import {  HttpClientModule } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../servicio/producto';
import { ProductoService } from '../servicio/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orden',
  standalone: true,
  imports:  [HttpClientModule,CommonModule],
  templateUrl: './orden.component.html',
  styleUrl: './orden.component.scss'
})
export class OrdenComponent implements OnInit {

  ide: string | null = null;
  producto2: Producto | undefined; // Cambiado a Producto en lugar de Producto[]

  constructor(public _p: ProductoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ide = this.route.snapshot.paramMap.get('id');
    if (this.ide) {
      this._p.find(this.ide).subscribe((producto1) => {
        this.producto2 = producto1; 
      });
    }
  }
}
