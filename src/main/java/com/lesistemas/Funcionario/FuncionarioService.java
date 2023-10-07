package com.lesistemas.Funcionario;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.Horario.Horario;
import com.lesistemas.Horario.HorarioRepository;
import com.lesistemas.Servico.Servico;
import com.lesistemas.Servico.ServicosRepository;
import com.lesistemas.imagens.Funcionario.ImagemFuncionario;

import jakarta.transaction.Transactional;

@Service
public class FuncionarioService {

	@Autowired
	FuncionarioRepository funcionarioRepository;
	
	@Autowired
	ServicosRepository servicosRepository;
	
	@Autowired
	HorarioRepository horarioRepository;
	
	public Funcionario findById(Long id) {
		return funcionarioRepository.findById(id).get();
	}
	
	public Funcionario save(Funcionario funcionario) {
		return funcionarioRepository.save(funcionario);
	}
	
	public List<Funcionario> findByEmpresa(Empresa empresa){
		return funcionarioRepository.findByEmpresa(empresa);
	}

	public List<Funcionario> findByIdEmpresa(Long id) {
		return funcionarioRepository.findByIdEmpresa(id);
	}
	
	public List<Funcionario> findAll(){
		return funcionarioRepository.findAll();
	}
	
	@Transactional
	public void delete(Funcionario funcionario) {
		funcionarioRepository.delete(funcionario);		
	}

	public Funcionario servicoToFuncionario(Long id_funcionario, Long id_servico) {
		Set<Servico> ServicoSet = null;
		
		Funcionario funcionario = funcionarioRepository.findById(id_funcionario).get();
    	Servico servico = servicosRepository.findById(id_servico).get();
    	
    	ServicoSet = funcionario.getServicos();
    	ServicoSet.add(servico);
    	
    	funcionario.setServicos(ServicoSet);
    	
    	return funcionarioRepository.save(funcionario);
	}
	
	
	public Funcionario horarioToFuncionario(Long id_funcionario, Long id_horario) {
		Set<Horario> HorarioSet = null;
		
		Funcionario funcionario = funcionarioRepository.findById(id_funcionario).get();
		Horario horario = horarioRepository.findById(id_horario).get();
		
		//HorarioSet = funcionario.getHorarios();
		HorarioSet.add(horario);
		
		//funcionario.setHorarios(HorarioSet);
		
		return funcionarioRepository.save(funcionario);
	}
	
	public void updateIdImagemFuncionario(ImagemFuncionario imagemFuncionario) {
		Funcionario fun = findById(imagemFuncionario.getId_imagem());
		
		if(fun != null) {
			fun.setImg(imagemFuncionario);
			save(fun);
		}
	}

	public ResponseEntity<Object> updateFuncionario(Long id, Funcionario funcionario) {
		Funcionario func = findById(id);

		if (func == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não Encontrado!");
		}

		func.setNome(funcionario.getNome());
		//func.setHorarios(funcionario.getHorarios());
		func.setServicos(funcionario.getServicos());
		func.setWhatsapp(funcionario.getWhatsapp());
		func.setPlanoatendimento(funcionario.getPlanoatendimento());

		return ResponseEntity.status(HttpStatus.OK).body(save(func));
	}
}