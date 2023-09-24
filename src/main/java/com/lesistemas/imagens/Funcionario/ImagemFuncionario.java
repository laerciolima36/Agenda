package com.lesistemas.imagens.Funcionario;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lesistemas.imagens.InterfaceImagem;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name="imagem_funcionario")
public class ImagemFuncionario implements InterfaceImagem{

	@Id
	private Long id_imagem;	
	
	private String nome;
	
	private String url;
	
	private String contentType;
	
	private Long contentLength;
	
	private String tipoImagem;
	
	private String empresanome;
	
	public ImagemFuncionario() {}
	
	public ImagemFuncionario(Long id_imagem, String nome, String url, String contentType, Long contentLength, String empresanome) {
		super();
		this.id_imagem = id_imagem;
		this.nome = nome;
		this.url = url;
		this.contentType = contentType;
		this.contentLength = contentLength;
		this.empresanome = empresanome;
	}
	
	public String getEmpresanome() {
		return empresanome;
	}

	public void setEmpresanome(String empresanome) {
		this.empresanome = empresanome;
	}

	public String getTipoImagem() {
		return tipoImagem;
	}

	public void setTipoImagem(String tipoImagem) {
		this.tipoImagem = tipoImagem;
	}

	@Override
	public String getPath() {
		return this.empresanome + "/" + "funcionarios/" + this.id_imagem;
	}
	
	public Long getId_imagem() {
		return id_imagem;
	}

	public void setId_imagem(Long id_imagem) {
		this.id_imagem = id_imagem;
	}


	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	@Override
	public String getUrl() {
		return url;
	}


	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String getContentType() {
		return contentType;
	}


	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	@Override
	public Long getContentLength() {
		return contentLength;
	}


	public void setContentLength(Long contentLength) {
		this.contentLength = contentLength;
	}
	
}