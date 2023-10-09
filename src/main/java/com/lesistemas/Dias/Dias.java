package com.lesistemas.Dias;

import com.lesistemas.Funcionario.Funcionario;
import com.lesistemas.Horario.Horario;
import com.lesistemas.PlanoAtendimento.Planoatendimento;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "dias")
public class Dias {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_dia;

    private DiasEnum dia_semana;

    @ManyToMany(mappedBy = "dias", cascade = CascadeType.ALL)
    private Set<Planoatendimento> planoatendimentos = new HashSet<>();

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "horas_do_dia", joinColumns = @JoinColumn(name = "fk_dia"), inverseJoinColumns = @JoinColumn(name = "fk_horario"))
    @OrderBy("hora")
    private Set<Horario> horario = new HashSet<>();

    public Dias(){}

    public Dias(Long id_dia, DiasEnum dia_semana) {
        this.id_dia = id_dia;
        this.dia_semana = dia_semana;
    }

    public Long getId_dia() {
        return id_dia;
    }

    public void setId_dia(Long id_dia) {
        this.id_dia = id_dia;
    }

    public DiasEnum getDia_semana() {
        return dia_semana;
    }

    public void setDia_semana(DiasEnum dia_semana) {
        this.dia_semana = dia_semana;
    }

    public void setHorario(Set<Horario> horario) {
        this.horario = horario;
    }

    public Set<Horario> getHorario() {
        return horario;
    }
}