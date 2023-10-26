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
        '<button class="btn btn-outline-dark btn-lg btn-agendar">Agendar Meu Serviço</button>' +

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

	    '<div class="container-fluid justify-content-center p-0 mt-5">'+
        '    <div class="d-flex justify-content-center m-3">'+
        '        <span style="font-family: Courier New, Courier, monospace;" class="fs-2 fw-bold">--- SERVIÇOS ---</span>'+
        '    </div>'+

		'<div class="listServicos mb-5">' +
        '</div>' +
		'</div>'
	);

	let listServicos = $(".listServicos");
	listServicos.empty();

	for (var servico of servicos) {
		listServicos.append('<div class="d-flex justify-content-center m-2">' +
                                     '<div class="rounded shadow w-75 d-flex align-items-center justify-content-center border bg-white border-dark" style="height: 45px;">' +
                                           '<span style="font-family: Courier New, Courier, monospace;" class="fs-5">' + servico.nome + '</span>' +
                                    '</div>' +
                                 '</div>');
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



'<div class="container-fluid justify-content-center p-0">' +
'    <div class="d-flex justify-content-center m-2">' +
'        <div class="bg-white p-3 text-center">' +
'              <span class="fs-5">Endereço:</span><br><br>' +
'              <span class="fs-5">' +
                empresa.endereco.logradouro + ", " + empresa.endereco.numero + " - " + empresa.endereco.cidade + "/" + empresa.endereco.uf +
'              </span><br><br>' +
'              <span class="fs-5">' +
'                Contato: ' + empresa.contato +
'              </span>' +
'        </div>' +
'    </div>' +

'    <div class="d-flex justify-content-center m-2">' +
'        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63574.854622872735!2d-37.38283964910127!3d-5.195149984222221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ba06e074d5ce0b%3A0x46694ffe5df19ebe!2zTW9zc29yw7MsIFJO!5e0!3m2!1spt-BR!2sbr!4v1697040408851!5m2!1spt-BR!2sbr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
'    </div>' +
'</div>' +

		'<div class="text-center m-5">' +
		    '<div class="m-3">' +
		        '<span>Nos Sigam nas nossas Redes Sociais</span>'+
            '</div>' +
		    '<a style="text-decoration: none;" href="https://www.instagram.com/' + empresa.redesocial + '" target="_blank"><i class="fab fa-instagram fa-2x p-2"></i></a>' +
		    '<a style="text-decoration: none;" href="https://api.whatsapp.com/send?phone=55' + tratarWhatsapp(empresa.contato) + '"><i class="fab fa-whatsapp fa-2x p-2"></i></a>' +
		'</div>' +

		'<footer>'+
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