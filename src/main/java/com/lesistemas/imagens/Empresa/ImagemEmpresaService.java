package com.lesistemas.imagens.Empresa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Empresa.EmpresaRepository;


@Service
public class ImagemEmpresaService {
	
	@Autowired
	ImagemEmpresaRepository imagemRepository;
	
	@Autowired
	EmpresaRepository empresaRepository;
	

	public ImagemEmpresa findById(long id) {
		return imagemRepository.findById(id).get();
	}
	
	public ImagemEmpresa bytiposave(ImagemEmpresa imagem, Long idempresa) {
		Empresa empresa = empresaRepository.findById(idempresa).get();
		ImagemEmpresa img = imagemRepository.findByTipoImagemAndEmpresa(imagem.getTipoImagem(), empresa);
		
		if(img == null) {
			imagem.setEmpresa(empresa);
			return imagemRepository.save(imagem);
		}
		
		Long idimg = img.getId_imagem();
		imagem.setId_imagem(idimg);
		
		return imagemRepository.save(imagem);
	}
	
	public ImagemEmpresa save(ImagemEmpresa imagem) {
		return imagemRepository.save(imagem);
	}

}