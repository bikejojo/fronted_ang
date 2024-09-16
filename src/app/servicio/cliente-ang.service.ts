import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, tap } from 'rxjs';
import { GET_DIRECTORS, GET_MOVIES } from '../../fragment';
@
Injectable({
  providedIn: 'root'
})
export class ClienteAngService {

  private url = "http://127.0.0.1:8000/graphql"
  constructor(private apollo: Apollo) {}

  // Consulta para obtener usuarios
  getUsuarios(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          getAllUser {
            id
            email
            ci
            tipo_usuario
          }
        }
      `,
    });
  }

  getCiudad():Observable<any>{
    return this.apollo.query({
      query: gql`
        query {
          getAllCiudad{
            id
            descripcion
          }
        }
      `,
    })
  }
  // Consulta para obtener técnicos
  getTecnicos(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          getAllTecnico {
            id
            nombre
            apellido
            carnet_anverso
            carnet_reverso
            email
            telefono
            contrasenia
            foto
            users_id
            ciudades_id
          }
        }
      `,
    });
  }

  createUser(data: any): Observable<any> {
    const mutation = gql`
      mutation createUser($ci: String!, $tipo_usuario: Int!, $password: String!, $email: String) {
        createUser(userRequest: {
          ci: $ci,
          tipo_usuario: $tipo_usuario,
          contrasenia: $contrasenia,
          email: $email
        }) {
            id
            ci
            email
            token
          }
      }
    `;

    return this.apollo.mutate({
      mutation,
      variables: {
        ci: data.ci,
        tipo_usuario: 2,
        password: data.password,
        email: data.email
      },
    });
  }

  createTecnico(data: any, userId: String): Observable<any> {
    const mutation = gql`
      mutation createTecnico($nombre: String!, $apellido: String!, $email: String, $telefono: String!, $contrasenia: String!, $carnet_anverso: String!, $carnet_reverso: String!, $foto: String!, $users_id: ID!, $ciudades_id: ID!) {
        createTecnico(tecnicoRequest: {
          nombre: $nombre,
          apellido: $apellido,
          email: $email,
          telefono: $telefono,
          contrasenia: $contrasenia,
          carnet_anverso: $carnet_anverso,
          carnet_reverso: $carnet_reverso,
          foto: $foto,
          users_id: $users_id,
          ciudades_id: $ciudades_id
        }) {
          id
          nombre
          apellido
        }
      }
    `;

    return this.apollo.mutate({
      mutation,
      variables: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        contrasenia: data.password,
        carnet_anverso: data.carnet_anv,
        carnet_reverso: data.carnet_rev,
        foto: "1",
        users_id: userId,
        ciudades_id: data.ciudades_id,
      },
    });
  }

  login(): Observable<any> {
    const mutation = gql`
      mutation login($ci2: String!, $password2: String!) {
        login(ci: $ci2, password: $password2) #// Devuelve el token
      }
    `;
      //console.log(typeof data);
      const ci = data.ci ? data.ci.toString():'';
      const pass = data.password ? data.password.toString():'';
      //console.log(typeof ci);

    return this.apollo.mutate({
      mutation:mutation,
      variables:{
        ci:ci,
        password:pass,
      }
    }).pipe(
      tap((response: any) => {
        const token = response.data.login; // Aquí obtienes directamente el token
        if (token) {
          // Guardar el token en Local Storage
          localStorage.setItem('authToken', token);
          console.log('Token guardado:', token);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
