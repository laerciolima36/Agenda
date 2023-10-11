import { fetchGet } from "../../painel/js/api.js";
import { carregarEtapa1 } from "./etapa1.js";
import { DadosReserva } from "./DadosReserva.js";

export let resumoReserva = new DadosReserva();
export let section1 = $(".section-1");
export let section2 = $(".section-2");
export let section3 = $(".section-3");
export let logo = "";
resumoReserva.id_empresa = empresa.id_empresa;


$(document).ready(function() {
	homeCliente();
});

export function homeCliente() {
	limpaSections();
	exibirSection1();
	exibirSection2();
	exibirSection3();
}


//SECTION 1
function exibirSection1() {

	let imagens = empresa.imagem;
	logo;

	for (var imagem of imagens) {
		if (imagem.islogo == true) {
			logo = imagem.url + "?" + new Date().getTime();
		}
	}
	
	section1.append(

		'<div class="container p-0 justify-content-center text-center">' +
		'	<img src="' + logo + '" class="img-fluid" alt="..."  style="max-height: 650px">' +
		'</div><br>'+

        '<div class="container text-center">' +
        '<button class="btn btn-outline-dark btn-lg">Agendar Meu Serviço</button>' +

        //'<div class="box-pulse">' +
        //'	<a class="botao-pulse btn-agendar">Agenda Aí</a>' +
        //'</div>'+
        '</div>'
		);

	$('.btn-agendar').on("click", function() {
		carregarEtapa1();
	});
}


//SECTION 2
function exibirSection2() {
	exibirServicos();
}

function exibirServicos() {
	let url = "/get/servicos/empresa/" + empresa.id_empresa;
	fetchGet(url, htmlMostraServicos);
}

function htmlMostraServicos(servicos) {

	section2.append(

		'<div class="container-fluid justify-content-center">' +
		'<br>' +

		'<div class="shadow-sm p-3 mb-5 bg-body-tertiary rounded">'+
		'<i class="fa-solid fa-bars fa-lg"></i>'+



		'<p class="fs-3">Serviços</p>' +
		'<div class="row-auto text-center listServicos">' +
        '</div>' +
		'</div>' +
		'<br>' +
		'</div>'
	);

	let listServicos = $(".listServicos");
	listServicos.empty();

	for (var servico of servicos) {
		listServicos.append('<span class="fs-5 fw-semibold"><i class="fa-solid fa-check pe-1"></i>' + servico.nome + '</span><br>');
	}
}


//SECTION 3
function exibirSection3() {

	section3.append(

	'<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">' +
      '<div class="carousel-inner imagens">' +
        '<div class="carousel-item active">' +
          '<img src="https://agendaimgbucket.s3.sa-east-1.amazonaws.com/laercio/imagem1" class="d-block w-100" alt="...">' +
        '</div>' +
      '</div>' +
      '<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">' +
        '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
        '<span class="visually-hidden">Previous</span>' +
      '</button>' +
      '<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">' +
        '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
        '<span class="visually-hidden">Next</span>' +
      '</button>' +
    '</div>' +



		'<footer class="text-center">' +
		'<div class="container-fluid py-3">' +

		'<div class="row">' +
		'<p><span>' +empresa.endereco.logradouro + ", " + empresa.endereco.numero + " - " + empresa.endereco.cidade + "/" + empresa.endereco.uf +
		'</span>' +
		'</p>' +
		'<p><span>Contato: ' + empresa.contato +
		'</span>' +
		'</p>' +
		'</div>' +

		'<div class="row-flex justify-content-center">' +
		'<a style="text-decoration: none; color: white;" href="https://www.instagram.com/' + empresa.redesocial + '" target="_blank"<i class="fab fa-instagram fa-2x p-2"></i>' +
		'<a style="text-decoration: none; color: white;" href="https://api.whatsapp.com/send?phone=55' + tratarWhatsapp(empresa.contato) + '"<i class="fab fa-whatsapp fa-2x p-2"></i></a>' +
		'</div>' +

		'</div>' +
		'</div>' +

		'<div class="text-center" style="background-color: #333; padding: 20px;">' +
		'<a href="/"><img style="max-height: 35px" src="/imagens/logomarca-v1-iconame.png" alt="logo" class="img-fluid"></a>' +
		//'	&copy 2023 Copyright: <a href="#">Agenda Aí</a>' +
		'</div>' +
		'</footer >');

	let divimagens = $(".imagens");
	divimagens.empty();
    let first = 1;
	for (var imagem of empresa.imagem) {

        if (imagem.islogo != true && first > 1) {
            divimagens.append( '<div class="carousel-item">' +
                                    '<img src="' + imagem.url + "?" + new Date().getTime() + '" class="d-block w-100" alt="...">' +
                               '</div>' +'<div class="col">');
        }

		if (imagem.islogo != true && first == 1) {
			divimagens.append( '<div class="carousel-item active">' +
                                   '<img src="' + imagem.url + "?" + new Date().getTime() + '" class="d-block w-100" alt="...">' +
                               '</div>' +'<div class="col">');
            first = 2;
		}


	}
}

function tratarWhatsapp(whatsapp){
	let result = whatsapp.replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").replaceAll("-","");
	return result;
}

export function limpaSections(){
	section1.empty();
	section2.empty();
	section3.empty();
}