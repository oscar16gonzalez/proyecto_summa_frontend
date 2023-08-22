import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
   private apiUrl = environment.serverUrl;

   constructor(private http: HttpClient) { }
   
   getRutas(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(`${this.apiUrl}/rutas`);
  }

  getRutasSuscritas(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/rutas/${id}`);
  }

  getRutasCreadas(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/rutas/mis_rutas/${id}`);
  }

  createRutas(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rutas`, user);
  }

  updateRutas(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/rutas/${id}`, user);
  }

  deleteRuta(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/rutas/${id}`);
  }

}
