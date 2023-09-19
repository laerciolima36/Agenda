package com.lesistemas.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepository usuarioRepository;
	
	public Usuario save(Usuario usuario) {
		return usuarioRepository.save(usuario);
	}
	
	public Usuario findByUserName(String nome) {
		return usuarioRepository.findByUsername(nome);
	}
	
	
	public Long getIdUsuarioLogado() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		String nome;  

		if (principal instanceof UserDetails) {
		    nome = ((UserDetails)principal).getUsername();
		} else {
		    nome = principal.toString();
		}
		
		return findByUserName(nome).getId();
	}
	
}
