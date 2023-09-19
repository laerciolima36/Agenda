package com.lesistemas.imagens.Empresa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lesistemas.Empresa.Empresa;

public interface ImagemEmpresaRepository extends JpaRepository<ImagemEmpresa, Long>{

	ImagemEmpresa findByTipoImagemAndEmpresa(String tipoImagem, Empresa empresa);
}