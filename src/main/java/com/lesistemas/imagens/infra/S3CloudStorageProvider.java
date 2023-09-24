package com.lesistemas.imagens.infra;

import java.net.URL;
import java.time.Duration;

import org.springframework.stereotype.Component;

import com.lesistemas.imagens.CloudStorageProvider;
import com.lesistemas.imagens.InterfaceImagem;

import lombok.AllArgsConstructor;

import software.amazon.awssdk.awscore.AwsRequestOverrideConfiguration;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Component
@AllArgsConstructor
public class S3CloudStorageProvider implements CloudStorageProvider{

	private final S3Client s3client;
	private final S3Presigner s3Presigner;
	private final StorageProperties storageProperties;
	
	@Override
	public URL generatePresignedUploadUrl(InterfaceImagem imagem) {
		
		var builder = AwsRequestOverrideConfiguration.builder();
		
		builder.putRawQueryParameter("x-amz-acl", "public-read");
		
		PutObjectRequest objectRequest = PutObjectRequest.builder()
			.bucket(storageProperties.getS3().getBucket())
			.key(imagem.getPath())
			.contentType(imagem.getContentType())
			.contentLength(imagem.getContentLength())
			.acl("public-read")
			.overrideConfiguration(builder.build())
			.build();
		
		PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
				.signatureDuration(Duration.ofMinutes(30))
				.putObjectRequest(objectRequest)
				.build();
		
		return s3Presigner.presignPutObject(presignRequest).url();
	}

	@Override
	public void delete(InterfaceImagem imagem) {
		String keyName = imagem.getPath();
		//String keyName = "laercio/servicos/2";
		DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder().bucket(storageProperties.getS3().getBucket()).key(keyName).build();
		s3client.deleteObject(deleteObjectRequest);

		System.out.println("Executou delete da AmazonS3");
		System.out.println(deleteObjectRequest);
	}
}
