package com.lesistemas.Cadastro;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Empresa.EmpresaService;
import com.lesistemas.Endereco.Endereco;
import com.lesistemas.Endereco.EnderecoService;
import com.lesistemas.Usuario.Usuario;
import com.lesistemas.Usuario.UsuarioService;
import com.lesistemas.Usuario.Role;

@Service
public class CadastroService {

	@Autowired
	UsuarioService usuarioService;

	@Autowired
	EmpresaService empresaService;

	@Autowired
	EnderecoService enderecoService;

	@Autowired
	private PasswordEncoder encoder;

	public ModelAndView viewCadastrar() {
		ModelAndView mv = new ModelAndView("cadastrar");

		Usuario usuario = new Usuario();
		Empresa empresa = new Empresa();
		Endereco endereco = new Endereco();

		mv.addObject("usuario", usuario);
		mv.addObject("empresa", empresa);
		mv.addObject("endereco", endereco);
		
		return mv;
	}

	public String salvarCadastro(Usuario usuario, Empresa empresa, Endereco endereco) {

		if(!empresaService.LinkEmpresaDisponivel(empresa.getLink())) {
			return "Link já Existe, por favor tente outro link";
		}else if(!emailDisponivel(usuario.getUsername())) {
			return "Usuário já Existe, por favor tente outro usuário";
		}
		
		usuario.setPassword(encoder.encode(usuario.getPassword()));
		usuario.setRole(Role.USER.getNome());
		usuario.setUsername(usuario.getUsername().toLowerCase().replaceAll(" ", ""));

		if (usuario != null) {
			empresa.setUsuario(usuarioService.save(usuario));
		}
		empresa.setLink(empresa.getLink().toLowerCase().replaceAll(" ", ""));
		empresa.setRedesocial(empresa.getRedesocial().toLowerCase().replaceAll(" ", "").replaceAll("@", ""));
		empresa.setEndereco(enderecoService.save(endereco));
		empresa.setDataCadastro(LocalDate.now());

		empresaService.save(empresa);
		
		return "Cadastro Efetuado com Sucesso!";
	}
	
	public Boolean emailDisponivel(String email) {
			Usuario user = usuarioService.findByUserName(email);
			
			if(user == null) {
				return true;
				//"Usuário Disponivel";
			}else {
				return false;
				//"Usuário já Existe, por favor tente outro usuário";
			}
	}
}