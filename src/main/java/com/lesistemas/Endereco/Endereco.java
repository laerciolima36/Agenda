package com.lesistemas.Endereco;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name="enderecos")
public class Endereco{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_endereco;
	
	private String logradouro;
	private String bairro;
	private String numero;
	private String cep;
	private String cidade;
	private String uf;
	
	
	public Endereco() {}
	
	
	public Endereco(String logradouro, String numero, String cep, String cidade, String uf, String bairro) {
		super();
		this.logradouro = logradouro;
		this.bairro = bairro;
		this.numero = numero;
		this.cep = cep;
		this.cidade = cidade;
		this.uf = uf;
	}
	
	public Long getId_endereco() {
		return id_endereco;
	}
	public void setId_endereco(Long id_endereco) {
		this.id_endereco = id_endereco;
	}
	public String getLogradouro() {
		return logradouro;
	}
	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}
	
	public String getBairro() {
		return bairro;
	}


	public void setBairro(String bairro) {
		this.bairro = bairro;
	}


	public String getCep() {
		return cep;
	}
	public void setCep(String cep) {
		this.cep = cep;
	}
	public String getCidade() {
		return cidade;
	}
	public void setCidade(String cidade) {
		this.cidade = cidade;
	}
	public String getUf() {
		return uf;
	}
	public void setUf(String uf) {
		this.uf = uf;
	}


	@Override
	public String toString() {
		return "Endereco [id_endereco=" + id_endereco + ", logradouro=" + logradouro + ", bairro=" + bairro
				+ ", numero=" + numero + ", cep=" + cep + ", cidade=" + cidade + ", uf=" + uf + "]";
	}

}
