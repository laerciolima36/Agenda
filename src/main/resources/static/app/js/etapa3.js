import { limpaSections } from "./empresa_from_cliente.js";
import { resumoReserva } from "./empresa_from_cliente.js";
import { carregarEtapa1 } from "./etapa1.js";
import { exibirCabecalho } from "./etapa1.js";
import { carregarEtapa2 } from "./etapa2.js";
import { carregarEtapa4 } from "./etapa4.js";
import { fetchGet } from "../../painel/js/api.js";
import { section1 } from "./empresa_from_cliente.js";
import { section2 } from "./empresa_from_cliente.js";
import { section3 } from "./empresa_from_cliente.js";
import { logo } from "./empresa_from_cliente.js";


let dataAtual = new Date().toLocaleDateString('pt-BR');
let diaAtual = new Date().getDay();


export function carregarEtapa3(FuncionarioSelecionado) {
	limpaSections();
	exibirsection1(FuncionarioSelecionado);
	exibirsection2(FuncionarioSelecionado);
	exibirsection3();
	consultarHorasDisponiveis(dataAtual, FuncionarioSelecionado[0].id_funcionario);
	atualizaResumo();
}

function atualizaResumo(){
    resumoReserva.data = dataAtual;
    resumoReserva.hora = "Selecione...";
    resumoReserva.exibirResumo();
}

function exibirsection1(FuncionarioSelecionado) {

	section1.append(exibirCabecalho());

	$('.btn-voltar').on("click", function() {
		carregarEtapa2(FuncionarioSelecionado);
	});
}

function exibirsection2(FuncionarioSelecionado) {



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
		'						style="width: 2rem; height:2rem;" id="btn1">1</button>' +
		'					<button type="button"' +
		'						class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill"' +
		'						style="width: 2rem; height:2rem;" id="btn2">2</button>' +
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

    $('#btn2').on("click", function() {
    	carregarEtapa2(FuncionarioSelecionado);
    });

    $('#btn1').on("click", function() {
    	carregarEtapa1();
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
    		let dia = $("#calendario").datepicker("getDate").getDay();
    		console.log(dia);
    		resumoReserva.exibirResumo();
    		getHorasDoDia(FuncionarioSelecionado[0], dia);
    		consultarHorasDisponiveis(this.value, FuncionarioSelecionado[0].id_funcionario);
    	});;;


    getHorasDoDia(FuncionarioSelecionado[0], diaAtual);

	$('.btn-continuar').on("click", function() {
		if (resumoReserva.id_hora == undefined || resumoReserva.hora == "Selecione...") {
			alert("Por favor selecione um horário antes de continuar!");
		} else {
			carregarEtapa4(FuncionarioSelecionado);
		}
	});


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

function getHorasDoDia(funcionario, dia){

    let diaSemana = 0;

    switch(dia){
        case 0:
            diaSemana = funcionario.planoatendimento.dias.filter(dia => dia.dia_semana == 'DOMINGO');
            console.log(diaSemana);
            break;
        case 1:
            diaSemana = funcionario.planoatendimento.dias.filter(dia => dia.dia_semana == 'SEGUNDA');
            console.log(diaSemana);
            break;
        case 2:
            diaSemana = funcionario.planoatendimento.dias.filter(dia => dia.dia_semana == 'TERCA');
            console.log(diaSemana);
            break;
        case 3:
            diaSemana = funcionario.planoatendimento.dias.filter(dia => dia.dia_semana == 'QUARTA');
            console.log(diaSemana);
            break;
        case 4:
            diaSemana = funcionario.planoatendimento.dias.filter(dia => dia.dia_semana == 'QUINTA');
            console.log(diaSemana);
            break;
        case 5:
            diaSemana = funcionario.planoatendimento.dias.filter(dia => dia.dia_semana == 'SEXTA');
            console.log(diaSemana);
            break;
        case 6:
            diaSemana = funcionario.planoatendimento.dias.filter(dia => dia.dia_semana == 'SABADO');
            console.log(diaSemana);
            break;
        default:
            console.log("Erro ao identificar o dia da semana");
    }

        let listHoras = $(".listHoras");
    	listHoras.empty();

    	var horarios = diaSemana[0].horario;

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
}