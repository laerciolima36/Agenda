package com.lesistemas.PlanoAtendimento;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lesistemas.Dias.Dias;
import com.lesistemas.Funcionario.Funcionario;
import com.lesistemas.Horario.Horario;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "plano_atendimento")
public class Planoatendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_plano;

    @OneToMany(mappedBy = "planoatendimento")
    private Set<Funcionario> funcionarios = new HashSet<>();

    @ManyToMany()
    @OrderBy("dia_semana")
    @JoinTable(name = "dias_do_plano", joinColumns = @JoinColumn(name = "fk_plano"), inverseJoinColumns = @JoinColumn(name = "fk_dias"))
    private Set<Dias> dias = new HashSet<>();

    public Planoatendimento(){}

    public Planoatendimento(Set<Dias> dias) {
        this.dias = dias;
    }

    public Long getId_plano() {
        return id_plano;
    }

    public void setId_plano(Long id_plano) {
        this.id_plano = id_plano;
    }

    public Set<Dias> getDias() {
        return dias;
    }

    public void setDias(Set<Dias> dias) {
        this.dias = dias;
    }

    @Override
    public String toString() {
        return "Planoatendimento{" +
                "id_plano=" + id_plano +
                ", dias=" + dias +
                '}';
    }
}