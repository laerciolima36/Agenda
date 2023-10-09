package com.lesistemas.PlanoAtendimento;

import com.lesistemas.Dias.Dias;
import com.lesistemas.Dias.DiasEnum;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    public Optional<Planoatendimento> findById(Long id) {
        return planoatendimentoRepository.findById(id);
    }

    public ResponseEntity<Object> delete(Planoatendimento planoatendimento) {
        planoatendimentoRepository.delete(planoatendimento);
        return ResponseEntity.status(HttpStatus.OK).body("Plano de atendimento Deletado com Sucesso!");
    }

    public Object updatePlano(Long id, Planoatendimento planoatendimento) {
        Optional<Planoatendimento> plano = findById(id);


        if(plano.isPresent()){
            return planoatendimentoRepository.save(planoatendimento);
        }else{
            return null;
        }

    }

    public List<Planoatendimento> findByIdEmpresa(Long id) {
        return planoatendimentoRepository.findByEmpresa(id);
    }


    public void save(Planoatendimento plan) {
        planoatendimentoRepository.save(plan);
    }
}
