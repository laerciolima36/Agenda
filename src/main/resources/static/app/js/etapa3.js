import { limpaSections } from "./empresa_from_cliente.js";
import { resumoReserva } from "./empresa_from_cliente.js";
import { carregarEtapa2 } from "./etapa2.js";
import { carregarEtapa4 } from "./etapa4.js";
import { fetchGet } from "../../painel/js/api.js";
import { section1 } from "./empresa_from_cliente.js";
import { section2 } from "./empresa_from_cliente.js";
import { section3 } from "./empresa_from_cliente.js";
import { logo } from "./empresa_from_cliente.js";


let dataAtual = new Date().toLocaleDateString('pt-BR');


export function carregarEtapa3(FuncionarioSelecionado) {
	limpaSections();
	exibirsection1(FuncionarioSelecionado);
	exibirsection2(FuncionarioSelecionado);
	exibirsection3();
	consultarHorasDisponiveis(dataAtual, FuncionarioSelecionado[0].id_funcionario);
	
}

function exibirsection1(FuncionarioSelecionado) {

	section1.append(
		'<div class="container-fluid bg-dark text-light pt-4 ps-4">' +
		'<i class="fa-solid fa-circle-left fa-xl btn-voltar"></i>' +
		'</div>' +
		'<div class="container-fluid bg-dark text-light text-center pt-4">' +
		'<figure class="figure">' +
		'<img src="' + logo + '" class="figure-img img-fluid rounded img-thumbnail" alt="..." style="max-width: 40%;">' +
		'<figcaption class="figure-caption"><span>' + empresa.nome + '</span></figcaption>' +
		'</figure>' +
		'</div>');

	$('.btn-voltar').on("click", function() {
		carregarEtapa2(FuncionarioSelecionado);
	});
}

function exibirsection2(FuncionarioSelecionado) {

	var horarios = FuncionarioSelecionado[0].horarios;

	section2.append(
		'<div class="container-fluid justify-content-center text-center">' +
		'<br>' +

		'			<div class="">' +
		'				<div class="position-relative m-4">' +
		'					<div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0"' +
		'						aria-valuemax="100" style="height: 1px;">' +
		'						<div class="progress-bar" style="width: 100%"></div>' +
		'					</div>' +
		'					<button type="button"' +
		'						class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"' +
		'						style="width: 2rem; height:2rem;">1</button>' +
		'					<button type="button"' +
		'						class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill"' +
		'						style="width: 2rem; height:2rem;">2</button>' +
		'					<button type="button"' +
		'						class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-primary rounded-pill"' +
		'						style="width: 2rem; height:2rem;">3</button>' +
		'				</div>' +

		'			</div>' +
		'			<br>' +

		'			<p class="fs-6">Selecione a Data</p>' +
		'<div class="d-flex justify-content-center">' +
		'<div class="col-6">' +
		'			<input id="calendario" readonly type="text" class="form-control col-2" style="text-align: center; position: relative; z-index: 5000;" >' +
		'</div>' +
		'</div>' +
		'			<br>' +

		'			<p class="fs-6">Selecione o Horário Disponivel?</p>' +

		'			<ul class="list-group listHoras">' +


		'			</ul>' +

		'			<br>' +

		'			<div class="aling-items-center">' +
		'				<button class="btn btn-continuar btn-success btn-lg">Continuar</button>' +
		'			</div><br>' +


		'		</div>');

	let listHoras = $(".listHoras");
	listHoras.empty();

	for (var hora of horarios) {
		listHoras.append(
			'			<li class="list-group-item btn-horario d-flex justify-content-between hora' + hora.id_horario + '" aria-current="true" id="' + hora.id_horario + '">' +
			'					<div class="d-flex justify-content-start align-items-center">' +
			'					<i class="fa-solid fa-clock me-2"></i>' +
			'						<div class="text-start">' +
			'							<strong>' + hora.hora + '</strong><br>' +
			'						</div>' +
			'					</div>' +
			'					<div class="d-flex align-items-center"><i class="fa-solid fa-arrow-right"></i></div>' +
			'				</li>');
	}

	$('.btn-horario').on("click", function() {
		$("li").removeClass("active");

		$("#" + this.id).addClass("active");

		let horaSelecionada = horarios.filter(horarios => horarios.id_horario == this.id);

		//---------------------- Ajustar Codigo -----------------------------
		resumoReserva.id_hora = this.id;
		resumoReserva.hora = horaSelecionada[0].hora;
		resumoReserva.exibirResumo();
		//-------------------------------------------------------------------
	});

	$('.btn-continuar').on("click", function() {
		if (resumoReserva.id_hora == undefined) {
			alert("Por favor selecione um horário antes de continuar!");
		} else {
			carregarEtapa4(FuncionarioSelecionado);
		}
	});

	$("#calendario").datepicker({
		dateFormat: 'dd/mm/yy',
		dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
		dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
		dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
		monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
		monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
		//beforeShowDay: $.datepicker.noSunday,
		showOtherMonths: true,
		selectOtherMonths: true,
		//showAnim: "slide",


	}).datepicker("setDate", new Date()).on("change", function() {
		//this é o elemento input, o valor seria: this.value
		$("li").removeClass("disabled");
		resumoReserva.data = this.value;
		resumoReserva.exibirResumo();
		consultarHorasDisponiveis(this.value, FuncionarioSelecionado[0].id_funcionario);
	});;;
}

function exibirsection3() {

}

function consultarHorasDisponiveis(dataSelecionada, id_funcionario) {
	let url = "/get/reserva?data=" + dataSelecionada + "&id=" + id_funcionario;
	fetchGet(url, mostrarHorasDisponiveis);
}

function mostrarHorasDisponiveis(reservas) {

	for (var reserva of reservas) {
		let id_horario = reserva.horario.id_horario;
		$(".hora" + id_horario).addClass("disabled");
	}
	console.log(reservas);
}
