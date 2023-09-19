package com.lesistemas.Endereco;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService {

	@Autowired
	EnderecoRepository enderecoRepository;
	
	
	public Endereco findById(long id) {
		return enderecoRepository.findById(id).get();
	}
	
	public Endereco save(Endereco endereco) {
		return enderecoRepository.save(endereco);
	}
}
