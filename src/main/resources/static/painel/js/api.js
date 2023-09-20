import { carregarImagensDoBanco } from "./empresa.js";
import { dadosempresa } from "./empresa.js";

export function fetchGet(url, metodo) {

	displayLoading();
	fetch(url, {
		method: "GET",
		headers: { "Content-type": "application/json;charset=UTF-8" }
	})
		.then(response => response.json())
		.then(response => {
			hideLoading()
			metodo(response)
		})
		.catch(erro => console.log("Erro na solicitação GET " + erro));
}

export function fetchDel(url, metodo) {

	displayLoading();
	fetch(url, {
		method: "DELETE",
		headers: { "Content-type": "application/json;charset=UTF-8" }
	})
		.then(response => response.text())
		.then(response => {
			hideLoading()
			metodo()
			console.log(response)
		})
		.catch(erro => console.log("Erro na solicitação Delete " + erro));
}

export function fetchPost(url, metodo, dados) {
    displayLoading();

	fetch(url, {
		method: "POST",
		headers: { "Content-type": "application/json;charset=UTF-8" },
		body: JSON.stringify(dados)

	})
		.then(response => response.json())
		.then(response => {
        	hideLoading()
        	metodo(response)
        })
		.catch(erro => console.log("Erro na solicitação POST " + erro));
}

export function fetchPut(url, metodo, dados) {

	fetch(url, {
		method: "PUT",
		headers: { "Content-type": "application/json;charset=UTF-8" },
		body: JSON.stringify(dados)
	})
		.then(response => response.json())
		.then(response => metodo(response))
		.catch(erro => console.log("Erro na solicitação PUT " + erro));
}

export function fetchPostImageEmpresa(url, dados, file) {

	showLoadImage(dados);
	fetch(url, {
		method: "POST",
		headers: { "Content-type": "application/json;charset=UTF-8" },
		body: JSON.stringify(dados)

	})
		.then(response => response.json())
		.then((response) => {
			sendFileToS3(response, file)
		})
		.catch(erro => console.log("Erro na solicitação fetchPostImage " + erro));
}

function sendFileToS3(imagem, file) {

	fetch(imagem.uploadSignedUrl, {
		method: "PUT",
		mode: 'cors',
		headers: { "Content-type": file.type },
		body: file
	})
		.then((response) => {
			saveUrlDBS3(imagem);
			liveToast("Imagem Carregada com Sucesso!");
			console.log(response);
		})
		.catch(erro => {
			liveToast("Erro ao Carregar Imagem!")
			console.log("Erro na solicitação sendFileToS3 " + erro)
		});
}

function saveUrlDBS3(imagem) {

	let urlAssinada = imagem.uploadSignedUrl;
	let urlTratada = tratarUrl(urlAssinada);
	
	let urlDB = {
		"url": urlTratada
	}
	
	if (imagem.tipoimagem == "empresa") {
		let putUrlImage = "/uploads/imagens/update/empresa/" + imagem.imagemId;
		fetchPut(putUrlImage, carregarImagensDoBanco, urlDB);
	}
	
	if (imagem.tipoimagem == "funcionario") {
		let putUrlImage = "/uploads/imagens/update/funcionario/" + imagem.imagemId;
		fetchPut(putUrlImage, vazio, urlDB);
	}
	
	if (imagem.tipoimagem == "servico") {
		let putUrlImage = "/uploads/imagens/update/servico/" + imagem.imagemId;
		fetchPut(putUrlImage, vazio, urlDB);
	}

}

function vazio(){
	console.log("vazio executou");
}

export function fetchPostImage(url, dados, file) {

	//showLoadImage(dados);
	fetch(url, {
		method: "POST",
		headers: { "Content-type": "application/json;charset=UTF-8" },
		body: JSON.stringify(dados)

	})
		.then(response => response.json())
		.then((response) => {
			sendFileToS3(response, file)
		})
		.catch(erro => console.log("Erro na solicitação fetchPostImage " + erro));
}

export function liveToast() {
	const toastLiveExample = document.getElementById('liveToast')
	const toast = new bootstrap.Toast(toastLiveExample)
	toast.show()
}

function tratarUrl(url) {
	let indexFinal = url.indexOf("?", 0);
	let urlTratada = url.substring(0, indexFinal);

	return urlTratada;
}

//LOADING
function spinner() {
	const spinner = '<div class="d-flex justify-content-center">' +
		'<div class="spinner-border" role="status">' +
		'<span class="visually-hidden">Loading...</span>' +
		'</div>' +
		'</div>';

	return spinner;
}

export function showLoadImage(imagem) {
	if (imagem.tipoImagem == "logo") {
		const pictureImage = document.querySelector(".logo");
		pictureImage.innerHTML = "";
		pictureImage.innerHTML = spinner();
	}

	if (imagem.tipoImagem == "imagem1") {
		const pictureImage = document.querySelector(".picture__image1");
		pictureImage.innerHTML = "";
		pictureImage.innerHTML = spinner();
	}

	if (imagem.tipoImagem == "imagem2") {
		const pictureImage = document.querySelector(".picture__image2");
		pictureImage.innerHTML = "";
		pictureImage.innerHTML = spinner();
	}

	if (imagem.tipoImagem == "imagem3") {
		const pictureImage = document.querySelector(".picture__image3");
		pictureImage.innerHTML = "";
		pictureImage.innerHTML = spinner();
	}

	if (imagem.tipoImagem == "imagem4") {
		const pictureImage = document.querySelector(".picture__image4");
		pictureImage.innerHTML = "";
		pictureImage.innerHTML = spinner();
	}
}

// selecting loading div
const loader = document.querySelector("#cloading");

// showing loading
export function displayLoading() {
	loader.classList.add("display");
	// to stop loading after some time
	setTimeout(() => {
		loader.classList.remove("display");
	}, 5000);
}

// hiding loading 
export function hideLoading() {
	loader.classList.remove("display");
}













export function apiGet(url, metodo) {
	$.ajax({
		type: "GET",
		url: url,
		dataType: "JSON",
		success: function(result) {
			metodo(result);
		},
		error: function(e) {
			console.log("ERROR: ", e);
			metodo();
			//resultado = "Erro: " + e;
		}

	});
}

export function apiPost(url, metodo, dados) {

	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: url,
		data: JSON.stringify(dados),
		dataType: "JSON",
		success: function(result) {
			metodo();
			console.log("SUCCESS: ", result);
		},
		error: function(e) {
			console.log("ERROR: ", e);
		},
		done: function(e) {
			console.log("DONE");
		}
	});
}

export function apiDelete(url, metodo) {

	$.ajax({
		type: "DELETE",
		url: url,
		success: function(result) {
			metodo();
			console.log("SUCCESS: ", result);
		},
		error: function(e) {
			console.log("ERROR: ", e);
		},
		done: function(e) {
			console.log("DONE");
		}
	});
}

export function apiUpdate(url, metodo, dados) {

	$.ajax({
		type: "PUT",
		contentType: "application/json",
		url: url,
		data: JSON.stringify(dados),
		dataType: "JSON",
		success: function(result) {
			metodo();
			console.log("SUCCESS: ", result);
		},
		error: function(e) {
			console.log("ERROR: ", e);
		},
		done: function(e) {
			console.log("DONE");
		}
	});
}