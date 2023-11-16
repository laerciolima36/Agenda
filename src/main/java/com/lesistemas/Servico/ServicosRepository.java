package com.lesistemas.Servico;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.lesistemas.Funcionario.Funcionario;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicosRepository extends JpaRepository<Servico, Long>{
	
	@Query(value = "SELECT * FROM servicos where id_empresa = ?1 order by id_servico", nativeQuery = true)
	List<Servico> findByIdEmpresa(Long id);

	@Modifying
	@Query(value= "SET FOREIGN_KEY_CHECKS = 0", nativeQuery = true)
	void NoCheckFk();

	@Modifying
	@Query(value= "SET FOREIGN_KEY_CHECKS = 1", nativeQuery = true)
	void CheckFk();
}