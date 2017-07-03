import { Component, OnInit, Input, Output, EventEmitter, ViewChildren } from '@angular/core';
import { ClavesBasicasService } from '../claves-basicas.service';

@Component({
	selector: 'claves-basicas-lista-clues',
	templateUrl: './lista-clues.component.html',
	styleUrls: ['./lista-clues.component.css']
})
export class ListaCluesComponent implements OnInit {

	@Output() onCerrar = new EventEmitter<void>();
	@Output() onEnviar = new EventEmitter<any>();

	@Input() lista: any;

	unidadesMedicas:any[] = [];

	constructor(private apiService: ClavesBasicasService) { }

	ngOnInit() {
		this.apiService.listaClues(this.lista.id).subscribe(
			resultado => {

			}, error => {
				console.log(error);
			}
		)
	}
	cerrar(){		
		this.onCerrar.emit();
	}

}
