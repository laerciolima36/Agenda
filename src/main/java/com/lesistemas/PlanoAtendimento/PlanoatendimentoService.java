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
}
