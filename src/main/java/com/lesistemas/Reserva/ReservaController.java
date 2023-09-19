package com.lesistemas.Reserva;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ReservaController {

	@Autowired
	ReservaRepository reservaRepository;

	@Autowired
	ReservaService reservaService;

	@GetMapping(value = "/reserva/all")
	public ResponseEntity<List<Reserva>> getAllReservas() {
		return ResponseEntity.status(HttpStatus.OK).body(reservaRepository.findAll());
	}

	// exemplo = /reserva?data=dd/mm/yyyy
	@GetMapping(value = "/get/reserva")
	public ResponseEntity<List<Reserva>> getAllReservasByDataAndFuncionario(
			@RequestParam("data") @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate localDate, @RequestParam Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(reservaService.findByDataAndFuncionario(localDate, id));
	}

	@GetMapping(value = "/reserva")
	public ResponseEntity<List<Reserva>> getAllReservasByDataAndEmpresa(
			@RequestParam("data") @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate localDate,
			@RequestParam Long empresa) {
		return ResponseEntity.status(HttpStatus.OK).body(reservaService.findByDataAndEmpresa(localDate, empresa));
	}

	@PostMapping(value = "/post/reserva/save")
	public ResponseEntity<Object> saveReserva(@RequestBody Reserva reserva) {
		try {
			reservaRepository.save(reserva);
			return ResponseEntity.status(HttpStatus.CREATED).body(reserva.getId_reserva());
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(reserva.getId_reserva());
		}
	}

	@PutMapping("/reserva/cancelada/{id}")
	public ResponseEntity<Object> cancelarReserva(@PathVariable(value = "id") Long id) {
		return reservaService.cancelarReserva(id);
	}
	
	@PutMapping("/reserva/finalizada/{id}")
	public ResponseEntity<Object> finalizarReserva(@PathVariable(value = "id") Long id) {
		return reservaService.finalizarReserva(id);
	}
}
