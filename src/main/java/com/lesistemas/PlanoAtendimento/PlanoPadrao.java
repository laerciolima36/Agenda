package com.lesistemas.PlanoAtendimento;

import com.lesistemas.Dias.Dias;
import com.lesistemas.Dias.DiasEnum;
import com.lesistemas.Dias.DiasRepository;
import com.lesistemas.Dias.DiasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class PlanoPadrao {

    @Autowired
    PlanoatendimentoService planoatendimentoService;

    @Autowired
    DiasRepository diasService;

    @EventListener(ApplicationReadyEvent.class)
    public void criaPlanoPadrao(){
        Optional<Planoatendimento> plano = planoatendimentoService.findById(1L);

        plano.ifPresentOrElse(value -> System.out.println("Plano padrão já Existe! " + value.toString()),
                this::salvarPlanoPadrao);
    }

    public void salvarPlanoPadrao(){

        Dias segunda = new Dias(1L, DiasEnum.SEGUNDA);
        Dias terca = new Dias(2L, DiasEnum.TERCA);
        Dias quarta = new Dias(3L, DiasEnum.QUARTA);
        Dias quinta = new Dias(4L, DiasEnum.QUINTA);
        Dias sexta = new Dias(5L, DiasEnum.SEXTA);
        Dias sabado = new Dias(6L, DiasEnum.SABADO);
        Dias domingo = new Dias(7L, DiasEnum.DOMINGO);

        Set<Dias> dias = new HashSet<>();
        dias.add(diasService.save(segunda));
        dias.add(diasService.save(terca));
        dias.add(diasService.save(quarta));
        dias.add(diasService.save(quinta));
        dias.add(diasService.save(sexta));
        dias.add(diasService.save(sabado));
        dias.add(diasService.save(domingo));


        Planoatendimento plan = new Planoatendimento();
        plan.setId_plano(1L);
        plan.setNome("Plano Padrão");
        plan.setDias(dias);
        planoatendimentoService.save(plan);
    }
}
