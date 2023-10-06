package com.lesistemas.Dias;

public enum DiasEnum {

    SEGUNDA("Segunda-Feira"), //Dia 0
    TERCA("Terça-Feira"), //Dia 1
    QUARTA("Quarta-Feira"), //Dia 2
    QUINTA("Quinta-Feira"), //Dia3
    SEXTA("Sexta-Feira"), //Dia 4
    SABADO("Sábado"), //Dia 5
    DOMINGO("Domingo"); //Dia 6

    private String descricao;

    DiasEnum(String descricao){
        this.descricao = descricao;
    }

    public String getDescricao(){
        return descricao;
    }
}