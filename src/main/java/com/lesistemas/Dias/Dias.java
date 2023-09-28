package com.lesistemas.Dias;

import com.lesistemas.Horario.Horario;
import com.lesistemas.PlanoAtendimento.Planoatendimento;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "dias")
public class Dias {

    @Id
    private Long id_dia;

    private DiasEnum dia_semana;

    @ManyToMany()
    @JoinTable(name = "dias_horas", joinColumns = @JoinColumn(name = "fk_dia"), inverseJoinColumns = @JoinColumn(name = "fk_horario"))
    @OrderBy("hora")
    private Set<Horario> horario = new HashSet<>();

    public DiasEnum getDia_semana() {
        return dia_semana;
    }

    public void setDia_semana(DiasEnum dia_semana) {
        this.dia_semana = dia_semana;
    }

}