package com.lesistemas.Suporte;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SuporteController {

    @Autowired
    SuporteRepository suporteRepository;

    @GetMapping("/suporte")
    public String getSuporte(){
        try {
            return suporteRepository.findAll().get(0).toString();
        }catch (IndexOutOfBoundsException e){
            return "Contato de Suporte Não Encontrado!";
        }

    }
}
