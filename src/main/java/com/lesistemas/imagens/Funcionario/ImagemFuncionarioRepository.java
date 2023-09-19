package com.lesistemas.imagens.Funcionario;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lesistemas.Empresa.Empresa;
import com.lesistemas.imagens.Empresa.ImagemEmpresa;

public interface ImagemFuncionarioRepository extends JpaRepository<ImagemFuncionario, Long>{

}