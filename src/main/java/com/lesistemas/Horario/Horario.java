package com.lesistemas.Horario;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.lesistemas.Dias.Dias;
import com.lesistemas.PlanoAtendimento.Planoatendimento;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Funcionario.Funcionario;
import com.lesistemas.Reserva.Reserva;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="horario")
public class Horario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_horario;
	
	@JsonFormat(pattern = "HH:mm")
	@DateTimeFormat(pattern = "HH:mm")
	private LocalTime hora;
	
	@OneToMany(mappedBy = "horario")
	private List<Reserva> reserva;

	@ManyToMany(mappedBy = "horario")
	private Set<Dias> dias = new HashSet<>();
	
	@ManyToOne
	@JoinColumn(name = "id_empresa")
	private Empresa empresa;
	
	public Horario() {
		
	}
	
	public Long getId_horario() {
		return id_horario;
	}
	
	public void setId_horario(Long id_horario) {
		this.id_horario = id_horario;
	}
	
	public LocalTime getHora() {
		return hora;
	}
	
	public void setHora(LocalTime hora) {
		this.hora = hora;
	}
	
	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}
}
