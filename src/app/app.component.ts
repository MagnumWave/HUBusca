import { Usuario } from './usuario';
import { RepsDoUser } from './repsdouser';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NEVER, Observable } from 'rxjs';
import { Input } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HUBusca';
  nomeDigitado = '';
  usuario2 = {
    name: '',
    login: '',
    location: '',
    id: '',
    followers: '',
    public_repos: '',
    avatar_url: ''
  };
  usuario = {
    nome: '',
    login: '',
    localizacao: '',
    id: '',
    seguidores: '',
    repositorios: '',
    imagem: ''
  };
  // repositoriosUrl = '';
  repsDoUser1 = [] as any;
  // repsDoUser2 = [];
  primPop = false;
  segPop = false;

  constructor(private http: HttpClient) {

  }

  getUser(userX: string): void {
    if (userX !== '') {
      this.primPop = true;
      this.segPop = false;
      this.repsDoUser1.length = 0;

      /*let resp1 = this.http.get('https://api.github.com/users/' + userX);
      resp1.subscribe((data) => this.usuario = {
        nome: data.name,
        login: data.login,
        localizacao: data.location,
        id: data.id,
        seguidores: data.followers,
        repositorios: data.public_repos,
        imagem: data.avatar_url
      }); */
      const resp1 = this.http.get('https://api.github.com/users/' + userX);
      resp1.subscribe((data: any) => {
        const newAuxObj = {
          name: data.name,
          login: data.login,
          location: data.location,
          id: data.id,
          followers: data.followers,
          public_repos: data.public_repos,
          avatar_url: data.avatar_url
        };
        // console.log(newAuxObj);
        this.usuario2.name = newAuxObj.name;
        this.usuario2.login = newAuxObj.login;
        this.usuario2.location = newAuxObj.location;
        this.usuario2.id = newAuxObj.id;
        this.usuario2.followers = newAuxObj.followers;
        this.usuario2.public_repos = newAuxObj.public_repos;
        this.usuario2.avatar_url = newAuxObj.avatar_url;
      });
      // console.log(this.usuario2);
    // this.repositoriosUrl = this.usuario.repos_url;


      /*let resp2 = this.http.get('https://api.github.com/users/'+userX+'/repos');
      resp2.subscribe((response) => {
      for (let i=0;i<response.length;i++){
        this.repsDoUser1.push(
          {
            nome: response[i].name,
            linguagem: response[i].language,
            descricao: response[i].description,
            data_criacao: <String>response[i].created_at.slice(0,10),
            data_ultpush: <String>response[i].pushed_at.slice(0,10)
          }
        );
      }

    }); */
      const auxArr: any = [];
      let auxObj = {};
      const resp2 = this.http.get('https://api.github.com/users/' + userX + '/repos');
      resp2.subscribe((response: any) => {
        for (const item of response) {
          auxObj = {
            name: item.name,
            language: item.language,
            description: item.description,
            created_at: item.created_at.slice(0, 10),
            pushed_at: item.pushed_at.slice(0, 10),
            html_url: item.html_url
          };
          auxArr.push(auxObj);
          this.repsDoUser1.push(auxObj);
        }
        this.repsDoUser1 = auxArr;
      });

      /* this.repsDoUser1.length = auxArr.length;

      for (let item of auxArr) {
        this.repsDoUser1[item] = auxArr[item];
      } */


      console.log(this.repsDoUser1);
    } else { alert('opa!'); }



  }

  clickaFoto(): void{
    this.segPop = true;
  }

  clickaRepo(url: string): void{
    window.open(url);
  }

}
