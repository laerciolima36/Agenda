package com.lesistemas.Servico;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lesistemas.Funcionario.Funcionario;

public interface ServicosRepository extends JpaRepository<Servico, Long>{
	
	@Query(value = "SELECT * FROM servicos where id_empresa = ?1", nativeQuery = true)
	List<Servico> findByIdEmpresa(Long id);

}