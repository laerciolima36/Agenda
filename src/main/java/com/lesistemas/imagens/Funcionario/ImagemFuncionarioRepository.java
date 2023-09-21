package com.lesistemas.imagens.Funcionario;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.imagens.Empresa.ImagemEmpresa;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagemFuncionarioRepository extends JpaRepository<ImagemFuncionario, Long>{

}