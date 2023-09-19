$(document).ready(function() {
	var inputLink = $("#link");
	var inputEmail = $("#username");
	var linkcheck;
	var emailcheck;

	let url = "/cadastrar/validalink/"

	$(function() {
		const uniqueTimeout = (function() {
			var time = 0;

			return function(func, delay) {
				clearTimeout(time);
				time = setTimeout(func, delay);
			}
		})();

		inputLink.on("keyup", function(e) {
			if(e.key == " " || e.code == "Space" || e.keyCode == 32 || e.charCode == 32){
				this.value = this.value.replace(" ", "");
				alert("O Link não pode conter espaços");
			}
			uniqueTimeout(temporizador, 1800);
		})

	})

	function temporizador() {

		if (inputLink.val() != "") {
			$("#load1").removeClass("visually-hidden");
			fetchGet(url + inputLink.val(), link);
			console.log("consulta realizada");
		} else {
			inputLink.removeClass("is-valid");
			inputLink.removeClass("is-invalid");
		}
		console.log(url + inputLink.val());

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


	//-------- valida email


	let urlemail = "/cadastrar/validaemail/"

	inputEmail.on("change", function() {
		$("#load2").removeClass("visually-hidden");
		fetchGet(urlemail + this.value, email);
	})


	function email(result) {
		$("#load2").addClass("visually-hidden");
		if (result) {
			emailDisponivel(result);
		} else {
			emailIndisponivel(result);
		}
	}

	function emailDisponivel(result) {
		emailcheck = result;
		inputEmail.addClass("is-valid");
		inputEmail.removeClass("is-invalid");
	}

	function emailIndisponivel(result) {
		emailcheck = result;
		inputEmail.removeClass("is-valid");
		inputEmail.addClass("is-invalid");
	}

	function fetchGet(url, metodo) {

		fetch(url, {
			method: "GET",
			headers: { "Content-type": "application/json;charset=UTF-8" }
		})
			.then(response => response.json())
			.then(response => {
				metodo(response)
			})
			.catch(erro => console.log("Erro na solicitação GET " + erro));
	}
});