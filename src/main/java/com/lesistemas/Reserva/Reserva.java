package com.lesistemas.Reserva;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Funcionario.Funcionario;
import com.lesistemas.Horario.Horario;
import com.lesistemas.Servico.Servico;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="reserva")
public class Reserva {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_reserva;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private LocalDate data;
	
	@ManyToOne
	@JoinColumn(name = "fk_empresa")
	private Empresa empresa;
	
	@ManyToOne
	@JoinColumn(name = "fk_funcionario")
	private Funcionario funcionario;
	
	@ManyToOne
	@JoinColumn(name = "fk_servico")
	private Servico servico;
	
	@ManyToOne
	@JoinColumn(name = "fk_horario")
	private Horario horario;
	
	private String nomecliente;
	
	private String zapcliente;
	
	private String status;
	
	public Reserva() {
	}
	
	public Empresa getEmpresa() {
		return empresa;
	}
	
	public Funcionario getFuncionario() {
		return funcionario;
	}
	
	public Servico getServico() {
		return servico;
	}
	
	public Horario getHorario() {
		return horario;
	}
	
	public Long getId_reserva() {
		return id_reserva;
	}
	
	public LocalDate getData() {
		return data;
	}
	
	public void setData(LocalDate data) {
		this.data = data;
	}

	public String getNomecliente() {
		return nomecliente;
	}

	public void setNomecliente(String nomecliente) {
		this.nomecliente = nomecliente;
	}

	public String getZapcliente() {
		return zapcliente;
	}

	public void setZapcliente(String zapcliente) {
		this.zapcliente = zapcliente;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
