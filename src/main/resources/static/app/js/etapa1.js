import { homeCliente } from "./empresa_from_cliente.js";
import { logo } from "./empresa_from_cliente.js";
import { limpaSections } from "./empresa_from_cliente.js";
import { resumoReserva } from "./empresa_from_cliente.js";
import { apiGet } from "../../painel/js/api.js";
import { fetchGet } from "../../painel/js/api.js";
import { carregarEtapa2 } from "./etapa2.js";
import { section1 } from "./empresa_from_cliente.js";
import { section2 } from "./empresa_from_cliente.js";
import { section3 } from "./empresa_from_cliente.js";



export function carregarEtapa1() {
	limpaSections();
	exibirsection1();
	exibirsection2();
	exibirsection3();
	resumoReserva.removerResumo();
}

//SECTION 1
function exibirsection1() {

	section1.append(exibirCabecalho());

	$('.btn-voltar').on("click", function() {
		homeCliente();
	});
}

export function exibirCabecalho(){
    let cabecalho = '<div class="container-fluid bg-dark text-light pt-4 ps-4">' +
                    		'<i class="fa-solid fa-circle-left fa-xl btn-voltar"></i>' +
                    		'</div>' +
                    		'<div class="container-fluid bg-dark text-light text-center pt-4">' +
                    		'<figure class="figure">' +
                    		'<img src="'+logo+'" class="figure-img img-fluid rounded img-thumbnail" alt="..." style="max-width: 60%;">' +
                    		'<figcaption class="figure-caption"><span>'+empresa.nome+'</span></figcaption>' +
                    		'</figure>' +
                    		'</div>';

    return cabecalho;
}


//SECTION 2
function exibirsection2() {
	exibirFuncionarios();
}

function exibirFuncionarios() {
	let url = "/get/funcionarios/empresa/" + empresa.id_empresa;
	fetchGet(url, htmlMostraFuncionarios);
}

function htmlMostraFuncionarios(funcionarios) {

	section2.append(
		'<div class="container-fluid justify-content-center text-center">' +
		'		<br>' +

		'			<div class="">' +
		'				<div class="position-relative m-4">' +
		'					<div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0"' +
		'						aria-valuemax="100" style="height: 1px;">' +
		'						<div class="progress-bar" style="width: 0%"></div>' +
		'					</div>' +
		'					<button type="button"' +
		'						class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"' +
		'						style="width: 2rem; height:2rem;">1</button>' +
		'					<button type="button"' +
		'						class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary rounded-pill"' +
		'						style="width: 2rem; height:2rem;">2</button>' +
		'					<button type="button"' +
		'						class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill"' +
		'						style="width: 2rem; height:2rem;">3</button>' +
		'				</div>' +

		'			</div>' +
		'			<br>' +

		'			<p class="fs-6">Escolha um de nossos profissionais:</p>' +

		'			<ul class="list-group listFuncionarios">' +

		'			</ul>' +

		'			<br>' +

		'		</div>');


	let listFuncionarios = $(".listFuncionarios");
	listFuncionarios.empty();
	let urlImagemFuncionario;

	for (var funcionario of funcionarios) {
		console.log(funcionario);
		if(funcionario.img == null){
			urlImagemFuncionario = "/imagens/avatar.jpeg";
		}else{
			urlImagemFuncionario = funcionario.img.url;
		}

		listFuncionarios.append(
			'<li class="list-group-item btn-funcionario list-group-item-action d-flex justify-content-between" aria-current="true" id="'+funcionario.id_funcionario+'">' + //active usar como class para ativar campo
			'					<div class="d-flex justify-content-start align-items-center"><img' +
			'							src="'+urlImagemFuncionario + "?v=" + new Date().getTime()+'"' +
			'							class="figure-img img-fluid rounded img-thumbnail me-2" alt="..." style="max-width: 20%;">' +
			'						<strong>'+ funcionario.nome +'</strong>' +
			'					</div>' +
			'					<div class="d-flex align-items-center"><i class="fa-solid fa-arrow-right"></i></div>' +
			'				</li>');
	}

	$('.btn-funcionario').on("click", function() {
		var FuncionarioSelecionado = funcionarios.filter(funcionarios => funcionarios.id_funcionario == this.id);


		//-------------------------------------------------------------------
		resumoReserva.id_funcionario = this.id;
		resumoReserva.funcionario = FuncionarioSelecionado[0].nome;
		resumoReserva.exibirResumo();
		//-------------------------------------------------------------------


		carregarEtapa2(FuncionarioSelecionado);
	});
}

//SECTION 3
function exibirsection3() {
	section3.empty();
}