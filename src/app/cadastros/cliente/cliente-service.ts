import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from './models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlCliente: string = "http://localhost:8080/api/v1/clientes"

  constructor(private readonly httpCliente: HttpClient) {}

  listarClientes() {
     return this.httpCliente.get<any[]>(`${this.urlCliente}/listar`);
  }
}
