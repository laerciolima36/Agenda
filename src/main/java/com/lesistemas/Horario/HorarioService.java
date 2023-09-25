package com.lesistemas.Horario;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lesistemas.Servico.Servico;

import jakarta.transaction.Transactional;

@Service
public class HorarioService {
	
	@Autowired
	HorarioRepository horarioRepository;

	public Horario findById(Long id) {
		return horarioRepository.findById(id).get();
	}
	
	public Horario save(Horario horario) {
		return horarioRepository.save(horario);
	}

	public List<Horario> findAll(){
		return horarioRepository.findAll();
	}
	
	@Transactional
	public void delete(Horario horario) {
		horarioRepository.NoCheckFk();
		horarioRepository.delete(horario);
		horarioRepository.CheckFk();
	}

	public List<Horario> findByIdEmpresa(Long id) {
		return horarioRepository.findByIdEmpresa(id);
	}

}
