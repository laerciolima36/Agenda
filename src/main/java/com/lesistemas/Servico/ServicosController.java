package com.lesistemas.Servico;

import java.util.List;

import com.lesistemas.imagens.StorageService;
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

@RestController
public class ServicosController {
	
	@Autowired
	ServicosService servicosService;

	@Autowired
	StorageService storageService;

	@GetMapping(value = "/servicos/{id}")
	public ResponseEntity<Servico> getServicoById(@PathVariable("id") Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(servicosService.findById(id));
	}
	
	@GetMapping(value = "/get/servicos/empresa/{idEmpresa}")
	public ResponseEntity<List<Servico>> getServicoByIdEmpresa(@PathVariable("idEmpresa") Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(servicosService.findByIdEmpresa(id));
	}
	
	@PostMapping(value = "/servicos/save")
	public ResponseEntity<Servico> saveServico(@RequestBody Servico servico) {
		return ResponseEntity.status(HttpStatus.CREATED).body(servicosService.save(servico));
	}
	
    @DeleteMapping("/servicos/delete/{id}")
    public ResponseEntity<Object> deleteServico(@PathVariable(value = "id") Long id){
		Servico servico = servicosService.findById(id);

		if (servico == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Serviço não Encontrado!");
		}

		if(servico.getImg() != null){
			storageService.deleteImageS3(servico.getImg());
		}

        return servicosService.delete(servico);
    }

    @PutMapping("/servicos/update/{id}")
    public ResponseEntity<Object> updateServico(@PathVariable(value = "id") Long id, @RequestBody Servico servico){
        return ResponseEntity.status(HttpStatus.OK).body(servicosService.updateServico(id, servico));
    }
}