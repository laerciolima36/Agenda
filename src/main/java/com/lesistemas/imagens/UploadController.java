package com.lesistemas.imagens;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lesistemas.imagens.Empresa.ImagemEmpresa;
import com.lesistemas.imagens.Empresa.ImagemEmpresaService;
import com.lesistemas.imagens.Funcionario.ImagemFuncionario;
import com.lesistemas.imagens.Funcionario.ImagemFuncionarioService;
import com.lesistemas.imagens.Servico.ImagemServico;
import com.lesistemas.imagens.Servico.ImagemServicoService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/uploads")
public class UploadController {

	@Autowired
	ImagemEmpresaService imagemService;

	@Autowired
	ImagemFuncionarioService imagemFuncionarioService;

	@Autowired
	ImagemServicoService imagemServicoService;

	@Autowired
	StorageService storageService;

	@PostMapping("/imagens/empresa/{idempresa}")
	public UploadRequestResult newImagemUploadRequest(@PathVariable(value = "idempresa") Long idempresa,
			@RequestBody @Valid ImagemEmpresa imagem) {
		return storageService.generateUploadUrl(imagem, idempresa);
	}

	@PostMapping("/imagens/funcionario")
	public UploadRequestResult funcionarioUploadRequest(@RequestBody @Valid ImagemFuncionario imagem) {
		return storageService.funcionariogenerateUploadUrl(imagem);
	}

	@PostMapping("/imagens/servico")
	public UploadRequestResult servicosUploadRequest(@RequestBody @Valid ImagemServico imagem) {
		return storageService.servicogenerateUploadUrl(imagem);
	}

	@PutMapping("/imagens/update/empresa/{id}")
	public ResponseEntity<Object> updateImageURL(@PathVariable(value = "id") Long id,
			@RequestBody ImagemEmpresa imagem) {
		ImagemEmpresa imagemOptional = imagemService.findById(id);

		if (imagemOptional == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Imagem não Encontrada!");
		}

		imagemOptional.setUrl(imagem.getUrl());
		return ResponseEntity.status(HttpStatus.OK).body(imagemService.save(imagemOptional));
	}

	@PutMapping("/imagens/update/funcionario/{id}")
	public ResponseEntity<Object> updateFuncionarioImageURL(@PathVariable(value = "id") Long id,
			@RequestBody ImagemFuncionario imagem) {
		ImagemFuncionario imagemOptional = imagemFuncionarioService.findById(id);

		if (imagemOptional == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Imagem não Encontrada!");
		}

		imagemOptional.setUrl(imagem.getUrl());

		return ResponseEntity.status(HttpStatus.OK).body(imagemFuncionarioService.save(imagemOptional));
	}

	@PutMapping("/imagens/update/servico/{id}")
	public ResponseEntity<Object> updateServicoImageURL(@PathVariable(value = "id") Long id,
			@RequestBody ImagemServico imagem) {
		ImagemServico imagemOptional = imagemServicoService.findById(id);

		if (imagemOptional == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Imagem não Encontrada!");
		}

		imagemOptional.setUrl(imagem.getUrl());

		return ResponseEntity.status(HttpStatus.OK).body(imagemServicoService.save(imagemOptional));
	}
}