package com.lesistemas.whatsapp;


import java.util.Set;


public class Mensagem {
    private Set<String> contatos;
    private String contato;
    private String conteudo;
    
    public Mensagem() {
    	
    }
    
	public Mensagem(Set<String> contatos, String conteudo, String contato) {
		super();
		this.contato = contato;
		this.contatos = contatos;
		this.conteudo = conteudo;
	}

	public Set<String> getContatos() {
		return contatos;
	}

	public void setContatos(Set<String> contatos) {
		this.contatos = contatos;
	}

	public String getConteudo() {
		return conteudo;
	}

	public void setConteudo(String conteudo) {
		this.conteudo = conteudo;
	}

	public String getContato() {
		return contato;
	}

	public void setContato(String contato) {
		this.contato = contato;
	}
	
	
	 
}
