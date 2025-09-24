import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from "primeng/card";
import { FloatLabel } from 'primeng/floatlabel';
import { InputMask } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from "primeng/button";
import { ClienteService } from '../cliente-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente-cadastrar',
  imports: [
    Card,
    FloatLabel,
    InputText,
    InputMask,
    ReactiveFormsModule,
    ButtonDirective,
    ToastModule,
    RouterLink
],
  templateUrl: './cliente-cadastrar.html',
  styleUrl: './cliente-cadastrar.scss'
})
export class ClienteCadastrar implements OnInit{

  @Input() id!:string;

  formularioCliente!: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly clienteService: ClienteService,
    private readonly messageService: MessageService,
    private readonly route: Router
  ) {

  }

  ngOnInit(): void {
    this.configurarFormulario();
    if(this.id){
      this.buscarClientePorId();
    }
  }

  configurarFormulario() {
    this.formularioCliente = this.formBuilder.group({
      id: [],
      nome: [null,Validators.compose([Validators.required,
        Validators.maxLength(60), Validators.minLength(2)])],
        cpfCnpj:[null, Validators.required]
    });
  }

  salvarCliente() {
    if(this.formularioCliente.invalid){
      console.log('formulario invalido');
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Formulario inválido!' });
    } else {
      if(this.id) {
        this.atualizarCliente();
      } else {
        this.adicionarNovoCliente();
      }
    }

  }

  buscarClientePorId() {
    this.clienteService.buscarClientePorId(this.id).subscribe({
      next: (cliente) => {
        this.formularioCliente.patchValue(cliente);
      }, error: (erro) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar cliente!' });
      }
    })
  }

  adicionarNovoCliente(){
    this.clienteService.salvarCliente(this.formularioCliente.value)
    .subscribe({
      next: (_) => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Cliente Salvo com sucesso!' });
        this.route.navigateByUrl('/clientes/listar');
      },
      error: (erro) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar cliente!' });
      }
    })
  }

  atualizarCliente(){
    this.clienteService.atualizarCliente(this.id, this.formularioCliente.value)
    .subscribe({
      next: (_) => {
        this.route.navigateByUrl('/clientes/listar');
      },
      error: (erro) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar cliente!' });
      }
    })
  }

}
