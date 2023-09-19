package com.lesistemas.imagens;

import java.net.URL;

import com.lesistemas.imagens.Empresa.ImagemEmpresa;

public interface CloudStorageProvider {
	
	URL generatePresignedUploadUrl(InterfaceImagem imagem);

}