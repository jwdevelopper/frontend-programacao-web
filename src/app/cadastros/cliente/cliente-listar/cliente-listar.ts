import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente-service';
import { TableModule } from 'primeng/table';
import { Cliente } from '../models/cliente.model';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-cliente-listar',
  imports: [TableModule, ButtonModule, TooltipModule],
  standalone: true,
  providers: [],
  templateUrl: './cliente-listar.html',
  styleUrl: './cliente-listar.scss'
})
export class ClienteListar implements OnInit {

  clientes: any[] = [];

  constructor(
    private readonly clienteService: ClienteService,
  private readonly detectorMudancas: ChangeDetectorRef) {}


  ngOnInit(): void {
   this.clienteService.listarClientes().subscribe({
    next: (listaClientes: any[]) => {
      this.clientes = listaClientes;
      console.log(this.clientes);
      this.detectorMudancas.detectChanges();
    },
    error: error => {
      console.log("Erro ao buscar clientes");
      console.log(error);
    }
   });
  }




}
