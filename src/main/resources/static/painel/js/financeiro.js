import { apiGet } from "./api.js";
import { apiPost } from "./api.js";
import { apiDelete } from "./api.js";
import { apiUpdate } from "./api.js";
import { dadosempresa } from "./empresa.js";

let div_main = $(".main");

export function exibirFinanceiro() {
	div_main.empty();
	div_main.append('<h2>Página Financeiro em Desenvolvimento</h2>');
	//let url = "/servicos/empresa/" + id_empresa;
	//apiGet(url, htmlServicos);
}


function htmlServicos(servicos) {

	div_main.empty();
	div_main.append('<br>');

	htmlNovoServico();

	htmlMostraServicos(servicos);
}


function htmlNovoServico() {
	
	div_main.append('<div class="card"><div class="card-header d-flex justify-content-between">Cadastrar Novo Serviço ' +
	'<button class="btn btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNovoServico"' +
			'	aria-controls="collapseNovoServico" aria-expanded="false">+</button></div>' +
			
		'<div class="collapse" id="collapseNovoServico">'+	
		'<div class="card-body">' +
		'<div class="col-auto">' +
		'<label for="nome" class="form-label">Nome</label>' +
		'<input type="text" id="nome" class="form-control newNome" name="nome">' +
		'</div>' +
		'<br>' +
		'<div class="col-auto">' +
		'<label for="preco" class="form-label">Preço</label>' +
		'<input type="text" id="preco" class="form-control newPreco">' +
		'</div>' +
		'<br>' +
		'<div class="col-auto">' +
		'<label for="descricao" class="form-label">Descrição do Serviço</label>' +
		'<input type="text" id="descricao" class="form-control newDescricao" placeholder="Resuma este serviço para seus clientes...">' +
		'</div>' +
		'<br>' +
		'<div class="col-auto">' +
		'<label for="descricao" class="form-label">Tempo estimado</label>' +
		'<input type="text" id="tempo_servico" class="form-control newTempoServico">' +
		'</div>' +
		'<br>' +
		'<div class="mb-3">' +
		'<label for="formFile" class="form-label">Imagem do Serviço</label>' +
		'<input class="form-control" type="file" id="formFile">' +
		'</div>' +
		'<br>' +
		'<div class="col-auto d-flex justify-content-end">' +
		'<br><p><button class="btn btn-primary addservico">Adicionar Serviço</button>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'</div>'
		);

	div_main.append('<br>');

	$('.addservico').on("click", function() {
		addservico();
	})

}

function htmlMostraServicos(servicos) {

	div_main.append('<div class="card"><div class="card-header">Serviços</div>' +
		'<ul class="list-group list-group-flush listservico">');

	let listservico = $(".listservico");

	for (var servico of servicos) {
		listservico.append('<li class="list-group-item d-flex justify-content-between">' + servico.nome + '<div><button type="button" class="btn btn-secondary" data-bs-toggle="collapse" data-bs-target="#collapseExample' + servico.id_servico + '" aria-expanded="false" aria-controls="collapseExample">Alterar</button><span> </span><button type="button" id="' + servico.id_servico + '" class="btn btn-danger deletebtn">Apagar</button></div></li></ul></div>');
		listservico.append('<div class="collapse" id="collapseExample' + servico.id_servico + '"><div class="card card-body">' +

			'<div class="col-auto">' +
			' <label for="matricula" class="form-label">Nome</label>' +
			'<input type="text" class="form-control updateNome' + servico.id_servico + '" name="nome" value="' + servico.nome + '">' +
			'</div>' +
			'<div class="col-auto">' +
			'<label for="nome" class="form-label">Preço</label>' +
			'<input type="text" class="form-control updatePreco' + servico.id_servico + '" id="preco" value="' + servico.preco + '">' +
			'</div>' +
			'<div class="col-auto">' +
			'<br><p><button id="' + servico.id_servico + '" class="btn btn-primary updatebtn">Salvar Alterações</button>' +
			'</div>' +
			'</form>' +
			'</div></div>');
	}

	$('.deletebtn').on("click", function() {
		deleteservico(this.id);
	})

	$('.updatebtn').on("click", function() {
		updateservico(this.id);
	})
}




function addservico() {

	let nome = $(".newNome").val();
	let preco = $(".newPreco").val();

	let servico = {
		"nome": nome,
		"preco": preco,
		"empresa": {
			"id_empresa": id_empresa
		}
	}

	let url = "/servicos/save";
	apiPost(url, exibirServicos, servico);
}

function deleteservico(id_servico) {
	let url = "/servicos/delete/" + id_servico;
	apiDelete(url, exibirServicos);
}

function updateservico(id) {

	let nome = $(".updateNome" + id).val();
	let preco = $(".updatePreco" + id).val();

	let servico = {
		"id_servico": id,
		"nome": nome,
		"preco": preco,
		"empresa": {
			"id_empresa": id_empresa
		}
	}

	let url = "/servicos/update/" + id;
	apiUpdate(url, exibirServicos, servico);

}