package com.lesistemas.PlanoAtendimento;

import com.lesistemas.Servico.Servico;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return ResponseEntity.status(HttpStatus.OK).body(planoatendimentoService.findById(id));
    }
    @PostMapping(value = "/planoatendimento/add")
    public ResponseEntity<Planoatendimento> addPlano(@RequestBody @Valid Planoatendimento planoatendimento){
        return planoatendimentoService.addPlano(planoatendimento);
    }

    @DeleteMapping("/planoatendimento/delete/{id}")
    public ResponseEntity<Object> deletePlano(@PathVariable(value = "id") Long id){
        Planoatendimento planoatendimento = planoatendimentoService.findById(id);

        if (planoatendimento == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Plano de atendimento não Encontrado!");
        }

        return planoatendimentoService.delete(planoatendimento);
    }

    @PutMapping("/planoatendimento/update/{id}")
    public ResponseEntity<Object> updatePlano(@PathVariable(value = "id") Long id, @RequestBody Planoatendimento planoatendimento){
        return ResponseEntity.status(HttpStatus.OK).body(planoatendimentoService.updatePlano(id, planoatendimento));
    }
}