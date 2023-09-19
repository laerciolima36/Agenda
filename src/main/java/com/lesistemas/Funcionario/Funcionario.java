package com.lesistemas.Funcionario;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Horario.Horario;
import com.lesistemas.Reserva.Reserva;
import com.lesistemas.Servico.Servico;
import com.lesistemas.imagens.Funcionario.ImagemFuncionario;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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

	@ManyToMany()
	@JoinTable(name = "funcionarios_servicos", joinColumns = @JoinColumn(name = "fk_funcionario"), inverseJoinColumns = @JoinColumn(name = "fk_servico"))
	private Set<Servico> servicos = new HashSet<>();
	
	@ManyToMany()
	@JoinTable(name = "funcionarios_horarios", joinColumns = @JoinColumn(name = "fk_funcionario"), inverseJoinColumns = @JoinColumn(name = "fk_horario"))
	@OrderBy("hora")
	private Set<Horario> horarios = new HashSet<>();
	
	@OneToMany(mappedBy = "funcionario")
	private List<Reserva> reserva; //= new ArrayList<>();
	
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
	
	public Set<Horario> getHorarios() {
		return horarios;
	}
	
	public void setHorarios(Set<Horario> horarios) {
		this.horarios = horarios;
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

	@Override
	public String toString() {
		return "Funcionario [id_funcionario=" + id_funcionario + ", matricula=" + whatsapp + ", nome=" + nome + "]";
	}

}
