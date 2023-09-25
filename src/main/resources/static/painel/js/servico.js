import { fetchGet } from "./api.js";
import { fetchPost } from "./api.js";
import { fetchDel } from "./api.js";
import { fetchPut } from "./api.js";
import { fetchPostImage } from "./api.js";
import { dadosempresa } from "./empresa.js";

let div_main = $(".main");

export function exibirServicos() {
	let url = "/get/servicos/empresa/" + dadosempresa.id_empresa;
	fetchGet(url, htmlMostraServicos);
}

$('.addservico').on("click", function() {
	addservico();
})

$('.dinheiro').mask('#.##0,00', { reverse: true });

function htmlMostraServicos(servicos) {

	div_main.empty();
	div_main.append('<br><div class="card"><div class="card-header d-flex justify-content-between align-items-center"><div><i class="fa-solid fa-list"></i> Serviços</div> ' +
		'<button class="btn btn-light btnServicoNew" type="button" data-bs-toggle="modal" data-bs-target="#ModalNovoServico"' +
		'	aria-controls="collapseNovoServico" aria-expanded="false"><i class="fa-solid fa-plus"></i></button></div>' +
		'<ul class="list-group list-group-flush listservico">');

	let listservico = $(".listservico");

	for (var servico of servicos) {

		listservico.append('<li class="list-group-item">' +
			'<div class="row">' +
			'<div class="col">' +

			'<div class="row justify-content-start">' +
			'<div class="col-3 p-0 text-center">' +

			'<label class="pictureServico" for="picture__inputservico' + servico.id_servico + '" tabIndex="0">' +
			'<span class="pictureimgservico' + servico.id_servico + '"></span>' +
			'</label>' +
			'<input type="file" idnew="' + servico.id_servico + '" class="inputF" name="picture__input' + servico.id_servico + '" id="picture__inputservico' + servico.id_servico + '">' +


			'</div>' +
			'<div class="col">' +

			'<h5>' + servico.nome + '</h5>' +
			'Descrição: ' + servico.descricao +
			'<br>Valor do serviço: R$ ' + servico.preco +
			'<br>Tempo estimado: ' + servico.tempoServico + '<br><br>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +


			'<div class="row text-end">' +
			'<div class="col">' +

			'<button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#ModalAlteraServico' + servico.id_servico + '">Alterar</button><span> </span>' +
			'<button type="button" id="' + servico.id_servico + '" class="btn btn-danger deletebtn" data-bs-toggle="modal" data-bs-target="#DeleteModal">Apagar</button>' +
			'</div></div></li></ul></div>');

		listservico.append('<div class="modal fade" id="ModalAlteraServico' + servico.id_servico + '" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
			'<div class="modal-dialog modal-dialog-centered">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<h1 class="modal-title fs-5" id="exampleModalLabel">Alterar Serviço</h1>' +
			'<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
			'</div>' +
			'<div class="modal-body">' +

			'<div class="col-auto">' +
			' <label for="matricula" class="form-label">Nome</label>' +
			'<input type="text" class="form-control updateNome' + servico.id_servico + '" name="nome" value="' + servico.nome + '">' +
			'</div>' +
			'<br>' +

			'<div class="col-auto">' +
			'<label for="nome" class="form-label">Valor do Serviço R$</label>' +
			'<input type="text" class="form-control updatePreco' + servico.id_servico + '" id="preco" value="' + servico.preco + '">' +
			'</div>' +
			'<br>' +

			'<div class="col-auto">' +
			'<label for="descricao" class="form-label">Descrição do Serviço</label>' +
			'<input type="text" class="form-control updateDescricao' + servico.id_servico + '" value="' + servico.descricao + '">' +
			'</div>' +
			'<br>' +

			'<div class="col-auto">' +
			'<label for="descricao" class="form-label">Tempo estimado (Ex.: 30min -> 00:30)</label>' +
			'<input type="time" id="tempo_servico" class="form-control updateTempoServico' + servico.id_servico + '" value="' + servico.tempoServico + '">' +
			'</div>' +
			'<br>' +

			'</div>' +

			'<div class="modal-footer">' +
			'<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>' +
			'<button type="button" id="' + servico.id_servico + '" class="btn btn-primary updatebtn">Salvar Alterações</button>' +
			'</div></div></div></div>');


		const inputFile = document.querySelector("#picture__inputservico" + servico.id_servico);
		const pictureImage = document.querySelector(".pictureimgservico" + servico.id_servico);
		const pictureImageTxt = "Foto...";
		pictureImage.innerHTML = pictureImageTxt;

		
		if (servico.img != null) {
			const img = document.createElement("img");
			img.src = servico.img.url + "?" + new Date().getTime();
			img.classList.add("picture__img");

			pictureImage.innerHTML = "";
			pictureImage.appendChild(img);
		}


		inputFile.addEventListener("change", function(e) {
			const inputTarget = e.target;
			const file = inputTarget.files[0];
			const id_servico = inputFile.getAttribute("idnew");

			salvarImagem(file, id_servico);

			if (file) {
				const reader = new FileReader();

				reader.addEventListener("load", function(e) {
					const readerTarget = e.target;

					const img = document.createElement("img");
					img.src = readerTarget.result;
					img.classList.add("picture__img");

					pictureImage.innerHTML = "";
					pictureImage.appendChild(img);
				});

				reader.readAsDataURL(file);
			} else {
				pictureImage.innerHTML = pictureImageTxt;
			}
		});

	}

	div_main.append('<br>');

	$('.deletebtn').off();
	$('.magic').off();
	$('.updatebtn').off();

	$('.deletebtn').on("click", function() {
		$('.delspan').empty();
		$('.delspan').append("Serviço?");
		$('.magic').attr('id', this.id);
	})

	$('.magic').on("click", function() {
		deleteservico(this.id);
	})

	$('.updatebtn').on("click", function() {
		updateservico(this.id);
	})

	$('.btnServicoNew').on("click", function() {
		$(".newServicoNome").val('');
		$(".newServicoPreco").val('');
		$(".newServicoDescricao").val('');
		$(".newTempoServico").val('');
	});
}


function addservico() {

	let nome = $(".newServicoNome").val();
	let preco = $(".newServicoPreco").val();
	let descricao = $(".newServicoDescricao").val();
	let tempoServico = $(".newTempoServico").val();

    if(validarServico(nome, preco, descricao, tempoServico)){

	let servico = {
		"nome": nome,
		"preco": preco,
		"descricao": descricao,
		"tempoServico": tempoServico,
		"empresa": {
			"id_empresa": dadosempresa.id_empresa
		}
	}

	let url = "/servicos/save";
	fetchPost(url, exibirServicos, servico);

	$("#ModalNovoServico").modal('hide');

	}else{
	    alert("Preencha todos os Campos")
	}
}

function validarServico(nome, preco, descricao, tempoServico){
    if(nome != "" && preco != "" && descricao != "" && tempoServico != ""){
        return true;
    }else{
        return false;
    }
}

function deleteservico(id_servico) {
	let url = "/servicos/delete/" + id_servico;
	fetchDel(url, exibirServicos);
}

function updateservico(id) {

	let nome = $(".updateNome" + id).val();
	let preco = $(".updatePreco" + id).val();
	let descricao = $(".updateDescricao" + id).val();
	let tempoServico = $(".updateTempoServico" + id).val();

    if(validarServico(nome, preco, descricao, tempoServico)){

	let servico = {
		"id_servico": id,
		"nome": nome,
		"preco": preco,
		"descricao": descricao,
		"tempoServico": tempoServico,
		"empresa": {
			"id_empresa": dadosempresa.id_empresa
		}
	}

	let url = "/servicos/update/" + id;
	fetchPut(url, exibirServicos, servico);

	$("ModalAlteraServico"+id).modal('hide');

	}else{
    alert("Preencha todos os Campos")
    }

}


function salvarImagem(file, id_servico) {

	const nome = file.name;
	const contentType = file.type;
	const contentLength = file.size;

	let image = {
		"id_imagem": id_servico,
		"nome": nome,
		"contentType": contentType,
		"contentLength": contentLength,
		"empresanome": dadosempresa.link,
		"tipoImagem": "servico"
	}

	console.log(image);

	let url = "/uploads/imagens/servico";
	fetchPostImage(url, image, file);
}