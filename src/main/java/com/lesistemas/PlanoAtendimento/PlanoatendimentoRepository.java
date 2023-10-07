package com.lesistemas.PlanoAtendimento;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanoatendimentoRepository extends JpaRepository<Planoatendimento, Long> {

    @Query(value = "SELECT * FROM plano_atendimento where id_empresa = ?1", nativeQuery = true)
    List<Planoatendimento> findByEmpresa(Long id);
}
