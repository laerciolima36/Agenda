package com.lesistemas.Empresa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class EmpresaController {

	@Autowired
	EmpresaService empresaService;

	@GetMapping(value = "/empresa/usuario/{id_usuario}")
	public ResponseEntity<Object> getEmpresaByIdUsuario(@PathVariable("id_usuario") Long id) {
		return empresaService.findByIdUsuario(id);
	}
	
	@PutMapping("/empresa/update/{id}")
    public ResponseEntity<Object> updateEmpresa(@PathVariable(value = "id") Long id, @RequestBody Empresa empresa){
    	return empresaService.updateEmpresa(id, empresa);
    }
	
	@GetMapping(value = "/app/{link}")
	public ModelAndView viewReserva(@PathVariable("link") String link) {
		return empresaService.findByLink(link);
	}
	
}