import { fetchGet } from "./api.js";
import { fetchPost } from "./api.js";
import { fetchDel } from "./api.js";
import { fetchPut } from "./api.js";
import { dadosempresa } from "./empresa.js";

let div_main = $(".main");

//alterar conforme entidade horario
export function exibirHorarios() {
	let url = "/horarios/empresa/" + dadosempresa.id_empresa;
	fetchGet(url, htmlMostraHorarios);
}

$('.addhorario').on("click", function() {
	addhorario();
})

function htmlMostraHorarios(horarios) {
	
	div_main.empty();
	div_main.append('<br><div class="card"><div class="card-header d-flex justify-content-between align-items-center"><div><i class="fa-solid fa-clock"></i> Horários</div> ' +
		'<button class="btn btn-light" type="button" data-bs-toggle="modal" data-bs-target="#ModalNovoHorario"' +
		'	aria-controls="collapseNovoServico" aria-expanded="false"><i class="fa-solid fa-plus"></i></button></div>' +
		'<ul class="list-group list-group-flush listhorario">');

	let listhorario = $(".listhorario");

	for (var horario of horarios) {

		listhorario.append('<li class="list-group-item">' +
			'<div class="row">' +
			'<div class="col">' +

			'<h5>' + horario.hora + '</h5>' +
			//'Descrição: ' + servico.descricao +
			//'<br>Valor do serviço: R$ ' + servico.preco +
			//'<br>Tempo estimado: ' + servico.tempoServico + '<br><br>' +
			'</div>' +
			'</div>' +
			'<div class="row text-end">' +
			'<div class="col">' +

			'<button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#ModalAlteraHorario' + horario.id_horario + '">Alterar</button><span> </span>' +
			'<button type="button" id="' + horario.id_horario + '" class="btn btn-danger deletebtn" data-bs-toggle="modal" data-bs-target="#DeleteModal">Apagar</button>' +
			'</div></div></li></ul></div>');

		listhorario.append('<div class="modal fade" id="ModalAlteraHorario' + horario.id_horario + '" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">'+
		'<div class="modal-dialog modal-dialog-centered">'+
		'<div class="modal-content">'+
		'<div class="modal-header">'+
		'<h1 class="modal-title fs-5" id="exampleModalLabel">Alterar Horário</h1>'+
		'<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
		'</div>'+
		'<div class="modal-body">'+

			'<div class="col-auto">' +
			'<label for="hora" class="form-label">Hora (Ex.: 30min -> 00:30)</label>' +
			'<input type="text" id="hora" class="form-control maskHora updateHora' + horario.id_horario + '" value="' + horario.hora + '">' +
			'</div>' +
			'<br>' +

			'</div>'+
			
			'<div class="modal-footer">'+
			'<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>'+
			'<button type="button" id="' + horario.id_horario + '" class="btn btn-primary updatebtn">Salvar Alterações</button>'+
			'</div></div></div></div>');

		}

	$('.maskHora').mask("99:99");
	$('.deletebtn').off();
	$('.magic').off();
	$('.updatebtn').off();
	
	$('.deletebtn').on("click", function() {
		$('.delspan').empty();
		$('.delspan').append("Horário?");
		$('.magic').attr('id', this.id);
	})

	$('.magic').on("click", function() {
		deletehorario(this.id);
	})

	$('.updatebtn').on("click", function() {
		updatehorario(this.id);
	})
}

function addhorario() {

	let hora = $(".newHora").val();

    if(validarCampos(hora)){
        let horario = {
            "hora": hora,
            "empresa": {
                "id_empresa": dadosempresa.id_empresa
            }
        }


	let url = "/horarios/save";
	fetchPost(url, exibirHorarios, horario);

    $("#ModalNovoHorario").modal('hide');

    }else{
        alert("Preencha todos os Campos Corretamente!")
    }
}

function validarCampos(hora){
    if(hora != "" && hora.length == 5){
        return true;
    }else{
        return false;
    }
}

function deletehorario(id_horario) {
	let url = "/horarios/delete/" + id_horario;
	fetchDel(url, exibirHorarios);
}

function updatehorario(id) {

	let hora = $(".updateHora" + id).val();

    if(validarCampos(hora)){
        let horario = {
            "id_horario": id,
            "hora": hora,
            "empresa": {
                "id_empresa": dadosempresa.id_empresa
            }
        }

        let url = "/horarios/update/" + id;
        fetchPut(url, exibirHorarios, horario);

        $("#ModalAlteraHorario"+id).modal('hide');
    }else{
       alert("Preencha todos os Campos")
    }

}