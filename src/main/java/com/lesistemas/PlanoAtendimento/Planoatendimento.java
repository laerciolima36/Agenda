package com.lesistemas.PlanoAtendimento;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lesistemas.Dias.Dias;
import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Funcionario.Funcionario;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "plano_atendimento")
public class Planoatendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_plano;

    @Getter
    private String nome;

    @OneToMany(mappedBy = "planoatendimento")
    private Set<Funcionario> funcionarios = new HashSet<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @OrderBy("dia_semana")
    @JoinTable(name = "dias_do_plano", joinColumns = @JoinColumn(name = "fk_plano"), inverseJoinColumns = @JoinColumn(name = "fk_dias"))
    private Set<Dias> dias = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "id_empresa")
    private Empresa empresa;

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

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    @Override
    public String toString() {
        return "Planoatendimento{" +
                "id_plano=" + id_plano +
                ", dias=" + dias +
                '}';
    }
}