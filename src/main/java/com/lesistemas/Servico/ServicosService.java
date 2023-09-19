package com.lesistemas.Servico;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lesistemas.imagens.Servico.ImagemServico;

import jakarta.transaction.Transactional;

@Service
public class ServicosService {

	@Autowired
	ServicosRepository servicosRepository;

	public Servico findById(Long id) {
		return servicosRepository.findById(id).get();
	}
	
	public List<Servico> findAll(){
		return servicosRepository.findAll();
	}

	public Servico save(Servico servico) {
		return servicosRepository.save(servico);
	}

	@Transactional
	public void delete(Servico servico) {
		servicosRepository.delete(servico);
	}

	public List<Servico> findByIdEmpresa(Long id) {
		return servicosRepository.findByIdEmpresa(id);
	}

	public void updateIdImagemServico(ImagemServico imagemServico) {
		Servico serv = findById(imagemServico.getId_imagem());
		
		if(serv != null) {
			serv.setImg(imagemServico);
			save(serv);
		}
	}
}