package com.lesistemas.PlanoAtendimento;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanoatendimentoService {

    @Autowired
    PlanoatendimentoRepository planoatendimentoRepository;
    public ResponseEntity<List<Planoatendimento>> findAllPlanos() {
        return ResponseEntity.status(HttpStatus.OK).body(planoatendimentoRepository.findAll());
    }

    @Transactional
    public ResponseEntity<Planoatendimento> addPlano(Planoatendimento planoatendimento) {
        return ResponseEntity.status(HttpStatus.OK).body(planoatendimentoRepository.save(planoatendimento));
    }

    public Planoatendimento findById(Long id) {
        return planoatendimentoRepository.findById(id).get();
    }

    public ResponseEntity<Object> delete(Planoatendimento planoatendimento) {
        planoatendimentoRepository.delete(planoatendimento);
        return ResponseEntity.status(HttpStatus.OK).body("Plano de atendimento Deletado com Sucesso!");
    }

    public Object updatePlano(Long id, Planoatendimento planoatendimento) {
        Planoatendimento plano = findById(id);

        if(plano == null){
            return null;
        }

        return planoatendimentoRepository.save(planoatendimento);

    }
}
