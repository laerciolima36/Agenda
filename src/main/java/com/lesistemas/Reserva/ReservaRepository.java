package com.lesistemas.Reserva;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Funcionario.Funcionario;

public interface ReservaRepository extends JpaRepository<Reserva, Long>{
	
	List<Reserva> findByDataAndFuncionario(LocalDate data, Funcionario funcionario);
	List<Reserva> findByDataAndEmpresaOrderByHorario(LocalDate data, Empresa emp);
	

}