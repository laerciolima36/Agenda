import { limpaSections } from "./empresa_from_cliente.js";
import { resumoReserva } from "./empresa_from_cliente.js";
import { carregarEtapa1 } from "./etapa1.js";
import { exibirCabecalho } from "./etapa1.js";
import { carregarEtapa3 } from "./etapa3.js";
import { section1 } from "./empresa_from_cliente.js";
import { section2 } from "./empresa_from_cliente.js";
import { section3 } from "./empresa_from_cliente.js";
import { logo } from "./empresa_from_cliente.js";

let dataAtual = new Date().toLocaleDateString('pt-BR');

export function carregarEtapa2(FuncionarioSelecionado) {
	limpaSections();
	exibirsection1();
	exibirsection2(FuncionarioSelecionado);
	exibirsection3();
	atualizaResumo();
}

function atualizaResumo(){
    resumoReserva.data = dataAtual;
    resumoReserva.valor = "";
    resumoReserva.servico = "Selecione...";
    resumoReserva.exibirResumo();
}

function exibirsection1() {

	section1.append(exibirCabecalho());


	$('.btn-voltar').on("click", function() {
		carregarEtapa1();
	});
}

function exibirsection2(FuncionarioSelecionado) {

	var servicos = FuncionarioSelecionado[0].servicos;

	section2.append(
		'<div class="container-fluid justify-content-center text-center">' +
		'<br>' +

		'<div class="">' +
		'<div class="position-relative m-4">' +
		'<div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0"' +
		'aria-valuemax="100" style="height: 1px;">' +
		'<div class="progress-bar" style="width: 50%"></div>' +
		'</div>' +
		'<button type="button"' +
		'	class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"' +
		'	style="width: 2rem; height:2rem;" id="btn1">1</button>' +
		'<button type="button"' +
		'	class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill"' +
		'	style="width: 2rem; height:2rem;">2</button>' +
		'<button type="button"' +
		'	class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill"' +
		'	style="width: 2rem; height:2rem;">3</button>' +
		'</div>' +

		'</div>' +
		'<br>' +

		'<p class="fs-6">Qual Serviço Desejado?</p>' +

		'<ul class="list-group listServicos">' +
		'</ul>' +

		'<br>' +

		'</div>');

    $('#btn1').on("click", function() {
		carregarEtapa1();
	});

	let listServicos = $(".listServicos");
	listServicos.empty();
	let urlImagemServico;

	for (var servico of servicos) {
		if (servico.img == null) {
			urlImagemServico = "/imagens/avatar.jpeg";
		} else {
			urlImagemServico = servico.img.url;
		}
		
		listServicos.append(
			'<li class="list-group-item btn-servico list-group-item-action d-flex justify-content-between" aria-current="true" id="' + servico.id_servico + '">' +
			'<div class="d-flex justify-content-start"><img' +
			'		src="' + urlImagemServico + "?v=" + new Date().getTime() + '"' +
			'		class="figure-img img-fluid rounded img-thumbnail me-2" alt="..." style="max-width: 20%;">' +
			'	<div class="text-start">' +
			'	<strong>' + servico.nome + '</strong><br>' +
			'	<span>' + servico.descricao + '</span><br>' +
			'	<span>R$ ' + servico.preco + '</span>' +
			'	</div>' +
			'</div>' +
			'<div class="d-flex align-items-center"><i class="fa-solid fa-arrow-right"></i></div>' +
			'</li>');
	}

	$('.btn-servico').on("click", function() {

		let nomeServico = servicos.filter(servicos => servicos.id_servico == this.id);

		//---------------------- Ajustar Codigo -----------------------------
		resumoReserva.id_servico = this.id;
		resumoReserva.servico = nomeServico[0].nome;
		resumoReserva.valor = nomeServico[0].preco;
		resumoReserva.exibirResumo();
		//-------------------------------------------------------------------

		carregarEtapa3(FuncionarioSelecionado);
	});
}

function exibirsection3() {

}