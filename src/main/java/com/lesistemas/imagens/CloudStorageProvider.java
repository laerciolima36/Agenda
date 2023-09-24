package com.lesistemas.imagens;

import java.net.URL;

public interface CloudStorageProvider {
	
	URL generatePresignedUploadUrl(InterfaceImagem imagem);

	void delete(InterfaceImagem imagem);
}