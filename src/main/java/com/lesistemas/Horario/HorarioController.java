package com.lesistemas.Horario;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.lesistemas.Servico.Servico;


@RestController
public class HorarioController {
	
	@Autowired
	HorarioService horarioService;
	
	@GetMapping(value = "/horarios/{id}")
	public ResponseEntity<Horario> getHorarioById(@PathVariable("id") Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(horarioService.findById(id));
	}
	
	@GetMapping(value = "/horarios/empresa/{idEmpresa}")
	public ResponseEntity<List<Horario>> getHorarioByIdEmpresa(@PathVariable("idEmpresa") Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(horarioService.findByIdEmpresa(id));
	}
	
	@PostMapping(value = "/horarios/save")
	public ResponseEntity<Horario> saveHorario(@RequestBody Horario horario) {
		return ResponseEntity.status(HttpStatus.CREATED).body(horarioService.save(horario));
	}
	
    @DeleteMapping("/horarios/delete/{id}")
    public ResponseEntity<Object> deleteHorario(@PathVariable(value = "id") Long id){
        Horario HorarioOptional = horarioService.findById(id);
        if (HorarioOptional == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Horário não Encontrado!");
        }
        horarioService.delete(HorarioOptional);
        
        return ResponseEntity.status(HttpStatus.OK).body("Horário Deletado com Sucesso!");
    }

    @PutMapping("/horarios/update/{id}")
    public ResponseEntity<Object> updateHorario(@PathVariable(value = "id") Long id, @RequestBody Horario horario){
    	Horario HorarioOptional = horarioService.findById(id);
    	
    	if (HorarioOptional == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Horário não Encontrado!");
        }
    	
        return ResponseEntity.status(HttpStatus.OK).body(horarioService.save(horario));
    }
}
