import { Component ,inject, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import { ClienteAng } from '../servicio/clienteAng';
//import { ClienteAngT } from '../servicio/clienteAngT';
//import { ClienteAngService } from '../servicio/cliente-ang.service';
import { FormsModule } from '@angular/forms';
//import { Query } from 'apollo-angular';
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
  imports: [HttpClientModule , CommonModule , FormsModule , ],
  templateUrl: './cliente-ang.component.html',
  styleUrl: './cliente-ang.component.scss',
})

export class ClienteAngComponent implements OnInit{
  //url="http://127.0.0.1:8000/graphiql"

  directors : any = []
  tecnicos : any = []
  ciudad : any=[]
  habilidad : any=[]
  habilidadesSeleccionadas: Set<{ id: string, experiencia: string, descripcion: string }> = new Set();


  formData:{[key:string]:any} = {
    nombre: '',
    apellido: '',
    ci: '',
    email: '',
    telefono: '',
    contrasenia: '',
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
   this.getHabilidades();
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
      contrasenia: ''
}
//listo
getHabilidades(){
  fetch('http://127.0.0.1:8000/graphql',{
    method:'POST',
    headers:  {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          getAllHabilidades{
            id
            nombre
        }
    }
      `,
    }),
  })
  .then((response)=>response.json())
  .then((data)=>{
    this.habilidad = data.data.getAllHabilidades;
  })
  .catch((error)=>console.error('falla',error))
}

/*
onCheckboxChange(event: any) {
  const habilidadId = event.target.value;
  if (event.target.checked) {
    this.habilidadesSeleccionadas.add(habilidadId);
  } else {
    this.habilidadesSeleccionadas.delete(habilidadId);
  }
}*/
  async onSubmit() {
    try {
        const userJson = {
            email: this.formData['email'],
            contrasenia: this.formData['contrasenia'],
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
            contrasenia: this.formData['contrasenia'],
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
      contrasenia: this.loginFormData.contrasenia,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation ($ci: String!, $contrasenia: String!) {
              login(ci: $ci, contrasenia: $contrasenia)
            }
          `,
          variables: {
            ci: loginJson.ci,
            contrasenia: loginJson.contrasenia,
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

  async onSumbit2(){
    try{
    const habilidadesJson = {
      tecnico_id: 1,
      habilidades: Array.from(this.habilidadesSeleccionadas).map((habilidad) => ({
        habilidad_id: habilidad,
        experiencia: habilidad.experiencia || '',
        descripcion: habilidad.descripcion || '',
      })),
    };
    console.log(JSON.stringify({
      tecnico_id: habilidadesJson.tecnico_id,
      habilidades: habilidadesJson.habilidades,
    }));
    // Aquí haces una solicitud al backend para guardar las habilidades seleccionadas
    const response = await fetch('http://127.0.0.1:8000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation($tecnico_id: ID!, $habilidades: JSON!) {
            assignTecnicoHabilidad(tecnico_id: $tecnico_id, habilidades: $habilidades) {
              id
            }
          }
        `,
        variables: {
          tecnico_id: habilidadesJson.tecnico_id,
          habilidades: habilidadesJson.habilidades,
        },
      }),
    });

    const data = await response.json();
    if (data.errors) {
      if (data.errors) {
        console.error('habilidades:', data.errors);
      } else {
        const token = data.data.login;
        localStorage.setItem('authToken', token); // Guardar el token en el almacenamiento local
        console.log('habilidad exitoso, token recibido:', token);
      }
    }
  }catch (error) {
      console.error('Fallo en el habilidad:', error);
    }
  }
}

