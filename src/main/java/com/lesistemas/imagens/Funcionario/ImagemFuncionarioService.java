package com.lesistemas.imagens.Funcionario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Empresa.EmpresaRepository;
import com.lesistemas.imagens.Empresa.ImagemEmpresa;
import com.lesistemas.imagens.Empresa.ImagemEmpresaRepository;


@Service
public class ImagemFuncionarioService {
	
	@Autowired
	ImagemFuncionarioRepository imagemFuncionarioRepository;
	

	public ImagemFuncionario findById(long id) {
		return imagemFuncionarioRepository.findById(id).get();
	}
	
	public ImagemFuncionario save(ImagemFuncionario imagemFuncionario) {
		return imagemFuncionarioRepository.save(imagemFuncionario);
	}
}