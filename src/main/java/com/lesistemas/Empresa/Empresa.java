package com.lesistemas.Empresa;

import java.time.LocalDate;
import java.util.List;

import com.lesistemas.PlanoAtendimento.Planoatendimento;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lesistemas.Endereco.Endereco;
import com.lesistemas.Funcionario.Funcionario;
import com.lesistemas.Horario.Horario;
import com.lesistemas.Reserva.Reserva;
import com.lesistemas.Servico.Servico;
import com.lesistemas.Usuario.Usuario;
import com.lesistemas.imagens.Empresa.ImagemEmpresa;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "empresas")
public class Empresa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_empresa;

	private String nome;

	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Funcionario> funcionarios;

	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ImagemEmpresa> imagem;

	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Servico> servicos;

	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Planoatendimento> planoatendimentos;

	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Horario> horarios;

	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Reserva> reserva;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "id_endereco")
	private Endereco endereco;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "id")
	private Usuario usuario;

	private String contato; // whatsapp

	private String link;

	private String redesocial;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private LocalDate dataCadastro;

	public Long getIdUsuario() {
		return this.usuario.getId();
	}

	public LocalDate getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	public void setRedesocial(String redesocial) {
		this.redesocial = redesocial;
	}

	public String getRedesocial() {
		return redesocial;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getLink() {
		return link;
	}

	public void setId_empresa(Long id_empresa) {
		this.id_empresa = id_empresa;
	}

	public Long getId_empresa() {
		return id_empresa;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}

	public String getContato() {
		return contato;
	}

	public void setContato(String contato) {
		this.contato = contato;
	}

	public List<ImagemEmpresa> getImagem() {
		return imagem;
	}

	@Override
	public String toString() {
		return "Empresa [id_empresa=" + id_empresa + ", nome=" + nome + ", contato=" + contato + "link=" + link
				+ ", endereco=" + endereco + ", funcionarios=" + funcionarios + "]";
	}

}