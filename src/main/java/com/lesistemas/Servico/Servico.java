package com.lesistemas.Servico;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Funcionario.Funcionario;
import com.lesistemas.Reserva.Reserva;
import com.lesistemas.imagens.Servico.ImagemServico;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="servicos")
public class Servico {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_servico;
	
	private String nome;
	
	private String preco;
	
	private String descricao;
	
	private String tempoServico;
	
	private String foto;
	
	@ManyToMany(mappedBy = "servicos")
	private Set<Funcionario> funcionarios = new HashSet<>();
	
	@ManyToOne
	@JoinColumn(name = "id_empresa")
	private Empresa empresa;
	
	@OneToMany(mappedBy = "servico")
	private List<Reserva> reserva; //= new ArrayList<>();
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name="id_imagem")
	private ImagemServico img;
	
	public Servico() {}

	
	public void setImg(ImagemServico img) {
		this.img = img;
	}
	
	public ImagemServico getImg() {
		return img;
	}
	
	public Long getId_servico() {
		return id_servico;
	}

	public void setId_servico(Long id_servico) {
		this.id_servico = id_servico;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getPreco() {
		return preco;
	}

	public void setPreco(String preco) {
		this.preco = preco;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getTempoServico() {
		return tempoServico;
	}

	public void setTempoServico(String tempoServico) {
		this.tempoServico = tempoServico;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public void setFuncionario(Set<Funcionario> funcionarios) {
		this.funcionarios = funcionarios;
	}
	
	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}
	
}
