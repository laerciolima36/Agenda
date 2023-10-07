import { fetchGet } from "./api.js";
import { fetchPost } from "./api.js";
import { fetchDel } from "./api.js";
import { fetchPut } from "./api.js";
import { fetchPostImage } from "./api.js";
import { dadosempresa } from "./empresa.js";

//variaveis
let div_main = $(".main");
let arrayServico = [];
let arrayHorario = [];
var tipoform;

//funções
export function exibirFuncionarios() {
	const URL_GET_FUN_BY_EMPRESA = "/get/funcionarios/empresa/" + dadosempresa.id_empresa;
	fetchGet(URL_GET_FUN_BY_EMPRESA, htmlMostraFuncionarios); //Busca no banco de dados todos os funcionarios para determinada empresa

	exibirServicosToFuncionario(); //Exibe a lista de serviços cadastrado na empresa no modal de funcionario(cadastro/alteracao)
	exibirPlanoToFuncionario(); //Exibe a lista de planos cadastrados na empresa no modal de funcionario(cadastro/alteracao)
}

//Exibe em lista todos os funcionarios
function htmlMostraFuncionarios(funcionarios) {

	div_main.empty();

	arrayServico = []; //zerar o array de serviço no carregamento da pagina

	//card box topo
	div_main.append('<br><div class="card"><div class="card-header d-flex justify-content-between">Funcionários' +
		'<button class="btn btn-light btnFuncionarioNew" type="button" data-bs-toggle="modal" data-bs-target="#ModalFuncionario">+</button></div>' +
		'<ul class="list-group list-group-flush listfuncionario">');

	let listfuncionario = $(".listfuncionario");

	//preenche o card com todos os funcionarios
	for (var funcionario of funcionarios) {

		listfuncionario.append('<li class="list-group-item">' +

			'<div class="row justify-content-center">' +
			'<label class="pictureFuncionario" for="picture__inputfuncionario' + funcionario.id_funcionario + '" tabIndex="0">' +
			'	<span class="pictureimgfuncionario' + funcionario.id_funcionario + '"></span>' +
			'</label>' +
			'<input type="file" idnew="' + funcionario.id_funcionario + '" class="inputF" name="picture__input' + funcionario.id_funcionario + '" id="picture__inputfuncionario' + funcionario.id_funcionario + '">' +
			'</div>' +
			'<br>' +

			'<h5>' + funcionario.nome + '</h5>' +
			'Contato: ' + funcionario.whatsapp +
			'<br>' +
			'<br>' +


			'<div class="col-auto"> ' +
			'<label for="" class="form-label">Serviços realizados por este funcionário</label> ' +
			'</div> ' +

			'<div class="card"> ' +
			'<div class="card-body listServicosDoFuncionario' + funcionario.id_funcionario + '">' +
			'</div>  ' +
			'</div>  ' +

			'<br>' +

			'<div class="col-auto"> ' +
			'<label for="" class="form-label">Plano de Atendimento</label> ' +
			'</div> ' +

			'<div class="card"> ' +
			'<div class="card-body dropPlano' + funcionario.id_funcionario + '">' +
			'</div>  ' +
			'</div>  ' +

			'<br>' +

			'<div class="row text-end">' +
			'<div class="col">' +

			'<button type="button" class="btn btn-secondary btnFuncionarioAlterar" id="' + funcionario.id_funcionario + '"data-bs-toggle="modal" data-bs-target="#ModalFuncionario">Alterar</button><span> </span>' +
			'<button type="button" id="' + funcionario.id_funcionario + '" class="btn btn-danger deletebtn" data-bs-toggle="modal" data-bs-target="#DeleteModal">Apagar</button>' +
			'</div></div></li></ul></div>');

		viewServicosDoFuncionario(funcionario); //Exibe os Serviços registrados para cada funcionario
		viewPlanoDoFuncionario(funcionario); //Exibe os Horários registrados para cada funcionario

		listfuncionario.append('<div class="bg-dark bg-gradient" style="height: 3px"></div>');


		const inputFile = document.querySelector("#picture__inputfuncionario" + funcionario.id_funcionario);
		const pictureImage = document.querySelector(".pictureimgfuncionario" + funcionario.id_funcionario);
		const pictureImageTxt = "Foto...";
		pictureImage.innerHTML = pictureImageTxt;

		if (funcionario.img != null) {
			const img = document.createElement("img");
			img.src = funcionario.img.url + "?" + new Date().getTime();
			img.classList.add("picture__img");

			pictureImage.innerHTML = "";
			pictureImage.appendChild(img);
		}


		inputFile.addEventListener("change", function(e) {
			const inputTarget = e.target;
			const file = inputTarget.files[0];
			const id_funcionario = inputFile.getAttribute("idnew");

			salvarImagem(file, id_funcionario);

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

	$('.deletebtn').off();
	$('.magic').off();
	$('.btnFuncionarioAlterar').off();
	$('.btnFuncionarioNew').off();

	//metodo para deletar o funcionario
	$('.deletebtn').on("click", function() {
		$('.delspan').empty();
		$('.delspan').append("Funcionário?");
		$('.magic').attr('id', this.id);
	});

	//metodo para deletar o funcionario
	$('.magic').on("click", function() {
		deletefuncionario(this.id);
	});

	$('.btnFuncionarioAlterar').on("click", function() {
		preparaModal("Alterar Funcionário", false, this.id);
		$('.savefuncionario').attr('id', this.id);
	});

	$('.btnFuncionarioNew').on("click", function() {
		preparaModal("Cadastrar Novo Funcionário", true);
	});

}

$('.FuncionarioWhatsapp').mask('(99) 99999-9999');

$('.savefuncionario').on("click", function() {
	console.log("chamou save funcionario - " + tipoform);

	if (tipoform) {
		addfuncionario();
		console.log("chamou save true funcionario - " + tipoform);
	}

	if (!tipoform) {
		updatefuncionario(this.id);
		console.log("chamou save false funcionario - " + tipoform);
	}
});


function preparaModal(title, tipo, id_funcionario) {
	tipoform = tipo;

	$(".titleFuncionario").empty();
	$(".titleFuncionario").append(title);
	$(".checkServico").prop("checked", false);
	//$(".checkHorario").prop("checked", false);
	arrayServico = [];
	//arrayHorario = [];
	console.log("prepara modal " + arrayServico);
	//console.log("prepara modal " + arrayHorario);

	if (tipoform) { //true modo cadastro
		$(".FuncionarioNome").val('');
		$(".FuncionarioWhatsapp").val('');
	}

	if (!tipoform) { //false modo alteração
		getByIdFuncionario(id_funcionario);
	}
}

//Exibe todos os serviços da empresa no modal de funcionario
function viewServicos(servicos) {

	let listservicos = $(".listServicos");
	listservicos.empty();

	for (var servico of servicos) {
		listservicos.append(
			'<div class="form-check form-check-inline">' +
			'<input class="form-check-input checkServico servico' + servico.id_servico + '" type="checkbox" id="' + servico.id_servico + '" value="option1">' +
			'<label class="form-check-label" for="inlineCheckbox1">' + servico.nome + '</label>' +
			'</div>'
		);
	}

	$(".checkServico").on("click", function() {
		let ck = this;

		if (ck.checked == true) {
			let servico = new Object();
			servico.id_servico = parseInt(ck.id, 10);
			arrayServico.push(servico);
			console.log(arrayServico);
		}

		if (ck.checked == false) {
			const enderecoArray = arrayServico.map(object => object.id_servico).indexOf(parseInt(ck.id, 10));
			console.log("Endereço " + enderecoArray);
			arrayServico.splice(enderecoArray, 1);
			console.log("Desmarcou " + ck.id);
			console.log(arrayServico);
		}
	});
}

//Exibe todos os horários da empresa no modal de funcionario
function viewPlanos(planos) {

	let selectplano = $("#selectPlano");
	selectplano.empty();
    selectplano.append('<option value="1">Plano Padrão</option>');

	for (var plano of planos) {
		selectplano.append('<option value="'+plano.id_plano+'">'+plano.nome+'</option>');
	}
}

//Mostra os serviços de todos os funcionario na lista
function viewServicosDoFuncionario(funcionario) {

	let listServicosDoFuncionario = $(".listServicosDoFuncionario" + funcionario.id_funcionario);

	if (!funcionario.servicos.length) {
		listServicosDoFuncionario.append(
			'<div class="form-check form-check-inline">' +
			'<label class="form-check-label text-danger" for="inlineCheckbox1"> Nenhum serviço registrado para este funcionário! Clique em alterar para inserir...</label>' +
			'</div>');
	}

	for (var servico of funcionario.servicos) {
		listServicosDoFuncionario.append(
			'<div class="form-check form-check-inline">' +
			'<label class="form-check-label" for="inlineCheckbox1"> - ' + servico.nome + '</label>' +
			'</div>'
		);

	}
}

//Mostra os horarios de todos os funcionario na lista
function viewPlanoDoFuncionario(funcionario) {
    console.log("Chamou view plano : ");
    console.log(funcionario);
	let dropPlano = $(".dropPlano" + funcionario.id_funcionario);

	if (!funcionario.planoatendimento) {
		dropPlano.append(
			'<div class="form-check form-check-inline">' +
			'<label class="form-check-label text-danger" for="inlineCheckbox1"> Nenhum Plano registrado para este funcionário! Clique em alterar para inserir...</label>' +
			'</div>');
	}else{
	    dropPlano.append(
        	'<div class="form-check form-check-inline">' +
        	'<label class="form-check-label" for="inlineCheckbox1">'+funcionario.planoatendimento.nome+'</label>' +
        	'</div>');
	}
}

//Mostra dados do funcionario ao clicar em alterar
function setDadosAlteraFuncionario(funcionario) {

	$(".FuncionarioNome").val(funcionario.nome);
	$(".FuncionarioWhatsapp").val(funcionario.whatsapp);

	for (let servicoExistente of funcionario.servicos) {
		$(".servico" + servicoExistente.id_servico).prop("checked", true);
		let servico = new Object();
		servico.id_servico = servicoExistente.id_servico;
		arrayServico.push(servico);
		console.log(arrayServico);
	}

	$("#selectPlano option").each(function(){
	console.log("each");
	    if(!funcionario.planoatendimento){
	            if($(this).val() == 1){
                    console.log("funcionario sem plano");
                    $(this).attr('selected', true);
                }
	    }else{
	         if($(this).val() == funcionario.planoatendimento.id_plano){
        	      console.log("selected");
                  $(this).attr('selected', true);
             }
	    }
	})

	//for (let horarioExistente of funcionario.horarios) {
	//	$(".horario" + horarioExistente.id_horario).prop("checked", true);
	//	let horario = new Object();
	//	horario.id_horario = horarioExistente.id_horario;
	//	arrayHorario.push(horario);
	//	console.log(arrayHorario);
	//}
}

//Busca funcionario pelo id, chamado para alterar funcionario
function getByIdFuncionario(id) {
	let URL_GET_FUN_BY_ID = "/funcionarios/" + id;
	fetchGet(URL_GET_FUN_BY_ID, setDadosAlteraFuncionario);
}

//Coleta dados do Modal Funcionario (cadastro) e grava no banco de dados
function addfuncionario() {

	let nome = $(".FuncionarioNome").val();
	let whatsapp = $(".FuncionarioWhatsapp").val();
	let plano = $("#selectPlano").val();
	console.log("plano selecionado");
	console.log(plano);

    if(validarFuncionario(nome, whatsapp)){
        let funcionario = {
            "nome": nome,
            "whatsapp": whatsapp,
            "empresa": {
                "id_empresa": dadosempresa.id_empresa
            },
            "servicos": arrayServico,
            "planoatendimento": {
                "id_plano": plano
            }
            //"horarios": arrayHorario,
        }

        let url = "/funcionarios/save";
        fetchPost(url, exibirFuncionarios, funcionario);

        arrayServico = [];
        //arrayHorario = [];

        $("#ModalFuncionario").modal('hide');

    }else{
        alert("Preencha todos os Campos")
    }

}
function validarFuncionario(nome, whatsapp){
    if(nome != "" && whatsapp != ""){
        return true;
    }else{
        return false;
    }
}

//Deleta um funcionario
function deletefuncionario(id_funcionario) {
	let url = "/funcionarios/delete/" + id_funcionario;
	fetchDel(url, exibirFuncionarios);
}

//Atualiza o funcionario
function updatefuncionario(id) {

	let nome = $(".FuncionarioNome").val();
	let whatsapp = $(".FuncionarioWhatsapp").val();
	let plano = $("#selectPlano").val();

    if(validarFuncionario(nome, whatsapp)){
        let funcionario = {
            "id_funcionario": id,
            "nome": nome,
            "whatsapp": whatsapp,
            "empresa": {
                "id_empresa": dadosempresa.id_empresa
            },
            "servicos": arrayServico,
            "planoatendimento": {
                "id_plano": plano
            }
            //"horarios": arrayHorario
        }

        let url = "/funcionarios/update/" + id;
        fetchPut(url, exibirFuncionarios, funcionario);

        arrayServico = [];
        //arrayHorario = [];

        $("#ModalFuncionario").modal('hide');

    }else{
        alert("Preencha todos os Campos")
    }
}

//Puxa todos os serviços cadastrado na empresa
function exibirServicosToFuncionario() {
	let url = "/get/servicos/empresa/" + dadosempresa.id_empresa;
	fetchGet(url, viewServicos);
}

//Puxa todos os horarios cadastrados na empresa
function exibirPlanoToFuncionario() {
	let url = "/planoatendimento/empresa/" + dadosempresa.id_empresa;
	fetchGet(url, viewPlanos);
}

function salvarImagem(file, id_funcionario) {

	const nome = file.name;
	const contentType = file.type;
	const contentLength = file.size;

	let image = {
		"id_imagem": id_funcionario,
		"nome": nome,
		"contentType": contentType,
		"contentLength": contentLength,
		"empresanome": dadosempresa.link,
		"tipoImagem": "funcionario"
	}

	console.log(image);

	let url = "/uploads/imagens/funcionario";
	fetchPostImage(url, image, file);
}