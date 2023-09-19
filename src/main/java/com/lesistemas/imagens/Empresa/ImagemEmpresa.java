package com.lesistemas.imagens.Empresa;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.imagens.InterfaceImagem;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="imagem")
public class ImagemEmpresa implements InterfaceImagem{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_imagem;	
	
	private String nome;
	
	private String url;
	
	private String contentType;
	
	private Long contentLength;
	
	private Boolean islogo;
	
	private String tipoImagem;
	
	@ManyToOne
	@JoinColumn(name = "id_empresa")
	private Empresa empresa;

	public ImagemEmpresa() {}
	
	public ImagemEmpresa(Long id_imagem, String nome, String url, String contentType, Long contentLength, Boolean islogo) {
		super();
		this.id_imagem = id_imagem;
		this.nome = nome;
		this.url = url;
		this.contentType = contentType;
		this.contentLength = contentLength;
		this.islogo = islogo;
	}

	public String getTipoImagem() {
		return tipoImagem;
	}

	public void setTipoImagem(String tipoImagem) {
		this.tipoImagem = tipoImagem;
	}

	@Override
	public String getPath() {
		return this.empresa.getLink() + "/" + this.tipoImagem;
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


	public Boolean getIslogo() {
		return islogo;
	}


	public void setIslogo(Boolean islogo) {
		this.islogo = islogo;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}
	
}