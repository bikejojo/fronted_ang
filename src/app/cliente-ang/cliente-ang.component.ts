import { Component ,inject, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import { ClienteAng } from '../servicio/clienteAng';
//import { ClienteAngT } from '../servicio/clienteAngT';
//import { ClienteAngService } from '../servicio/cliente-ang.service';
import { FormsModule } from '@angular/forms';
import { Query } from 'apollo-angular';
//import { Ciudad } from '../servicio/ciudad';



@Component({
  selector: 'ngbd-modal-content',
  standalone : true ,
  template: `
   <div  class="modal-header" >
      <h4 class="modal-title">Formulario de ingreso para nuevo cliente</h4>
   </div>

  `,
})

export class NgbdModalContent{
  activeModal = inject(NgbActiveModal);
}



@Component({
  selector: 'app-cliente-ang',
  standalone: true,
  imports: [HttpClientModule , CommonModule , FormsModule  ],
  templateUrl: './cliente-ang.component.html',
  styleUrl: './cliente-ang.component.scss',
})

export class ClienteAngComponent implements OnInit{
  //url="http://127.0.0.1:8000/graphiql"

  directors : any = []
  tecnicos : any = []
  ciudad : any=[]

  formData:{[key:string]:any} = {
    nombre: '',
    apellido: '',
    ci: '',
    email: '',
    telefono: '',
    password: '',
    carnet_anv: null,
    carnet_rev: null,
    foto: null,
    ciudades_id: '',
  };

  onFileChange(event: any, fileKey: string) {
    const file = event.target.files[0];
    this.formData[fileKey] = file; // Guarda el archivo en formData
  }

  constructor(){}
  ngOnInit() {
   this.getTecnicos();
   this.getUsuarios();
   this.getCiudad();
  }
  //hecho !!!
  getUsuarios() {
  fetch('http://127.0.0.1:8000/graphql',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          getAllUser{
            id
            email
            ci
            tipo_usuario
          }
        }`,
    }),
  })
  .then((response)=>response.json())
  .then((data)=>{
    this.directors = data.data.getAllUser;
    console.log(this.directors);
  })
  .catch((error) => console.error('Error fetching users', error));
  }
  //hecho !!!
  getTecnicos() {
    fetch('http://127.0.0.1:8000/graphql',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            getAllTecnico {
              id
              nombre
              apellido
            }
          }
        `,
      }),
    })
    .then((response)=>response.json())
    .then((data)=> {
      this.tecnicos = data.data.getAllTecnico;
      console.log(this.tecnicos);
    })
    .catch((error)=>console.error('error',error));
  }
  //hecho !!!
  getCiudad(){
    fetch('http://127.0.0.1:8000/graphql',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
          getAllCiudad {
            id
            descripcion
          }
        }
      `,
      }),
    })
    .then((response)=>response.json())
    .then((data)=>{
      this.ciudad = data.data.getAllCiudad;
      console.log(this.ciudad);
    })
    .catch((error) => console.error('ciudad', error));
  }

    loginFormData = {
      ci: '',
      password: ''
}

  async onSubmit() {
    try {
        const userJson = {
            email: this.formData['email'],
            password: this.formData['password'],
            ci: this.formData['ci'],
            tipo_usuario: 1,
        };

        let response = await fetch('http://127.0.0.1:8000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                mutation ($userRequest: JSON!) {
                    createUser(userRequest: $userRequest) {
                        id
                        ci
                        token
                    }
                }
                `,
                variables: {
                    userRequest: userJson,
                }
            }),
        });

        let data = await response.json();
        console.log('Usuario creado con éxito:', data);
        const usId = data.data.createUser.id;

        const tecnicoJson = {
            nombre: this.formData['nombre'],
            apellido: this.formData['apellido'],
            email: this.formData['email'],
            telefono: this.formData['telefono'],
            contrasenia: this.formData['password'],
            users_id: usId,
            ciudades_id: this.formData['ciudades_id'],
        };

        const formImagen = new FormData();
        const operations = {
            query: `
            mutation ($tecnicoRequest: JSON!, $carnet_anverso: Upload, $carnet_reverso: Upload, $foto: Upload) {
                createTecnico(tecnicoRequest: $tecnicoRequest, carnet_anverso: $carnet_anverso, carnet_reverso: $carnet_reverso, foto: $foto) {
                    nombre
                    apellido
                    telefono
                }
            }
            `,
            variables: {
                tecnicoRequest: tecnicoJson,
                carnet_anverso: null,
                carnet_reverso: null,
                foto: null,
            }
        };

        formImagen.append('operations', JSON.stringify(operations));

        // Corregir el map
        const map = {
            '0': ['variables.carnet_anverso'],
            '1': ['variables.carnet_reverso'],
            '2': ['variables.foto'],
        };
        formImagen.append('map', JSON.stringify(map));

        // Agregar los archivos al FormData correctamente
        formImagen.append('0', this.formData['carnet_anv']); // Archivo del carnet anverso
        formImagen.append('1', this.formData['carnet_rev']); // Archivo del carnet reverso
        formImagen.append('2', this.formData['foto']); // Archivo de la foto

        response = await fetch('http://127.0.0.1:8000/graphql', {
            method: 'POST',
            body: formImagen,
        });
        data = await response.json();
        if (data.errors) {
            console.error('Errores al crear técnico:', data.errors);
        } else {
            console.log('Técnico creado con éxito:', data.data.createTecnico);
        }
    } catch (error) {
        console.error('fallas', error);
    }
  }


  async onLogin(event: Event) {
    event.preventDefault();

    const loginJson = {
      ci: this.loginFormData.ci,
      password: this.loginFormData.password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation ($ci: String!, $password: String!) {
              login(ci: $ci, password: $password)
            }
          `,
          variables: {
            ci: loginJson.ci,
            password: loginJson.password,
          }
        }),
      });

      const data = await response.json();
      if (data.errors) {
        console.error('Error en el login:', data.errors);
      } else {
        const token = data.data.login;
        localStorage.setItem('authToken', token); // Guardar el token en el almacenamiento local
        console.log('Login exitoso, token recibido:', token);
      }
    } catch (error) {
      console.error('Fallo en el login:', error);
    }
  }
}

