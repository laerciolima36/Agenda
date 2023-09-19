var divResumo = $(".resumoReserva");

export class DadosReserva{
	
	id_funcionario;
	id_empresa;
	id_servico;
	id_hora;
	funcionario = "Selecione...";
	servico = "Selecione...";
	data = "Selecione...";
	hora = "Selecione...";
	valor = "R$";
	
	constructor (){}
	
	set funcionario(funcionario){
		this.funcionario = funcionario;
	}
	
	get funcionario(){
		return this.funcionario;
	}
	
	set servico(servico){
		this.servico = servico;
	}
	
	get servico(){
		return this.servico;
	}
	
	set hora(hora){
		this.hora = hora;
	}
	
	get hora(){
		return this.hora;
	}
	
	set data(data){
		this.data = data;
	}
	
	get data(){
		return this.data;
	}
	
	set valor(valor){
		this.valor = valor;
	}
	
	get valor(){
		return this.valor;
	}
	
	exibirResumo(){
		
		divResumo.empty();
		divResumo.append('<div class="card text-center">'+
				'<div class="card-header">'+
				'	Resumo do seu Agendamento'+
				'</div>'+
				'<div class="card-body">'+
				'	<p class="card-text">Você será atendido por: <strong>'+this.funcionario+'</strong></p>'+
				'	<p class="card-text">Serviço: <strong>'+this.servico+'</strong></p>'+
				'	<p class="card-text">Data e Hora: <strong>'+this.data+' às '+this.hora+'</strong></p>'+
				'	<p class="card-text">Valor: <strong>R$ '+this.valor+'</strong></p>'+
				'</div>'+
			'</div>');
	}
	
	removerResumo(){
		divResumo.empty();
	}

}