package com.lesistemas.Empresa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.lesistemas.Usuario.UsuarioService;

@Service
public class EmpresaService {

	@Autowired
	EmpresaRepository empresaRepository;
	
	@Autowired
	UsuarioService usuarioService;

	public Empresa findById(long id) {
		return empresaRepository.findById(id).get();
	}

	public Empresa save(Empresa empresa) {
		return empresaRepository.save(empresa);
	}

	public List<Empresa> findAll() {
		return empresaRepository.findAll();
	}

	public ModelAndView findByLink(String link) {
		Empresa empresa = empresaRepository.findByLink(link);
		if (empresa == null) {
			return new ModelAndView("error_empresa");
		} else {
			return new ModelAndView("reservar").addObject("empresa", empresa);
		}
	}
	
	public Empresa validaLink(String link) {
		return empresaRepository.findByLink(link);
	}

	public ResponseEntity<Object> findByIdUsuario(Long idUsuarioLogado) {
		if(idUsuarioLogado.equals(usuarioService.getIdUsuarioLogado())) {
			return ResponseEntity.status(HttpStatus.OK).body(empresaRepository.findByIdUsuario(idUsuarioLogado));
		}else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Não Autorizado");
		}
	}
	
	public ResponseEntity<Object> updateEmpresa(Long idEmpresa, Empresa empresa){
		Empresa empAtualizada = this.findById(idEmpresa);
		
		if(!LinkEmpresaDisponivel(empresa.getLink())) {
			return ResponseEntity.status(HttpStatus.OK).body("Link já Existe, por favor tente outro link");
		}
		
		if(empresa != null) {
			empAtualizada.setNome(empresa.getNome());
			empAtualizada.setContato(empresa.getContato());
			empAtualizada.setRedesocial(empresa.getRedesocial().toLowerCase().replaceAll(" ", "").replaceAll("@", ""));
			empAtualizada.setLink(empresa.getLink().toLowerCase().replaceAll(" ", ""));
			empAtualizada.setEndereco(empresa.getEndereco());
			
			return ResponseEntity.status(HttpStatus.OK).body(this.save(empAtualizada));
			
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Não foi possivel atualizar a Empresa!");
		}
	}
	
	public Boolean LinkEmpresaDisponivel(String link) {
		if(validaLink(link) == null) {
			return true;
			//"Link Disponivel";
		}else {
			return false;
			//"Link já Existe, por favor tente outro link";
		}
	}
}


