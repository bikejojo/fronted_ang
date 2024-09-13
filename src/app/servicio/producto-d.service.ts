import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { ProductoD } from './productoD';

@Injectable({
  providedIn: 'root'
})
export class ProductoDService {
  url = "http://127.0.0.1:8000/d/productos"
  //url = "http://127.0.0.1:8000/graphiql"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }
 
  constructor(private _HttpClient :HttpClient) { }

  getProductos(id:string ):Observable<ProductoD>{
    console.log(`GET request to: ${this.url}/${id}`);
    return this._HttpClient.get<ProductoD>(`${this.url}/${id}`).pipe(
      catchError(this.errorHandler)
    )
  }

  postProductos(productoD:ProductoD,id:string): Observable<ProductoD>{
    if(productoD.estado = ''){
      new MessageEvent('no ha ingresado un estado, escoja un estado porfavor !!!')
    }if (productoD.estado='ingreso') {
      productoD.estado = '1'
    } else {
      productoD.estado = '0'
    }

    return this._HttpClient.post<ProductoD>(`${this.url}/${id}/post`,JSON.stringify(productoD))
  }
  errorHandler(error: { error: { errorMessage: string; }; status: any; errorMessage: any; }){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.errorMessage;
    }else{
      errorMessage = `Error Code: ${error.status} \nMessage: ${error.errorMessage}`;
    }
    return throwError(errorMessage);
  }
}
