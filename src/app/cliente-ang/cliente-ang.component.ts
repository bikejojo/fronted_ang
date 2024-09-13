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

  formData = {
    nombre: '',
    apellido: '',
    ci: '',
    email: '',
    telefono: '',
    password: '',
    carnet_anv: '',
    carnet_rev: '',
    foto: '',
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

  async onSubmit(){

    try {
      const userJson = {
        email: this.formData.email,
        password: this.formData.password,
        ci: this.formData.ci,
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
        variables:{
          userRequest:userJson,
        }
      }),
    });

    let data = await response.json();
    console.log('Usuario creado con éxito:', data);
    const usId = data.data.createUser.id;
    const token = data.data.createUser.token;

    const tecnicoJson = {
      nombre: this.formData.nombre,
      apellido: this.formData.apellido,
      carnet_anverso: this.formData.carnet_anv,
      carnet_reverso: this.formData.carnet_rev,
      email: this.formData.email,
      telefono: this.formData.telefono,
      contrasenia: this.formData.password,
      foto: this.formData.foto,
      users_id: usId,
      ciudades_id: this.formData.ciudades_id,
    };

    //console.log('hola',tecnicoJson);
  const formImagen = new FormData();
  const operations = {
  query: `
      mutation ($tecnicoRequest: JSON!,$carnet_anverso: Upload, $carnet_reverso: Upload, $foto: Upload) {
        createTecnico(tecnicoRequest: $tecnicoRequest,carnet_anverso: $carnet_anverso,carnet_reverso: $carnet_reverso,foto: $foto) {
          nombre
          apellido
          telefono
        }
      }
    `,
    variables:{
      tecnicoRequest:tecnicoJson,
      carnet_anverso: null,
      carnet_reverso: null,
      foto: null,
    }
  };
  formImagen.append('operations',JSON.stringify(operations));
  const map = {
    '0' : ['formData.carnet_reverso'],
    '1' : ['formData.carnet_anverso'],
    '2' : ['formData.foto'],
  }

  formImagen.append('map',JSON.stringify(map));
  formImagen.append('0',this.formData.carnet_rev);
  formImagen.append('1',this.formData.carnet_rev);
  formImagen.append('2',this.formData.foto);

  response = await fetch('http://127.0.0.1:8000/graphql',{
    method:'POST',
    body: formImagen,
  })
  data = await response.json();
  if (data.errors) {
    console.error('Errores al crear técnico:', data.errors);
  } else {
    console.log('Técnico creado con éxito:', data.data.createTecnico);
  }
}catch(error){
      console.error('fallas',error);
    }
  }

}
