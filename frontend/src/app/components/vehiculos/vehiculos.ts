import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculosService, Vehiculo } from '../../services/vehiculos.service';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehiculos.html',
  styleUrls: ['./vehiculos.scss']
})
export class VehiculosComponent implements OnInit {
  vehicles: Vehiculo[] = [];
  loading = true;
  error = '';

  constructor(private vehiculosService: VehiculosService) {}

  ngOnInit() {
    this.vehiculosService.getVehiculos().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar vehículos';
        this.loading = false;
      }
    });
  }

}
