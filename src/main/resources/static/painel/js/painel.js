import { exibirEmpresa } from "./empresa.js"; //retorna e mostra a empresa de acordo com o usuario
import { setDadosEmpresa } from "./empresa.js";
import { exibirServicos } from "./servico.js";
import { exibirHorarios } from "./horario.js";
import { exibirFuncionarios } from "./funcionario.js";
import { exibirAgenda } from "./agenda.js";
import { exibirFinanceiro } from "./financeiro.js";
import { exibirDashboard } from "./dashboard.js";
import { limparDivReserva } from "./dashboard.js";


$(document).ready(function() {

	setDadosEmpresa();

	$('.a-dashboard').on("click", function() {
		exibirDashboard();
	})

	$('.a-empresa').on("click", function() {
		exibirEmpresa();
		limparDivReserva();
	})

	$('.a-servicos').on("click", function() {
		exibirServicos();
		limparDivReserva();
	})

	$('.a-horarios').on("click", function() {
		exibirHorarios();
		limparDivReserva();
	})

	$('.a-funcionarios').on("click", function() {
		exibirFuncionarios();
		limparDivReserva();
	})

	$('.a-agenda').on("click", function() {
		exibirAgenda();
		limparDivReserva();
	})

	$('.a-financeiro').on("click", function() {
		exibirFinanceiro();
		limparDivReserva();
	})
	
	$('.a-logout').on("click", function() {
		window.location.href = '/logout';
	})

});