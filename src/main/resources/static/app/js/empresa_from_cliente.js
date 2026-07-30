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
	let banner = "";

	for (var imagem of imagens) {
		if (imagem.islogo == true) {
			logo = imagem.url + "?v=" + new Date().getTime();
		} else if (banner == "") {
			banner = imagem.url + "?v=" + new Date().getTime();
		}
	}

	let bannerClass = banner == "" ? "hero-banner hero-banner--fallback" : "hero-banner";
	let bannerStyle = banner == "" ? "" : ' style="background-image: url(\'' + banner + '\');"';

	section1.append(

		'<div class="hero">' +

		'	<div class="' + bannerClass + '"' + bannerStyle + '></div>' +

		'	<div class="hero-avatar-wrap">' +
		'		<img src="' + logo + '" class="hero-avatar" alt="' + empresa.nome + '">' +
		'	</div>' +

		'	<div class="hero-info text-center">' +
		'		<h1 class="hero-name">' + empresa.nome + '</h1>' +
		'		<p class="hero-address"><i class="fa-solid fa-location-dot"></i> ' +
		empresa.endereco.cidade + "/" + empresa.endereco.uf +
		'		</p>' +
		'	</div>' +

		'	<div class="hero-cta text-center">' +
		'		<button type="button" class="btn btn-agendar">Agendar Meu Serviço <i class="fa-solid fa-calendar-check"></i></button>' +
		'	</div>' +
		'</div>');

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

		'<div class="servicos-home">' +
		'	<div class="servicos-home-header text-center">' +
		'		<span class="servicos-home-eyebrow">Nossos Serviços</span>' +
		'		<h2 class="servicos-home-title">O que temos pra você</h2>' +
		'	</div>' +
		'	<div class="listServicos">' +
		'	</div>' +
		'</div>'
	);

	let listServicos = $(".listServicos");
	listServicos.empty();

	for (var servico of servicos) {
		let urlImagemServico = servico.img == null ? "/imagens/avatar.jpeg" : servico.img.url + "?v=" + new Date().getTime();

		listServicos.append(
			'<div class="service-card">' +
			'	<img src="' + urlImagemServico + '" class="service-card-img" alt="' + servico.nome + '">' +
			'	<div class="service-card-body">' +
			'		<span class="service-card-name">' + servico.nome + '</span>' +
			'		<span class="service-card-price">R$ ' + servico.preco + '</span>' +
			'	</div>' +
			'</div>'
		);
	}
}


//SECTION 3
function exibirSection3() {

	section3.append(

		'<div class="container-fluid bg-dark justify-content-center text-center">' +

		'<div class="imagens">' +
		//imagens
		'</div>' +

		'</div>' +

		'<footer class="bg-dark text-light text-center">' +
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
		'<a class="social-link" href="https://www.instagram.com/' + empresa.redesocial + '" target="_blank"><i class="fab fa-instagram fa-2x p-2"></i></a>' +
		'<a class="social-link" href="https://api.whatsapp.com/send?phone=55' + tratarWhatsapp(empresa.contato) + '" target="_blank"><i class="fab fa-whatsapp fa-2x p-2"></i></a>' +
		'</div>' +

		'</div>' +
		'</div>' +

		'<div class="footer-copyright">' +
		'	&copy 2023 Copyright: <a href="#">Agenda Aí</a>' +
		'</div>' +
		'</footer >');

	let imagens = $(".imagens");
	imagens.empty();

	let linhas = empresa.imagem.length / 2;
	console.log("linhas: " + linhas);

	for (var i = 0; i < linhas; i++) {
		imagens.append('<div class="row justify-content-around p-3 linha' + i + '">' +
			'</div>');
	}

	let add = 0;
	let controle = 0;

	for (var imagem of empresa.imagem) {
		let linha = $(".linha" + controle);

		if (imagem.islogo != true) {
			linha.append('<div class="col">' +
				'<img src="' + imagem.url + "?v=" + new Date().getTime() + '" class="img-thumbnail" alt="">' +
				'</div>');
			add++;
		}

		if (add == 2) {
			controle++;
			add = 0;
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