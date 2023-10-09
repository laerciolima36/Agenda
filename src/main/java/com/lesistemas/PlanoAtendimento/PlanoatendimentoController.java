package com.lesistemas.PlanoAtendimento;

import com.lesistemas.Dias.Dias;
import com.lesistemas.Dias.DiasEnum;
import com.lesistemas.Servico.Servico;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class PlanoatendimentoController {

    @Autowired
    PlanoatendimentoService planoatendimentoService;

    @GetMapping("/planoatendimento")
    public ResponseEntity<List<Planoatendimento>> getAllPlanos(){
        return planoatendimentoService.findAllPlanos();
    }

    @GetMapping(value = "/planoatendimento/{id}")
    public ResponseEntity<Planoatendimento> getPlanoById(@PathVariable("id") Long id) {
        Optional<Planoatendimento> plano = planoatendimentoService.findById(id);
        return plano.map(planoatendimento -> ResponseEntity.status(HttpStatus.OK).body(planoatendimento)).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping(value = "/planoatendimento/empresa/{idEmpresa}")
    public ResponseEntity<List<Planoatendimento>> getPlanoByIdEmpresa(@PathVariable("idEmpresa") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(planoatendimentoService.findByIdEmpresa(id));
    }
    @PostMapping(value = "/planoatendimento/add")
    public ResponseEntity<Planoatendimento> addPlano(@RequestBody @Valid Planoatendimento planoatendimento){
        return planoatendimentoService.addPlano(planoatendimento);
    }

    @DeleteMapping("/planoatendimento/delete/{id}")
    public ResponseEntity<Object> deletePlano(@PathVariable(value = "id") Long id){
        Optional<Planoatendimento> plano = planoatendimentoService.findById(id);

        return plano.map(planoatendimento ->
                planoatendimentoService.delete(planoatendimento))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Plano de atendimento não Encontrado!"));
    }

    @PutMapping("/planoatendimento/update/{id}")
    public ResponseEntity<Object> updatePlano(@PathVariable(value = "id") Long id, @RequestBody Planoatendimento planoatendimento){
        return ResponseEntity.status(HttpStatus.OK).body(planoatendimentoService.updatePlano(id, planoatendimento));
    }
}