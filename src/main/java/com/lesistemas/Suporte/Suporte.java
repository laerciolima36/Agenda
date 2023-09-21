package com.lesistemas.Suporte;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="suporte")
public class Suporte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_suporte;

    @NotNull
    private String contato;

    public Suporte(){

    }

    public String getContato() {
        return contato;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    @Override
    public String toString() {
        return this.contato;
    }
}
