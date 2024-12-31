import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule,NgChartsModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export default class DashboardHomeComponent {
  statsData = [
    { title: 'Cirugías Programadas', value: '24', delta: '+12%', icon: 'bi bi-calendar', color: 'primary' },
    { title: 'Cirugías del Día', value: '8', delta: '+3', icon: 'bi bi-clock', color: 'success' },
    { title: 'Total Pacientes', value: '156', delta: '+15%', icon: 'bi bi-people', color: 'info' },
    { title: 'Tasa de Éxito', value: '98.5%', delta: '+2.1%', icon: 'bi bi-activity', color: 'warning' },
    { title: 'Ocupación Quirófanos', value: '85%', delta: '+5%', icon: 'bi bi-pie-chart', color: 'danger' },
    { title: 'Eficiencia Operativa', value: '92%', delta: '+3.2%', icon: 'bi bi-graph-up', color: 'secondary' }
  ];

  lineChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr'],
    datasets: [
      {
        label: 'Programadas',
        data: [45, 52, 48, 56],
        borderColor: '#0d6efd',
        tension: 0.1
      },
      {
        label: 'Realizadas',
        data: [42, 48, 45, 52],
        borderColor: '#198754',
        tension: 0.1
      }
    ]
  };

  lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  barChartData = {
    labels: ['Traumatología', 'Cardiología', 'Neurología', 'General'],
    datasets: [{
      data: [35, 28, 22, 18],
      backgroundColor: '#0d6efd'
    }]
  };

  barChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  };

}
