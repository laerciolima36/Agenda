import { dadosempresa } from "./empresa.js";
import { buscarReservas } from "./dashboard.js";

let div_main = $(".main");
let dataAtual = new Date().toLocaleDateString('pt-BR');

export function exibirAgenda() {

	div_main.empty();
	div_main.append('<br>');

	div_main.append(

		'<div class="container text-center">Selecione a Data</div>' +
		'<div class="d-flex justify-content-center">' +
		'<div class="col-6">' +
		'<input id="calendario" readonly type="text" class="form-control col-2" style="text-align: center; position: relative;" >' +
		'</div>' +
		'</div><br><br>');

	buscarReservas(dataAtual, dadosempresa.id_empresa, true);

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
		buscarReservas(this.value, dadosempresa.id_empresa, true);
	});;;



}