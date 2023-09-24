package com.lesistemas.imagens;

import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lesistemas.Funcionario.FuncionarioService;
import com.lesistemas.Servico.ServicosService;
import com.lesistemas.imagens.Empresa.ImagemEmpresa;
import com.lesistemas.imagens.Empresa.ImagemEmpresaService;
import com.lesistemas.imagens.Funcionario.ImagemFuncionario;
import com.lesistemas.imagens.Funcionario.ImagemFuncionarioService;
import com.lesistemas.imagens.Servico.ImagemServico;
import com.lesistemas.imagens.Servico.ImagemServicoService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StorageService {

	@Autowired
	CloudStorageProvider cloudStorageProvider;

	@Autowired
	ImagemEmpresaService imagemEmpresaService;

	@Autowired
	ImagemFuncionarioService imagemFuncionarioService;

	@Autowired
	ImagemServicoService imagemServicoService;
	
	@Autowired
	FuncionarioService funcionarioService;
	
	@Autowired
	ServicosService servicosService;

	public UploadRequestResult generateUploadUrl(ImagemEmpresa imagem, Long idempresa) {
		ImagemEmpresa img = imagemEmpresaService.bytiposave(imagem, idempresa);
		URL presignedUploadUrl = cloudStorageProvider.generatePresignedUploadUrl(img);

		return new UploadRequestResult(img.getId_imagem(), presignedUploadUrl.toString(), "empresa");
	}

	public UploadRequestResult funcionariogenerateUploadUrl(ImagemFuncionario imagem) {
		funcionarioService.updateIdImagemFuncionario(imagemFuncionarioService.save(imagem));
		URL presignedUploadUrl = cloudStorageProvider.generatePresignedUploadUrl(imagem);

		return new UploadRequestResult(imagem.getId_imagem(), presignedUploadUrl.toString(), "funcionario");
	}

	public UploadRequestResult servicogenerateUploadUrl(ImagemServico imagem) {
		servicosService.updateIdImagemServico(imagemServicoService.save(imagem));
		URL presignedUploadUrl = cloudStorageProvider.generatePresignedUploadUrl(imagem);

		return new UploadRequestResult(imagem.getId_imagem(), presignedUploadUrl.toString(), "servico");
	}

	public void deleteImageS3(InterfaceImagem imagem){
		cloudStorageProvider.delete(imagem);
	}

}