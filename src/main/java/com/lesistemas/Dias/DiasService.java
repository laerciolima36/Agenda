package com.lesistemas.Dias;

import com.lesistemas.Horario.Horario;
import com.lesistemas.Horario.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class DiasService {

    @Autowired
    DiasRepository diasRepository;

    @Autowired
    HorarioService horarioService;

    public Dias horaToDia(Long idDia, Long idHora) {
        Dias dia = diasRepository.findById(idDia).get();
        Horario hora = horarioService.findById(idHora);
        Set<Horario> horarioSet = dia.getHorario();

        horarioSet.add(hora);

        dia.setHorario(horarioSet);
        return diasRepository.save(dia);

    }

    public Dias removehoraToDia(Long idDia, Long idHora) {
        Dias dia = diasRepository.findById(idDia).get();
        Horario hora = horarioService.findById(idHora);
        Set<Horario> horarioSet = dia.getHorario();

        horarioSet.remove(hora);

        dia.setHorario(horarioSet);
        return diasRepository.save(dia);

    }
}
