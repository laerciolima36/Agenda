package com.lesistemas.imagens.Servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Empresa.EmpresaRepository;
import com.lesistemas.imagens.Empresa.ImagemEmpresa;
import com.lesistemas.imagens.Empresa.ImagemEmpresaRepository;


@Service
public class ImagemServicoService {
	
	@Autowired
	ImagemServicoRepository imagemServicoRepository;
	

	public ImagemServico findById(long id) {
		return imagemServicoRepository.findById(id).get();
	}
	
	public ImagemServico save(ImagemServico imagemServico) {
		return imagemServicoRepository.save(imagemServico);
	}
}