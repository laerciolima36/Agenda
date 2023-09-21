package com.lesistemas.Funcionario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lesistemas.Empresa.Empresa;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long>{
	
	List<Funcionario> findByEmpresa(Empresa empresa);

	@Query(value = "SELECT * FROM funcionarios where id_empresa = ?1 order by id_funcionario DESC", nativeQuery = true)
	List<Funcionario> findByIdEmpresa(Long id);
	
	//List<Funcionario> findFuncionariosByServicosid_servico (Long id_servico);

}