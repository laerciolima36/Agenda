package com.lesistemas.Funcionario;


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

import jakarta.validation.Valid;

@RestController
public class FuncionarioController {
	
	@Autowired
	FuncionarioService funcionarioService;
	
	@GetMapping(value = "/funcionarios/{id}")
	public ResponseEntity<Funcionario> getServicoById(@PathVariable("id") Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(funcionarioService.findById(id));
	}
	
	@GetMapping(value = "/get/funcionarios/empresa/{idEmpresa}")
	public ResponseEntity<List<Funcionario>> getFuncionarioByIdEmpresa(@PathVariable("idEmpresa") Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(funcionarioService.findByIdEmpresa(id));
	}
	
	@PostMapping(value = "/funcionarios/save")
	public ResponseEntity<Funcionario> saveFuncionario(@Valid @RequestBody Funcionario funcionario) {
		System.out.println(funcionario);
		return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioService.save(funcionario));
	}
	
    @DeleteMapping("/funcionarios/delete/{id}")
    public ResponseEntity<Object> deleteFuncionario(@PathVariable(value = "id") Long id){
        Funcionario funcionarioOptional = funcionarioService.findById(id);
        if (funcionarioOptional == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não Encontrado!");
        }
        funcionarioService.delete(funcionarioOptional);
        return ResponseEntity.status(HttpStatus.OK).body("Funcionário Deletado com Sucesso!");
    }

    @PutMapping("/funcionarios/update/{id}")
    public ResponseEntity<Object> updateFuncionario(@PathVariable(value = "id") Long id, @RequestBody Funcionario funcionario){
    	Funcionario funcionarioOptional = funcionarioService.findById(id);
    	
    	if (funcionarioOptional == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não Encontrado!");
        }
    	
        return ResponseEntity.status(HttpStatus.OK).body(funcionarioService.save(funcionario));
    }
    
    
    @PutMapping("/funcionarios/{id_funcionario}/servico/{id_servico}")
    public ResponseEntity<Object> servicoToFuncionario(@PathVariable(value = "id_funcionario") Long id_funcionario, @PathVariable(value = "id_servico") Long id_servico){
    	
    	return ResponseEntity.status(HttpStatus.OK).body(funcionarioService.servicoToFuncionario(id_funcionario, id_servico));
    }
    
    @PutMapping("/funcionarios/{id_funcionario}/horario/{id_horario}")
    public ResponseEntity<Object> horarioToFuncionario(@PathVariable(value = "id_funcionario") Long id_funcionario, @PathVariable(value = "id_horario") Long id_horario){
    	
    	return ResponseEntity.status(HttpStatus.OK).body(funcionarioService.horarioToFuncionario(id_funcionario, id_horario));
    }
    
    
}