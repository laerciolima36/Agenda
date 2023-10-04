package com.lesistemas.Funcionario;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Horario.Horario;
import com.lesistemas.PlanoAtendimento.Planoatendimento;
import com.lesistemas.Reserva.Reserva;
import com.lesistemas.Servico.Servico;
import com.lesistemas.imagens.Funcionario.ImagemFuncionario;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "funcionarios")
public class Funcionario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_funcionario;

	@NotBlank(message = "Nome Obrigatório!")
	private String nome;

	private String whatsapp;
	
	@ManyToOne
	@JoinColumn(name = "id_empresa")
	private Empresa empresa;

	@ManyToOne()
	@JoinColumn(name = "id_plano")
	private Planoatendimento planoatendimento;

	@ManyToMany()
	@JoinTable(name = "funcionarios_servicos", joinColumns = @JoinColumn(name = "fk_funcionario"), inverseJoinColumns = @JoinColumn(name = "fk_servico"))
	private Set<Servico> servicos = new HashSet<>();
	
	@OneToMany(mappedBy = "funcionario")
	private List<Reserva> reserva;
	
	@OneToOne()
	@JoinColumn(name="id_imagem")
	private ImagemFuncionario img;


	public Funcionario() {
	}

	public Funcionario(String whatsapp, String nome) {
		this.nome = nome;
		this.whatsapp = whatsapp;
	}

	public ImagemFuncionario getImg() {
		return img;
	}

	public void setImg(ImagemFuncionario img) {
		this.img = img;
	}

	public Set<Servico> getServicos() {
		return servicos;
	}

	public void setServicos(Set<Servico> servicos) {
		this.servicos = servicos;
	}

	public void setId_funcionario(Long id_funcionario) {
		this.id_funcionario = id_funcionario;
	}

	public Long getId_funcionario() {
		return id_funcionario;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public void setWhatsapp(String whatsapp) {
		this.whatsapp = whatsapp;
	}

	public String getWhatsapp() {
		return whatsapp;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setPlanoatendimento(Planoatendimento planoatendimento) {
		this.planoatendimento = planoatendimento;
	}

	public Planoatendimento getPlanoatendimento(){
		return this.planoatendimento;
	}

	@Override
	public String toString() {
		return "Funcionario [id_funcionario=" + id_funcionario + ", matricula=" + whatsapp + ", nome=" + nome + "]";
	}

}
