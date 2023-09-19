package com.lesistemas.Cadastro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Empresa.EmpresaService;
import com.lesistemas.Endereco.Endereco;
import com.lesistemas.Usuario.Usuario;

@RestController
public class CadastroController {

	@Autowired
	CadastroService cadastroService;
	
	@Autowired
	EmpresaService empresaService;
	
	@GetMapping("/cadastrar")
	public ModelAndView viewCadastrar() {
		return cadastroService.viewCadastrar();
	}
	
	@PostMapping("/cadastrar")
	public ModelAndView cadastrar(@ModelAttribute Usuario usuario, @ModelAttribute Empresa empresa,
			@ModelAttribute Endereco endereco) {
		ModelAndView mv = new ModelAndView("cadastro_sucess");
		mv.addObject("retorno", cadastroService.salvarCadastro(usuario, empresa, endereco));
		return mv;
	}
	
	@GetMapping("/cadastrar/validalink/{link}")
	public Boolean validalink(@PathVariable("link") String link) {
		return empresaService.LinkEmpresaDisponivel(link);
	}
	
	@GetMapping("/cadastrar/validaemail/{email}")
	public Boolean validaemail(@PathVariable("email") String email) {
		return cadastroService.emailDisponivel(email);
	}
}