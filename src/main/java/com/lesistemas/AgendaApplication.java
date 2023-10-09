package com.lesistemas;

import com.lesistemas.PlanoAtendimento.PlanoPadrao;
import com.lesistemas.PlanoAtendimento.PlanoatendimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AgendaApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgendaApplication.class, args);
	}
}