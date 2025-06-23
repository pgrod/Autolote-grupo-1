import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Venta {
  id: number;
  fecha_de_venta: string;
  id_vehiculo_vendido: number;
  id_cliente_comprador: number;
  id_del_vendedor: number;
  precio_total: number;
  impuestos_aplicados: number;
}

@Injectable({ providedIn: 'root' })
export class VentasService {
  private apiUrl = 'http://localhost:3000/ventas';

  constructor(private http: HttpClient) {}

  getVentas(): Observable<Venta[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(res => res.data as Venta[])
    );
  }
} 