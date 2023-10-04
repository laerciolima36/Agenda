package com.lesistemas.Dias;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiasRepository extends JpaRepository<Dias, Long> {
}
