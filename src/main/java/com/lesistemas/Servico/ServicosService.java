package com.lesistemas.Servico;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<Object> delete(Servico servico) {
		servicosRepository.delete(servico);
		return ResponseEntity.status(HttpStatus.OK).body("Serviço Deletado com Sucesso!");
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

    public Servico updateServico(Long id, Servico servico) {
		Servico ser = this.findById(id);

		if (ser == null) {
			return null;
		}

		ser.setNome(servico.getNome());
		ser.setPreco(servico.getPreco());
		ser.setDescricao(servico.getDescricao());
		ser.setTempoServico(servico.getTempoServico());

		return this.save(ser);

    }
}