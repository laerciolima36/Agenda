package com.lesistemas.Reserva;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Funcionario.Funcionario;

@Service
public class ReservaService {

	@Autowired
	ReservaRepository reservaRepository;

	public List<Reserva> findByDataAndFuncionario(LocalDate localDate, Long id_funcionario) {
		Funcionario funcionario = new Funcionario();
		funcionario.setId_funcionario(id_funcionario);
		
		return reservaRepository.findByDataAndFuncionario(localDate, funcionario);
	}

	public List<Reserva> findByDataAndEmpresa(LocalDate localDate, Long empresa) {
		Empresa emp = new Empresa();
		emp.setId_empresa(empresa);
		
		return reservaRepository.findByDataAndEmpresaOrderByHorario(localDate, emp);
	}

	public Object cancelarReserva(Long id) {
		Reserva reserva = reservaRepository.findById(id).get();
		reserva.setStatus("CANCELADO");
		reservaRepository.save(reserva);
		
		return "Reserva Cancelada";
	}

	public Object finalizarReserva(Long id) {
		Reserva reserva = reservaRepository.findById(id).get();
		reserva.setStatus("FECHADO");
		reservaRepository.save(reserva);
		
		return "Reserva Finalizada";
	}
	
}
