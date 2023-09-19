import { fetchPost } from "../../painel/js/api.js";
import { limpaSections } from "./empresa_from_cliente.js";
import { resumoReserva } from "./empresa_from_cliente.js";
import { carregarEtapa3 } from "./etapa3.js";
import { section1 } from "./empresa_from_cliente.js";
import { section2 } from "./empresa_from_cliente.js";
import { section3 } from "./empresa_from_cliente.js";
import { logo } from "./empresa_from_cliente.js";


export function carregarEtapa4(FuncionarioSelecionado) {
	limpaSections();
	exibirsection1(FuncionarioSelecionado);
	exibirsection2();
	exibirsection3();
	resumoReserva.removerResumo();
}

function exibirsection1(FuncionarioSelecionado) {

	section1.append(
		'<div class="container-fluid bg-dark text-light pt-4 ps-4">' +
		'<i class="fa-solid fa-circle-left fa-xl btn-voltar"></i>' +
		'</div>' +
		'<div class="container-fluid bg-dark text-light text-center pt-4">' +
		'<figure class="figure">' +
		'<img src="' + logo + '" class="figure-img img-fluid rounded img-thumbnail" alt="..." style="max-width: 40%;">' +
		'<figcaption class="figure-caption"><span class="nomeEmpresa">' + empresa.nome + '</span></figcaption>' +
		'</figure>' +
		'</div>');

	$('.btn-voltar').on("click", function() {
		carregarEtapa3(FuncionarioSelecionado);
	});
}

function exibirsection2() {

	section2.append(
		'<div class="container-fluid justify-content-center text-center">' +
		'<br>' +
		'<br>' +

		'<div class="card text-center">' +
		'	<div class="card-header">' +
		'	Insira seus Dados de Contato:' +
		'</div>' +
		'<div class="card-body">' +
		'	<div class="input-group mb-3">' +
		'	<span class="input-group-text" id="inputGroup-sizing-default">Nome:</span>' +
		'<input type="text" class="form-control inputNome" aria-label="Sizing example input"' +
		'	aria-describedby="inputGroup-sizing-default">' +
		'</div>' +
		'<div class="input-group mb-3">' +
		'<span class="input-group-text" id="inputGroup-sizing-default">Whatsapp:</span>' +
		'<input type="text" class="form-control inputZap" aria-label="Sizing example input"' +
		'	aria-describedby="inputGroup-sizing-default">' +
		'<span>Te avisaremos 20min antes...</span>'+
		'</div>' +
		'<br>' +
		'<a href="#" class="btn btn-finalizar btn-success">Finalizar Reserva</a>' +
		'</div>' +
		'</div>' +
		'</div>');

	$('.inputZap').mask('(99) 99999-9999');

	$('.btn-finalizar').on("click", function() {

		let nomeCliente = $('.inputNome').val();
		let zapCliente = $('.inputZap').val();

		if (nomeCliente == "" || zapCliente == "") {
			alert("Por Favor Preencha todos os Dados!")
		} else {
			let reserva = {
				"data": resumoReserva.data,
				"empresa": {
					"id_empresa": empresa.id_empresa
				},
				"funcionario": {
					"id_funcionario": resumoReserva.id_funcionario
				},
				"servico": {
					"id_servico": resumoReserva.id_servico
				},
				"horario": {
					"id_horario": resumoReserva.id_hora
				},
				"nomecliente": nomeCliente,
				"zapcliente": zapCliente,
				"status": "ABERTO"
			}

			let url = "/post/reserva/save";
			fetchPost(url, ReservaSucesso, reserva);
		}
	});
}

//NOK
function exibirsection3() {
	section3.append(
		'<div class="container-fluid justify-content-center text-center">' +
		'<br>' +
		'<div class="card text-center">' +
		'<div class="card-header">' +
		'	Resumo do seu Agendamento' +
		'</div>' +
		'<div class="card-body">' +
		'	<h5 class="card-title msgObrigado">Agora falta só finalizar seu atendimento!</h5>' +
		'	<p class="card-text">Você será atendido por: <strong>' + resumoReserva.funcionario + '</strong></p>' +
		'	<p class="card-text">Serviço: <strong>' + resumoReserva.servico + '</strong></p>' +
		'	<p class="card-text">Data e Hora: <strong>' + resumoReserva.data + ' às ' + resumoReserva.hora + '</strong></p>' +
		'	<p class="card-text">Valor do Serviço: <strong>R$ ' + resumoReserva.valor + '</strong></p>' +
		'</div>' +
		'</div>' +
		'</div>'
		
	);
}

function ReservaSucesso(response){
	console.log(response);
	
	let nomeCliente = $('.inputNome').val();
	
	section2.empty();
	section3.empty();
	section2.append(
		'<div class="container-fluid justify-content-center text-center">' +
		'<br>' +
		'<div class="card text-bg-success mb-3 text-center">' +
		'<div class="card-header">' +
		'	Resumo do seu Agendamento' +
		'</div>' +
		'<div class="card-body">' +
		'	<h5 class="card-title">Obrigado '+nomeCliente+' pela sua reserva!</h5>' +
		'	<p class="card-text">Você será atendido por: <strong>' + resumoReserva.funcionario + '</strong></p>' +
		'	<p class="card-text">Serviço: <strong>' + resumoReserva.servico + '</strong></p>' +
		'	<p class="card-text">Data e Hora: <strong>' + resumoReserva.data + ' às ' + resumoReserva.hora + '</strong></p>' +
		'	<p class="card-text">Valor do Serviço: <strong>R$ ' + resumoReserva.valor + '</strong></p>' +
		'	<p class="card-text">Avisaremos a você 20 minutos antes, até logo!</strong></p>' +
		'</div>' +
		'</div>' +
		'</div>'
		
	);
}