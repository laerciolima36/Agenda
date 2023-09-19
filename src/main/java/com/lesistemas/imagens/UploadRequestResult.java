package com.lesistemas.imagens;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UploadRequestResult {
	
	private Long imagemId;
	private String uploadSignedUrl;
	private String tipoimagem;
	
}
