import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Vehiculo {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  estado_de_disponibilidad: string;
}

@Injectable({ providedIn: 'root' })
export class VehiculosService {
  private apiUrl = 'http://localhost:3000/vehiculos';

  constructor(private http: HttpClient) {}

  getVehiculos(): Observable<Vehiculo[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(res => res.data as Vehiculo[])
    );
  }
} 