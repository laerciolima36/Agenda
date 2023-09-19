import { fetchGet } from "./api.js";
import { fetchPut } from "./api.js";
import { fetchPostImageEmpresa } from "./api.js";
import { exibirDashboard } from "./dashboard.js";


export var dadosempresa;
let div_main = $(".main");
var linkcheck;

export function exibirEmpresa() {
	htmlEmpresa(dadosempresa);
}

export function setDadosEmpresa() {
	let url = "/empresa/usuario/" + userid;
	fetchGet(url, setEmpresa);
}

function updateDadosEmpresa(dados) {
	dadosempresa = dados;
	exibirEmpresa();
}


function setEmpresa(dados) {
	dadosempresa = dados;
	console.log('Dados Empresa');
	console.log(dadosempresa);
	exibirDashboard();
}

function htmlEmpresa(dadosempresa) {

	div_main.empty();
	div_main.append('<br><div class="card"><div class="card-header d-flex justify-content-between"><div><i class="fa-solid fa-building"></i> Dados da Minha Empresa</div><i class="fa-solid fa-pen-to-square btn-editar"></i></div><div class="card-body">' +
		'<h5 class="card-title">' + dadosempresa.nome + '</h5>' +
		'<p class="card-text lh-sm">Contato: ' + dadosempresa.contato + '</p>' +
		'<p class="card-text lh-sm">Endereço: ' + dadosempresa.endereco.logradouro + ", " + dadosempresa.endereco.numero + " - " + dadosempresa.endereco.cidade + "/" +
		dadosempresa.endereco.uf +
		' CEP: ' + dadosempresa.endereco.cep +
		'<p class="card-text lh-sm">Instagram: @<a href="http://instagram.com/' + dadosempresa.redesocial + '" target="_blank" rel="noopener noreferrer">' + dadosempresa.redesocial + '</a>' +
		'<p class="card-text lh-sm">Link da sua Empresa: <a href="http://agendaai.com/app/' + dadosempresa.link + '">http://agendaai.com/app/' + dadosempresa.link + '</a></div></div>');


	div_main.append(htmlMostraImagens);
	scriptImage();
	carregarImages(dadosempresa);

	$('.btn-editar').off();
	$('.btn-editar').on("click", function() {
		div_main.empty();
		div_main.append(htmlEditarEmpresa());
		viewDados();
	})
}

function htmlMostraImagens() {

	let htmlImagens = //IMAGENS
		'  <br><div class="card">' +
		'      <div class="card-header">' +
		'     <i class="fa-solid fa-image"></i>' +
		'     Imagens:' +
		'  </div>' +
		' <div class="card-body">' +
		'   <div class="mb-3">' +
		'    <label>Clique na Imagem para Alterar</label><br><br><label class="form-label"><i class="fa-solid fa-image"></i> Logomarca:</label>' +
		'     <label class="picture" for="picture__inputlogo" tabIndex="0">' +
		'	<span class="picture__image logo"></span>' +
		'</label>' +
		'<input type="file" name="picture__input" id="picture__inputlogo">' +
		' </div>' +

		'  <div class="mb-3">' +
		'    <label class="form-label"><i class="fa-solid fa-image"></i> Imagem 1:</label>' +
		'     <label class="picture" for="picture__input1" tabIndex="0">' +
		'	<span class="picture__image1"></span>' +
		'</label>' +
		'<input type="file" name="picture__input" id="picture__input1">' +
		' </div>' +

		' <div class="mb-3">' +
		'    <label class="form-label"><i class="fa-solid fa-image"></i> Imagem 2:</label>' +
		'     <label class="picture" for="picture__input2" tabIndex="0">' +
		'	<span class="picture__image2"></span>' +
		'</label>' +
		'<input type="file" name="picture__input" id="picture__input2">' +
		' </div>' +

		' <div class="mb-3">' +
		'    <label class="form-label"><i class="fa-solid fa-image"></i> Imagem 3:</label>' +
		'     <label class="picture" for="picture__input3" tabIndex="0">' +
		'	<span class="picture__image3"></span>' +
		'</label>' +
		'<input type="file" name="picture__input" id="picture__input3">' +
		' </div>' +

		' <div class="mb-3">' +
		'    <label class="form-label"><i class="fa-solid fa-image"></i> Imagem 4:</label>' +
		'     <label class="picture" for="picture__input4" tabIndex="0">' +
		'	<span class="picture__image4"></span>' +
		'</label>' +
		'<input type="file" name="picture__input" id="picture__input4">' +
		' </div>' +
		' </div></div><br>';

	return htmlImagens;
}

function htmlEditarEmpresa() {

	let html = '<br>' +
		'        <div class="card">' +
		'           <div class="card-header">' +
		'                 <i class="fa-solid fa-magnifying-glass"></i>' +
		'                 Dados da sua Empresa' +
		'             </div>' +
		'            <div class="card-body">' +
		'                <div class="mb-3">' +
		'                     <label class="form-label"><i class="fa-solid fa-building"></i> Nome da Empresa:</label>' +
		'                     <input type="text" class="form-control" id="nome">' +
		'                 </div>' +

		'                 <div class="mb-3">' +
		'                     <label class="form-label"><i class="fa-solid fa-phone"></i> Contato:</label>' +
		'                    <input type="text" class="form-control" id="contato">' +
		'                 </div>' +

		'                 <div class="mb-3">' +
		'                     <label class="form-label"><i class="fab fa-instagram"></i> Instagram:</label>' +
		'                     <input type="text" class="form-control" id="redesocial">' +
		'                 </div>' +

		'                 <div class="mb-3">' +
		'                     <label for="link" class="form-label"><i class="fa-solid fa-link"></i> Link para sua Empresa:</label>' +
		'						<div class="d-flex align-items-top">' +
		'							<div class="col-auto">' +
		'								<span>https://agendaai.com/app/</span>' +
		'							</div>' +
		'							<div class="col">' +
		'                     				<input type="text" class="form-control" id="link" placeholder="seulink" required>' +
		'									<div class="valid-feedback">Link Disponivel!</div>' +
		'									<div class="invalid-feedback">Link Indisponivel!</div>' +
		'                 			</div>' +
		'             			</div>' +
		'						<div class="spinner-border spinner-border-sm visually-hidden" id="load1" role="status">' +
		'						</div>' +
		'					</div>' +
		'					<span style="font-size: 11px;">Esse será o link para divulgar para seus clientes! Não utilize espaços!</span>' +
		'			</div>' +
		'	</div>' +

		'       <br>' +

		'         <div class="card">' +
		'             <div class="card-header">' +
		'                <i class="fa-solid fa-magnifying-glass"></i>' +
		'                 Endereço:' +
		'            </div>' +
		'             <div class="card-body">' +

		'                 <div class="mb-3">' +
		'                     <label class="form-label"><i class="fa-solid fa-location-dot"></i> Endereço:</label>' +
		'                   <input type="text" class="form-control" id="endereco">' +
		'              </div>' +

		'                 <div class="mb-3 col-4">' +
		'                     <label class="form-label"><i class="fa-solid fa-location-dot"></i> Numero:</label>' +
		'                     <input type="text" class="form-control" id="numero">' +
		'              </div>' +

		'                <div class="mb-3">' +
		'                   <label class="form-label"><i class="fa-solid fa-location-dot"></i> Cidade:</label>' +
		' 					<input type="text" class="form-control" id="cidade">' +
		'  				</div>' +

		' 				<div class="mb-3">' +
		' 					<label class="form-label"><i class="fa-solid fa-location-dot"></i> CEP:</label>' +
		'  					<input type="text" class="form-control" id="cep">' +
		'  				</div>' +

		'  				<div class="mb-3">' +
		'  					<label class="form-label"><i class="fa-solid fa-location-dot"></i> UF:</label>' +
		'  					<input type="text" class="form-control" id="uf">' +
		' 				</div>' +

		'  		</div>' +
		'  </div>' +
		'  <br>' +

		'<div class="modal-footer">' +
		'<button type="button" class="btn btn-secondary btn-cancelar me-2">Cancelar</button>' +
		'<button type="button" class="btn btn-primary btn-salvar">Salvar Alterações</button>' +
		'</div>' +

		'<br>';


	return html;
}


function validaLink() {

	var inputLink = $("#link");


	$(function() {
		const uniqueTimeout = (function() {
			var time = 0;

			return function(func, delay) {
				clearTimeout(time);
				time = setTimeout(func, delay);
			}
		})();

		inputLink.on("keyup", function(e) {
			if (e.key == " " || e.code == "Space" || e.keyCode == 32 || e.charCode == 32) {
				this.value = this.value.replace(" ", "");
				alert("O Link não pode conter espaços");
			}
			uniqueTimeout(temporizador, 1800);
		})

	})

	function temporizador() {

		let urllink = "/cadastrar/validalink/";

		if (inputLink.val() != "") {
			$("#load1").removeClass("visually-hidden");
			fetchGet(urllink + inputLink.val(), link);
			console.log("consulta realizada");
		} else {
			inputLink.removeClass("is-valid");
			inputLink.removeClass("is-invalid");
		}
		console.log(urllink + inputLink.val());

	}

	function link(result) {
		$("#load1").addClass("visually-hidden");
		console.log(result);
		if (result) {
			linkDisponivel(result);
		} else {
			linkIndisponivel(result);
		}
	}

	function linkDisponivel(result) {
		linkcheck = result;
		inputLink.addClass("is-valid");
		inputLink.removeClass("is-invalid");
	}

	function linkIndisponivel(result) {
		linkcheck = result;
		inputLink.removeClass("is-valid");
		inputLink.addClass("is-invalid");
	}
}



export function carregarImagensDoBanco() {
	let url = "/empresa/usuario/" + userid;
	fetchGet(url, carregarImages);
}

function carregarImages(dados) {

	let imagens = dados.imagem;

	imagens.forEach(function(imagem) {
		if (imagem.tipoImagem == "logo") {
			const pictureImage = document.querySelector(".logo");
			const img = document.createElement("img");
			img.src = imagem.url + "?" + new Date().getTime();
			img.classList.add("picture__img");

			pictureImage.innerHTML = "";
			pictureImage.appendChild(img);
		}

		if (imagem.tipoImagem == "imagem1") {
			const pictureImage = document.querySelector(".picture__image1");
			const img = document.createElement("img");
			img.src = imagem.url + "?" + new Date().getTime();
			img.classList.add("picture__img");

			pictureImage.innerHTML = "";
			pictureImage.appendChild(img);
		}

		if (imagem.tipoImagem == "imagem2") {
			const pictureImage = document.querySelector(".picture__image2");
			const img = document.createElement("img");
			img.src = imagem.url + "?" + new Date().getTime();
			img.classList.add("picture__img");

			pictureImage.innerHTML = "";
			pictureImage.appendChild(img);
		}

		if (imagem.tipoImagem == "imagem3") {
			const pictureImage = document.querySelector(".picture__image3");
			const img = document.createElement("img");
			img.src = imagem.url + "?" + new Date().getTime();
			img.classList.add("picture__img");

			pictureImage.innerHTML = "";
			pictureImage.appendChild(img);
		}

		if (imagem.tipoImagem == "imagem4") {
			const pictureImage = document.querySelector(".picture__image4");
			const img = document.createElement("img");
			img.src = imagem.url + "?" + new Date().getTime();
			img.classList.add("picture__img");

			pictureImage.innerHTML = "";
			pictureImage.appendChild(img);
		}
	});
}

function viewDados() {
	//EMPRESA
	$("#nome").val(dadosempresa.nome);
	$("#contato").val(dadosempresa.contato);
	$("#redesocial").val(dadosempresa.redesocial);
	$("#link").val(dadosempresa.link);

	//ENDEREÇO
	$("#endereco").val(dadosempresa.endereco.logradouro);
	$("#numero").val(dadosempresa.endereco.numero);
	$("#cidade").val(dadosempresa.endereco.cidade);
	$("#cep").val(dadosempresa.endereco.cep);
	$("#uf").val(dadosempresa.endereco.uf);

	//FOTOS

	//$('.btn-salvar').off();
	$('.btn-salvar').on("click", function() {
		salvarEmpresa();
	})

	//$('.btn-cancelar').off();
	$('.btn-cancelar').on("click", function() {
		htmlEmpresa(dadosempresa);
	})

	validaLink();
}

function salvarEmpresa() {
	validarDados();
}

function validarDados() {
	let idempresa, nome, contato, link, redesocial, idendereco, logradouro, numero, cep, cidade, uf;

	idempresa = dadosempresa.id_empresa;

	nome = $("#nome").val();
	contato = $("#contato").val();
	redesocial = $("#redesocial").val();
	link = $("#link").val();

	idendereco = dadosempresa.endereco.id_endereco;
	logradouro = $("#endereco").val();
	numero = $("#numero").val();
	cidade = $("#cidade").val();
	cep = $("#cep").val();
	uf = $("#uf").val();

	if (semCamposEmBranco(idempresa, nome, contato, link, redesocial, idendereco, logradouro, numero, cep, cidade, uf)) {
		if (linkcheck) {
			preparaJson(idempresa, nome, contato, link, redesocial, idendereco, logradouro, numero, cep, cidade, uf);
		} else {
			alert("Link Indisponivel, tente outro Link!")
		}
	}
}

function semCamposEmBranco(idempresa, nome, contato, link, redesocial, idendereco, logradouro, numero, cep, cidade, uf) {

	if (idempresa != "" && nome != "" && contato != "" && link != "" && redesocial != "" && idendereco != "" && logradouro != "" && numero != "" && cep != "" && cidade != "" && uf != "") {
		return true;
	} else {
		alert("Verifique os Campos em Vazio!");
		return false;
	}
}


function preparaJson(idempresa, nome, contato, link, redesocial, idendereco, logradouro, numero, cep, cidade, uf) {

	let dados = {
		"id_empresa": idempresa,
		"nome": nome,
		"contato": contato,
		"link": link,
		"redesocial": redesocial,
		"endereco": {
			"id_endereco": idendereco,
			"logradouro": logradouro,
			"numero": numero,
			"cep": cep,
			"cidade": cidade,
			"uf": uf
		}
	}

	let url = "/empresa/update/" + dadosempresa.id_empresa;
	fetchPut(url, updateDadosEmpresa, dados);

}

function scriptImage() {

	const pictureImageLogo = document.querySelector(".logo");
	const pictureImage1 = document.querySelector(".picture__image1");
	const pictureImage2 = document.querySelector(".picture__image2");
	const pictureImage3 = document.querySelector(".picture__image3");
	const pictureImage4 = document.querySelector(".picture__image4");
	const pictureImageTxt = "Selecione a imagem";
	pictureImageLogo.innerHTML = pictureImageTxt;
	pictureImage1.innerHTML = pictureImageTxt;
	pictureImage2.innerHTML = pictureImageTxt;
	pictureImage3.innerHTML = pictureImageTxt;
	pictureImage4.innerHTML = pictureImageTxt;

	const inputFilelogo = document.querySelector("#picture__inputlogo");

	inputFilelogo.addEventListener("change", function(e) {
		const inputTarget = e.target;
		const file = inputTarget.files[0];

		createImagem(file, "logo", true);

		if (!file) {
			pictureImageLogo.innerHTML = pictureImageTxt;
		}
	});

	const inputFile1 = document.querySelector("#picture__input1");

	inputFile1.addEventListener("change", function(e) {
		const inputTarget = e.target;
		const file = inputTarget.files[0];

		createImagem(file, "imagem1", false);

		if (!file) {
			pictureImageLogo.innerHTML = pictureImageTxt;
		}
	});

	const inputFile2 = document.querySelector("#picture__input2");

	inputFile2.addEventListener("change", function(e) {
		const inputTarget = e.target;
		const file = inputTarget.files[0];

		createImagem(file, "imagem2", false);

		if (!file) {
			pictureImageLogo.innerHTML = pictureImageTxt;
		}
	});

	const inputFile3 = document.querySelector("#picture__input3");

	inputFile3.addEventListener("change", function(e) {
		const inputTarget = e.target;
		const file = inputTarget.files[0];

		createImagem(file, "imagem3", false);

		if (!file) {
			pictureImageLogo.innerHTML = pictureImageTxt;
		}
	});

	const inputFile4 = document.querySelector("#picture__input4");

	inputFile4.addEventListener("change", function(e) {
		const inputTarget = e.target;
		const file = inputTarget.files[0];

		createImagem(file, "imagem4", false);

		if (!file) {
			pictureImageLogo.innerHTML = pictureImageTxt;
		}
	});

}

function createImagem(file, tipoImagem, logomarca) {

	const nome = file.name;
	const contentType = file.type;
	const contentLength = file.size;
	const islogo = logomarca;

	let image = {
		"nome": nome,
		"contentType": contentType,
		"contentLength": contentLength,
		"tipoImagem": tipoImagem,
		"islogo": islogo,
		"empresa": {
			"id_empresa": dadosempresa.id_empresa
		}
	}

	let url = "/uploads/imagens/empresa/" + dadosempresa.id_empresa;
	fetchPostImageEmpresa(url, image, file);
}