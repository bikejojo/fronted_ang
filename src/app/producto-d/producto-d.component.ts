import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductoD } from '../servicio/productoD';
import { ProductoDService } from '../servicio/producto-d.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-d',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './producto-d.component.html',
  styleUrls: ['./producto-d.component.scss']
})
export class ProductoDComponent implements OnInit {

  productod: ProductoD[] | any = [];  // Ajustado a un array de ProductoD
  ide : string | null = "";
  lista: string[] = [" ", "ingreso", "salida"];

  constructor(public _productod: ProductoDService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.ide = this.route.snapshot.paramMap.get('id');
    if (this.ide) {
      this.getProductos();
    }
  }

  getProductos() {
    this._productod.getProductos(this.ide!).subscribe(
      (res) => {  // Cambiado a ProductoD
        console.log('Datos obtenidos:', res);
        this.productod = res ||  [];  // Si deseas manejarlo como un array
      },
      (error) => {
        console.error('Error obteniendo datos:', error);
      }
    );
  }

  trackByProductoId(index: number, product: ProductoD) {
    return product.id_prod;
  }
}

