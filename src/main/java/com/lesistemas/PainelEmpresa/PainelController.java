package com.lesistemas.PainelEmpresa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.lesistemas.Usuario.UsuarioService;

@RestController
public class PainelController {
	
	@Autowired
	UsuarioService usuarioService;

	@GetMapping(value = "/painel/admin")
	public ModelAndView viewAdmin() {
		return new ModelAndView("painel_empresa")
				.addObject("userid",  usuarioService.getIdUsuarioLogado());
	}
}