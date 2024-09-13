import { Component ,OnInit, viewChild  } from '@angular/core';
import {  HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../servicio/producto.service';
import { Producto } from '../servicio/producto';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { OrdenComponent } from '../orden/orden.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [HttpClientModule, CommonModule,FormsModule ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent implements OnInit{

  productos: Producto[] = [];
  
  nuevoProducto : Producto = {
      nombre : '' ,
      codigo : '', 
      cantidad : '' ,
      precioUnitario : '',
      foto: ''
  };
  
  resetForm() {
    this.nuevoProducto = {
      nombre: '',
      codigo: '',
      cantidad: '',
      precioUnitario: '',
      foto:''
    };
    this.isEditMode = false; // Resetea al modo creación
  }

  isEditMode: boolean = false;

  selectedFile!: File;

  onFileSelected(event:any) {
    this.selectedFile = <File>event.target.files[0];
  }

  constructor( public _producto:ProductoService, private _router:Router ){ }


  ngOnInit() {
    this.getProductos();
  }

  getProductos(){
      this._producto.getProductos().subscribe((producto)=>{return this.productos = producto })
  }

  trackByProductoId(index: number, producto: Producto): string | undefined {
      return producto.id;
  }

  postProducto(){
      const fd = new FormData();
      fd.append('nombre',this.nuevoProducto.nombre);
      fd.append('codigo',this.nuevoProducto.codigo);
      fd.append('cantidad',this.nuevoProducto.cantidad);
      fd.append('precioUnitario',this.nuevoProducto.precioUnitario);
      fd.append('foto', this.selectedFile, this.selectedFile.name);
      console.log(fd.get('foto'));
      this._producto.postProductos(fd).subscribe(res => {console.log('bien');
        this.getProductos();
        this.resetForm();
      }
    )
  }

  deleteProducto(id: string | undefined){
    this._producto.delete(id).subscribe(res => {console.log('se logro')
      this.getProductos();
    this.resetForm();
    });
    
  }
  verProducto(producto:Producto){
    let ide
    ide = producto.id;
    this._producto.find(ide ?? '').subscribe(res=>{console.log('se logroooo')
      this._router.navigate(['orden', ide]);
    });
  }

  editProducto(producto: Producto){
    this.nuevoProducto = { ...producto }; 
    this.isEditMode = true;
  }

  receta(producto:Producto){
    let ide
    ide = producto.id;
    this._producto.find(ide?? '').subscribe(res=>{console.log('ruta nueva')
      this._router.navigate(['producto-d',ide]);
    })
  }

  onSubmit() {
    const ide = this.nuevoProducto.id ?? '';
    if (this.isEditMode && this.nuevoProducto.id) {
      this._producto.update(this.nuevoProducto.id, this.nuevoProducto).subscribe(res => {
        // Después, si hay una imagen seleccionada, súbela
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('foto', this.selectedFile, this.selectedFile.name);
          this._producto.uploadProductoImage(ide , formData).subscribe(imgRes => {
            console.log('Imagen actualizada correctamente');
            this.getProductos(); // Refresca la lista de productos
            this.resetForm(); // Limpia el formulario
            this.isEditMode = false;
          });
        } else {
          this.getProductos(); // Refresca la lista de productos
          this.resetForm(); // Limpia el formulario
          this.isEditMode = false;
        }
      });
    } else {
      this.postProducto();
    }
  }
}
