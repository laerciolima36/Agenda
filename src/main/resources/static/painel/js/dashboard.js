import { displayLoading } from "./api.js";
import { hideLoading } from "./api.js";
import { dadosempresa } from "./empresa.js";

let div_main = $(".main");
let div_reservas = $(".reservas");
let div_tarefas = $(".tarefas");
let dataAtual = new Date().toLocaleDateString('pt-BR');
let mostrarFinalizadas = false;
var dataEscolhida = new Date().toLocaleDateString('pt-BR');;

export function exibirDashboard() {

	div_main.empty();
	div_main.append(


		'		<br><nav aria-label="Page navigation example">' +
		'			<ul class="pagination justify-content-center">' +
		'				<li class="page-item btn-ontem" id="ontem"><a class="page-link" href="#">Ontem</a></li>' +
		'				<li class="page-item btn-hoje active" id="hoje"><a class="page-link" href="#">Hoje</a></li>' +
		'				<li class="page-item btn-amanha" id="amanha"><a class="page-link" href="#">Amanhã</a></li>' +
		'			</ul>' +
		'		</nav>' +

		'<div class="container-fluid d-flex justify-content-center"><span id="dataAtual">' + dataAtual + '</span></div><br>' +
		'<div class="container-fluid text-center"><span id="msgReservas1"></span><span id="nServicos"></span><span id="msgReservas2"></span></div><br>'+
		
		'<div class="form-check form-switch justify-content-center d-flex">'+
  		'<input class="form-check-input me-1" type="checkbox" role="switch" id="btn-check" checked>'+
  		'<label class="form-check-label" for="btn-check"> Ocultar Reservas Finalizadas/Canceladas</label>'+
		'</div><p>');

	ReservasDiaAtual();

	$('#btn-check').on("click", function() {
		if(this.checked){
			mostrarFinalizadas = false;
			buscarReservas(dataEscolhida, dadosempresa.id_empresa, mostrarFinalizadas);
		}else{
			mostrarFinalizadas = true;
			buscarReservas(dataEscolhida, dadosempresa.id_empresa, mostrarFinalizadas);
		}
	})
	
	$('.btn-ontem').on("click", function() {
		activebtn(this.id);
		mostrarDiaAnterior();
	})
	$('.btn-hoje').on("click", function() {
		activebtn(this.id);
		ReservasDiaAtual();
	})
	$('.btn-amanha').on("click", function() {
		activebtn(this.id);
		mostrarProximoDia();
	})
	
	//mostrarTarefas();
}

function activebtn(id) {
	$("li").removeClass("active");
	$("#" + id).addClass("active");
}

export function buscarReservas(dataSelecionada, id_empresa, ViewFinalizadas) {
	
	let url = "/reserva?data=" + dataSelecionada + "&empresa=" + id_empresa;
	
	displayLoading();
	
	fetch(url, {
		method: "GET",
		headers: { "Content-type": "application/json;charset=UTF-8" }
	})
		.then(response => response.json())
		.then(response => {
			hideLoading()
			Reservas(response, ViewFinalizadas)})
		.catch(erro => console.log("Erro na solicitação das reservas" + erro));
}


function Reservas(reservas, ViewFinalizadas) {

	if(!ViewFinalizadas){
		reservas = reservas.filter(reservas => reservas.status == "ABERTO")
		console.log(reservas);
	}
	
	let qtdReservas = reservas.length;

	if (qtdReservas == 0) {
		$('#nServicos').text('Nenhuma');
	} else {
		$('#nServicos').text(qtdReservas);
	}

	div_reservas.empty();

	for (var reserva of reservas) {
		switch (reserva.status) {
			case "ABERTO":
				div_reservas.append(mostrarReserva(reserva));
				break;

			case "FECHADO":
				div_reservas.append(mostrarReservaFinalizada(reserva));
				break;

			case "CANCELADO":
				div_reservas.append(mostrarReservaCancelada(reserva));
				break;

		}
	}
	
	//if(qtdReservas == 0){
//		div_reservas.append('<div class="container text-center">Nenhuma Reserva nesta data!</div>');
//	}
	
	funcaobtn();
}

function mostrarReserva(reserva) {

	let cardReserva = '<div class="card text-bg-light mb-3">' +
		'<div class="card-header">Quem Reservou: ' + reserva.nomecliente + '</div>' +
		'<div class="card-body text-center">' +
		'<h5 class="card-title">' + reserva.servico.nome + '</h5>' +
		'<h5 class="card-text lh-sm">Hora: ' + reserva.horario.hora + '</h5>' +
		'<p class="card-text lh-sm">Contato: ' + reserva.zapcliente + '</p>' +
		'<p class="card-text lh-sm">Valor: R$ ' + reserva.servico.preco + '</p>' +
		'<div class="container rounded p-1 d-flex justify-content-center">' +
		'<button class="btn btn-danger btn-cancelar border border-2 me-5" id="' + reserva.id_reserva + '">Cancelado</button>' +
		'<button class="btn btn-success btn-finalizar border border-2" id="' + reserva.id_reserva + '">Finalizado</button>' +
		'</div>' +
		'</div>' +
		'<div class="card-footer">' +
		'Serviço Executado Por: ' + reserva.funcionario.nome +
		'</div></div><p>';

	return cardReserva;
}

function mostrarReservaFinalizada(reserva) {

	let cardFinalizado = '<div class="card text-bg-success mb-3">' +
		'<div class="card-header">Quem Reservou: ' + reserva.nomecliente + '</div>' +
		'<div class="card-body text-center">' +
		'<h5 class="card-title">' + reserva.servico.nome + '</h5>' +
		'<h5 class="card-text lh-sm">Hora: ' + reserva.horario.hora + '</h5>' +
		'<p class="card-text lh-sm">Contato: ' + reserva.zapcliente + '</p>' +
		'<p class="card-text lh-sm">Valor: R$ ' + reserva.servico.preco + '</p>' +
		'</div>' +
		'<div class="card-footer">' +
		'Serviço Executado Por: ' + reserva.funcionario.nome +
		'</div></div><p>';

	return cardFinalizado;
}

function mostrarReservaCancelada(reserva) {

	let cardCancelado = '<div class="card text-bg-danger mb-3">' +
		'<div class="card-header">Quem Reservou: ' + reserva.nomecliente + '</div>' +
		'<div class="card-body text-center">' +
		'<h5 class="card-title">' + reserva.servico.nome + '</h5>' +
		'<h5 class="card-text lh-sm">Hora: ' + reserva.horario.hora + '</h5>' +
		'<p class="card-text lh-sm">Contato: ' + reserva.zapcliente + '</p>' +
		'<p class="card-text lh-sm">Valor: R$ ' + reserva.servico.preco + '</p>' +
		'</div>' +
		'<div class="card-footer">' +
		'Serviço Executado Por: ' + reserva.funcionario.nome +
		'</div></div><p>';

	return cardCancelado;
}

function reservaFoiCancela(idReserva) { //revisar metodo
	let url = "/reserva/cancelada/" + idReserva;
	//apiGet(url, auxiliar);
	buscarReservas(dataEscolhida, dadosempresa.id_empresa, mostrarFinalizadas);
}

function reservaFoiFinaliza(idReserva) { //revisar metodo
	let url = "/reserva/finalizada/" + idReserva;
	//apiGet(url, auxiliar);
	buscarReservas(dataEscolhida, dadosempresa.id_empresa, mostrarFinalizadas);
}

function auxiliar(result){
	console.log(result);
}


function mostrarDiaAnterior() {
	const currentDate = new Date();
	const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1));

	let dataOntem = yesterday.toLocaleDateString();
	dataEscolhida = dataOntem;
	$('#dataAtual').text(dataOntem);

	buscarReservas(dataOntem, dadosempresa.id_empresa, mostrarFinalizadas);
	$('#msgReservas1').text('Ontem teve (');
	$('#msgReservas2').text(') Reservas!');

}

function mostrarProximoDia() {
	const currentDate = new Date();
	const yesterday = new Date(currentDate.setDate(currentDate.getDate() + 1));

	let dataAmanha = yesterday.toLocaleDateString();
	dataEscolhida = dataAmanha;
	$('#dataAtual').text(dataAmanha);

	buscarReservas(dataAmanha, dadosempresa.id_empresa, mostrarFinalizadas);
	$('#msgReservas1').text('Você possui (');
	$('#msgReservas2').text(') reserva para Amanhã!');

}

function ReservasDiaAtual() {
	const currentDate = new Date();

	let dataHoje = currentDate.toLocaleDateString();
	dataEscolhida = dataHoje;
	$('#dataAtual').text(dataHoje);

	buscarReservas(dataHoje, dadosempresa.id_empresa, mostrarFinalizadas);
	$('#msgReservas1').text('Você possui (');
	$('#msgReservas2').text(') reservas para Hoje, por enquanto!');
}

function funcaobtn() {
	$('.btn-cancelar').on("click", function() {
		console.log("clicou em cancelar");
		reservaFoiCancela(this.id);
	});

	$('.btn-finalizar').on("click", function() {
		console.log("clicou em finalizar");
		reservaFoiFinaliza(this.id);
	});
}

export function limparDivReserva(){
	div_reservas.empty();
}

function mostrarTarefas(){ //tutorial de inicio para os clientes, não aplicado
	div_tarefas.append('<br><div class="container-fluid">' +

				'<h6 class="text-center">Seu sistema está quase pronto para seus clientes começarem a fazer os agendamentos.</h6>' +
        		'<h6><br><br>Falta só alguns ajustes, vamos lá?' +
        		'<br><br>Siga os passos a seguir:</h6>' +
    		'<div class="list-group">' +
      
        		'<a id="item1" "href="#" class="list-group-item list-group-item-action text-bg-danger d-flex justify-content-between align-items-center"><span>1 - Cadastrar Imagens</span><i class="fa-solid fa-arrow-right"></i></a>' +
        		'<a id="item2" href="#" class="list-group-item list-group-item-action text-bg-danger d-flex justify-content-between align-items-center"><span>2 - Cadastrar Serviços</span><i class="fa-solid fa-arrow-right"></i></a>' +
        		'<a id="item3" href="#" class="list-group-item list-group-item-action text-bg-danger d-flex justify-content-between align-items-center"><span>3 - Cadastrar Horários</span><i class="fa-solid fa-arrow-right"></i></a>' +
        		'<a id="item4" href="#" class="list-group-item list-group-item-action text-bg-danger d-flex justify-content-between align-items-center"><span>4 - Cadastrar Funcionários</span><i class="fa-solid fa-arrow-right"></i></a>' +
        		'<a id="item5" href="#" class="list-group-item list-group-item-action text-bg-danger d-flex justify-content-between align-items-center"><span>5 - Pix</span><i class="fa-solid fa-arrow-right"></i></a>' +

    		'</div>' +
		'</div>');
		
		$("#item1").removeClass("text-bg-danger");
}



