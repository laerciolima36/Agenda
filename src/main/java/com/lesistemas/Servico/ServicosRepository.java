package com.lesistemas.Servico;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lesistemas.Funcionario.Funcionario;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicosRepository extends JpaRepository<Servico, Long>{
	
	@Query(value = "SELECT * FROM servicos where id_empresa = ?1", nativeQuery = true)
	List<Servico> findByIdEmpresa(Long id);


	@Query(value= "SET FOREIGN_KEY_CHECKS = 0; DELETE from servicos where id_servico = ?1; SET FOREIGN_KEY_CHECKS = 1;", nativeQuery = true)
	void deleteNoCheckFk(Long id);
}