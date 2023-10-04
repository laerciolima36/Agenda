package com.lesistemas.PlanoAtendimento;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping(value = "/planoatendimento/add")
    public ResponseEntity<Planoatendimento> addPlano(@RequestBody @Valid Planoatendimento planoatendimento){
        return planoatendimentoService.addPlano(planoatendimento);
    }
}