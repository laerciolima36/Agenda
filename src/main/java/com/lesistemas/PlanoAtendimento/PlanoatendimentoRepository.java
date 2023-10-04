package com.lesistemas.PlanoAtendimento;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanoatendimentoRepository extends JpaRepository<Planoatendimento, Long> {

}
