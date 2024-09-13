import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from './producto';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  Url = "http://127.0.0.1:8000/p/productos"
  
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }

  constructor(private _HttpClient :HttpClient) {}

  getProductos(): Observable<Producto[]>{
    return this._HttpClient.get<Producto[]>(this.Url);
  }

  postProductos(producto: FormData): Observable<Producto> {
    // Retornar la llamada al método `post`, lo que genera un Observable
    return this._HttpClient.post<Producto>(this.Url, producto,{headers:{} }).pipe(catchError(this.errorHandler));
    
  }

  find(id: string):Observable<Producto>{
    return this._HttpClient.get<Producto>(`${this.Url}/${id}/editar`).pipe(
      catchError(this.errorHandler)
      )
  }

  update(id: string ,producto: Producto): Observable<Producto> {
    return this._HttpClient.put<Producto>(`${this.Url}/${id}`, JSON.stringify(producto), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  uploadProductoImage(id: string, formData: FormData): Observable<Producto> {
    return this._HttpClient.post<Producto>(`${this.Url}/${id}/upload-image`, formData)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  delete(id: string | undefined){
    return this._HttpClient.delete<Producto>(`${this.Url}/${id}`, this.httpOptions) 
    
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


