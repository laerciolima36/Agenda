package com.lesistemas.Horario;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface HorarioRepository extends JpaRepository<Horario, Long>{
	
	@Query(value = "SELECT * FROM horario where id_empresa = ?1", nativeQuery = true)
	List<Horario> findByIdEmpresa(Long id);

}
