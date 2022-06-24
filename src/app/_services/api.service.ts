import { HttpClient, HttpClientModule,HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
const TOKEN_HEADER_KEY = 'Authorization';   
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token:any;
  constructor( private http:HttpClient,private tokenStorage: TokenStorageService) { 
    this.token=this.tokenStorage.getUser().token;
  }
  postAlbum(data:any){
    const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.post<any>("http://localhost:8080/products",data,{ headers: reqHeader });
  }
  getAlbums(id:any){
    console.log(this.token)

    const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.http.get<any>("http://localhost:8080/products/getAll/"+id,{ headers: reqHeader });
  }
  putAlbum(data:any,id:number){
    const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.put<any>("http://localhost:8080/products/"+id,data,{ headers: reqHeader });
  }
  deleteAlbum(id:number){
    const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.http.delete<any>("http://localhost:8080/products/"+id,{ headers: reqHeader });
  }
}
