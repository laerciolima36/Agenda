import { fetchGet } from "./api.js";
import { fetchPost } from "./api.js";
import { fetchDel } from "./api.js";
import { fetchPut } from "./api.js";
import { liveToast } from "./api.js";
import { dadosempresa } from "./empresa.js";

//variaveis
let div_main = $(".main");
let arrayDias = [];
let arrayHorario = [];
var planoatendimentos;

export function exibirPlanos() {
	const URL_GET_PLANO_BY_EMPRESA = "/planoatendimento/empresa/" + dadosempresa.id_empresa;
	fetchGet(URL_GET_PLANO_BY_EMPRESA, htmlMostraPlanos); //Busca no banco de dados todos os planos para determinada empresa
}

function htmlMostraPlanos(result){

    planoatendimentos = result;
    div_main.empty();

    //zerar os arrays
    arrayDias = [];
    arrayHorario = [];

    //card box topo
    div_main.append('<br><div class="card"><div class="card-header d-flex justify-content-between">Planos de Atendimento' +
    		'<button class="btn btn-light btnPlanoNew" type="button" data-bs-toggle="modal" data-bs-target="#ModalPlano">+</button></div>' +
    		'<ul class="list-group list-group-flush listplanos">');

    let listplanos = $(".listplanos");

    //preenche o card com todos os funcionarios
    	for (var planoatendimento of planoatendimentos) {

    		listplanos.append('<li class="list-group-item">' +

    			'<div class="row justify-content-center text-center">' +

    			'<h5>' + planoatendimento.nome + '</h5>' +
    			'<br>' +
    			'<br>' +
    			viewacordion(planoatendimento) +
                '<br><br>'+
                '<div class="row text-end">' +
                '<div class="col"><br>' +
    			//'<button type="button" class="btn btn-secondary btnPlanoAlterar" id="' + planoatendimento.id_plano + '"data-bs-toggle="modal" data-bs-target="#ModalPlano">Alterar</button><span> </span>' +
    			'<button type="button" id="' + planoatendimento.id_plano + '" class="btn btn-danger deletebtn" data-bs-toggle="modal" data-bs-target="#DeleteModal">Apagar</button>' +
    			'</div></div></li></ul></div>');

    		listplanos.append('<div class="bg-dark bg-gradient" style="height: 3px"></div>');

    	}

    	exibirTodasAsHoras();

    	    $('.deletebtn').off();
        	$('.magic').off();
        	$('.btnPlanoNew').off();

        	//metodo para deletar o funcionario
        	$('.deletebtn').on("click", function() {
        		$('.delspan').empty();
        		$('.delspan').append("Plano?");
        		$('.magic').attr('id', this.id);
        	});

        	//metodo para deletar o plano
        	$('.magic').on("click", function() {
        		deletePlano(this.id);
        	});
}

function viewacordion(planoatendimento){
    let acordion = '<div class="accordion" id="accordionExample">'+

                            '<div class="accordion-item">'+
                              '<h2 class="accordion-header" id="headingOne'+planoatendimento.id_plano+'">'+
                                '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne'+planoatendimento.id_plano+'" aria-expanded="true" aria-controls="collapseOne'+planoatendimento.id_plano+'">'+
                                  'Segunda-Feira'+
                                '</button>'+
                              '</h2>'+
                              '<div id="collapseOne'+planoatendimento.id_plano+'" class="accordion-collapse collapse show" aria-labelledby="headingOne'+planoatendimento.id_plano+'" data-bs-parent="#accordionExampleOne'+planoatendimento.id_plano+'">'+
                                '<div id="'+getIdDia("SEGUNDA", planoatendimento)+'" class="accordion-body horarios segunda'+planoatendimento.id_plano+'">'+


                                '</div>'+
                              '</div>'+
                            '</div>'+

                            '<div class="accordion-item">'+
                              '<h2 class="accordion-header" id="headingTwo'+planoatendimento.id_plano+'">'+
                                '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo'+planoatendimento.id_plano+'" aria-expanded="false" aria-controls="collapseTwo'+planoatendimento.id_plano+'">'+
                                  'Terça-Feira'+
                                '</button>'+
                              '</h2>'+
                              '<div id="collapseTwo'+planoatendimento.id_plano+'" class="accordion-collapse collapse" aria-labelledby="headingTwo'+planoatendimento.id_plano+'" data-bs-parent="#accordionExampleTwo'+planoatendimento.id_plano+'">'+
                                '<div id="'+getIdDia("TERCA", planoatendimento)+'" class="accordion-body horarios terca'+planoatendimento.id_plano+'">'+

                                '</div>'+
                              '</div>'+
                            '</div>'+


                            '<div class="accordion-item">'+
                              '<h2 class="accordion-header" id="headingThree'+planoatendimento.id_plano+'">'+
                                '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree'+planoatendimento.id_plano+'" aria-expanded="false" aria-controls="collapseThree'+planoatendimento.id_plano+'">'+
                                  'Quarta-Feira'+
                                '</button>'+
                              '</h2>'+
                              '<div id="collapseThree'+planoatendimento.id_plano+'" class="accordion-collapse collapse" aria-labelledby="headingThree'+planoatendimento.id_plano+'" data-bs-parent="#accordionExampleThree'+planoatendimento.id_plano+'">'+
                                '<div id="'+getIdDia("QUARTA", planoatendimento)+'" class="accordion-body horarios quarta'+planoatendimento.id_plano+'">'+

                                '</div>'+
                              '</div>'+
                            '</div>'+

                            '<div class="accordion-item">'+
                                '<h2 class="accordion-header" id="headingFour'+planoatendimento.id_plano+'">'+
                                  '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour'+planoatendimento.id_plano+'" aria-expanded="false" aria-controls="collapseFour'+planoatendimento.id_plano+'">'+
                                    'Quinta-Feira'+
                                  '</button>'+
                                '</h2>'+
                                '<div id="collapseFour'+planoatendimento.id_plano+'" class="accordion-collapse collapse" aria-labelledby="headingFour'+planoatendimento.id_plano+'" data-bs-parent="#accordionExampleFour'+planoatendimento.id_plano+'">'+
                                  '<div id="'+getIdDia("QUINTA", planoatendimento)+'" class="accordion-body horarios quinta'+planoatendimento.id_plano+'">'+

                                  '</div>'+
                                '</div>'+
                              '</div>'+

                              '<div class="accordion-item">'+
                                '<h2 class="accordion-header" id="headingFive'+planoatendimento.id_plano+'">'+
                                  '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive'+planoatendimento.id_plano+'" aria-expanded="false" aria-controls="collapseFive'+planoatendimento.id_plano+'">'+
                                    'Sexta-Feira'+
                                  '</button>'+
                                '</h2>'+
                                '<div id="collapseFive'+planoatendimento.id_plano+'" class="accordion-collapse collapse" aria-labelledby="headingFive'+planoatendimento.id_plano+'" data-bs-parent="#accordionExampleFive'+planoatendimento.id_plano+'">'+
                                  '<div id="'+getIdDia("SEXTA", planoatendimento)+'" class="accordion-body horarios sexta'+planoatendimento.id_plano+'">'+

                                  '</div>'+
                                '</div>'+
                              '</div>'+

                              '<div class="accordion-item">'+
                                '<h2 class="accordion-header" id="headingSix'+planoatendimento.id_plano+'">'+
                                  '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix'+planoatendimento.id_plano+'" aria-expanded="false" aria-controls="collapseSix'+planoatendimento.id_plano+'">'+
                                    'Sábado'+
                                  '</button>'+
                                '</h2>'+
                                '<div id="collapseSix'+planoatendimento.id_plano+'" class="accordion-collapse collapse" aria-labelledby="headingSix'+planoatendimento.id_plano+'" data-bs-parent="#accordionExampleSix'+planoatendimento.id_plano+'">'+
                                  '<div id="'+getIdDia("SABADO", planoatendimento)+'" class="accordion-body horarios sabado'+planoatendimento.id_plano+'">'+

                                  '</div>'+
                                '</div>'+
                              '</div>'+

                              '<div class="accordion-item">'+
                                '<h2 class="accordion-header" id="headingSeven'+planoatendimento.id_plano+'">'+
                                  '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven'+planoatendimento.id_plano+'" aria-expanded="false" aria-controls="collapseSeven'+planoatendimento.id_plano+'">'+
                                    'Domingo'+
                                  '</button>'+
                                '</h2>'+
                                '<div id="collapseSeven'+planoatendimento.id_plano+'" class="accordion-collapse collapse" aria-labelledby="headingSeven'+planoatendimento.id_plano+'" data-bs-parent="#accordionExampleSeven'+planoatendimento.id_plano+'">'+
                                  '<div id="'+getIdDia("DOMINGO", planoatendimento)+'" class="accordion-body horarios domingo'+planoatendimento.id_plano+'">'+

                                  '</div>'+
                                '</div>'+
                              '</div>'+

                          '</div><br>';

    return acordion;
}

function getIdDia(diacomparado, planoatendimento){

            let diasdoplano = planoatendimento.dias;

            for(var dia of diasdoplano){

                    if(dia.dia_semana == diacomparado){
                        return dia.id_dia;
                    }
                    if(dia.dia_semana == diacomparado){
                        return dia.id_dia;
                    }
                    if(dia.dia_semana == diacomparado){
                        return dia.id_dia;
                    }
                    if(dia.dia_semana == diacomparado){
                        return dia.id_dia;
                    }
                    if(dia.dia_semana == diacomparado){
                        return dia.id_dia;
                    }
                    if(dia.dia_semana == diacomparado){
                        return dia.id_dia;
                    }
                    if(dia.dia_semana == diacomparado){
                        return dia.id_dia;
                    }
            }
}

function exibirTodasAsHoras(){
    let url = "/horarios/empresa/" + dadosempresa.id_empresa;
	fetchGet(url, htmlTodasAsHoras);
}

function htmlTodasAsHoras(horarios){ //mostra todas as horas cadastradas da empresa em todos os dias e todos os planos
    let divhorarios = $(".horarios");

    for (var hora of horarios) {

     divhorarios.append(
                 '<div class="form-check form-check-inline">'+
                        '<input class="form-check-input checkHorario horario' + hora.id_horario + '" type="checkbox" id="' + hora.id_horario + '" value="option1">'+
                        '<label class="form-check-label" for="inlineCheckbox1">'+hora.hora+'</label>'+
                 '</div>');
     }

     $(".checkHorario").on("click", function() {
     		let ck = this;
     		let idHora = ck.id;
     		console.log("ID HORA: " + idHora);

     		let idDia = $(ck).parent().parent().attr("id");
     		console.log("ID DIA: " + idDia);

            if(idDia == "undefined" || idHora == "undefined"){
                alert('Problemas com o dia e a hora, contate o Suporte');
                ck.checked = false;
            }else{
                   if (ck.checked == true) {
                        addHoraDia(idDia, idHora);
                   }

                   if (ck.checked == false) {
                        removeHoraDia(idDia, idHora);
                   }
            }

     	});

     viewHorariosDoPlano();
}

function addHoraDia(idDia, idHora){
     let url = "/dia/"+idDia+"/hora/"+idHora;
     fetchPost(url, messageAddHoraDia, null);
}

function messageAddHoraDia(){
    liveToast("Hora Adicionada com Sucesso!");
}

function removeHoraDia(idDia, idHora){
     let url = "/dia/"+idDia+"/hora/"+idHora;
     fetchDel(url, messageremoveHoraDia);
}

function messageremoveHoraDia(){
    liveToast("Hora Removida com Sucesso!");
}

function viewHorariosDoPlano(){ //verifica quais horas estão naquele plano e marca

    for(var plano of planoatendimentos){
        let segunda = $(".segunda"+plano.id_plano);
        let terca = $(".terca"+plano.id_plano);
        let quarta = $(".quarta"+plano.id_plano);
        let quinta = $(".quinta"+plano.id_plano);
        let sexta = $(".sexta"+plano.id_plano);
        let sabado = $(".sabado"+plano.id_plano);
        let domingo = $(".domingo"+plano.id_plano);

        let diasdoplano = plano.dias;

        for(var dia of diasdoplano){
                if(dia.dia_semana == "SEGUNDA"){
                    mostrarHora(segunda, dia.horario);
                }
                if(dia.dia_semana == "TERCA"){
                    mostrarHora(terca, dia.horario);
                }
                if(dia.dia_semana == "QUARTA"){
                    mostrarHora(quarta, dia.horario);
                }
                if(dia.dia_semana == "QUINTA"){
                    mostrarHora(quinta, dia.horario);
                }
                if(dia.dia_semana == "SEXTA"){
                    mostrarHora(sexta, dia.horario);
                }
                if(dia.dia_semana == "SABADO"){
                    mostrarHora(sabado, dia.horario);
                }
                if(dia.dia_semana == "DOMINGO"){
                    mostrarHora(domingo, dia.horario);
                }
        }
    }
}

function mostrarHora(dia, horario){

    for(let hora of horario){
        let ckhora = dia.find('#'+hora.id_horario);
        ckhora.prop("checked", true);
    }
}

$('.savePlano').on("click", function() {
	addplano();
});

function addplano() {

	let nome = $(".PlanoNome").val();

    if(validarPlano(nome)){
        let plano = {
            "nome": nome,
            "empresa": {
                "id_empresa": dadosempresa.id_empresa
            },
            "dias": [{ "dia_semana": "SEGUNDA"}, {"dia_semana" : "TERCA"}, {"dia_semana" : "QUARTA"}, {"dia_semana" : "QUINTA"}, {"dia_semana" : "SEXTA"}, {"dia_semana" : "SABADO"}, {"dia_semana" : "DOMINGO"}]
        }

        let url = "/planoatendimento/add";
        fetchPost(url, exibirPlanos, plano);

        $("#ModalPlano").modal('hide');

    }else{
        alert("Preencha todos os Campos")
    }
}

function validarPlano(nome){
    if(nome != ""){
        return true;
    }else{
        return false;
    }
}

function deletePlano(id_plano) {
	let url = "/planoatendimento/delete/" + id_plano;
	fetchDel(url, exibirPlanos);
}