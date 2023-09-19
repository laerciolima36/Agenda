package com.lesistemas.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		
		http
			.authorizeHttpRequests()
			.requestMatchers("/imagens/**", "/resources/**", "/get/**", "/js/**", "/post/**" ,"/webjars/**", "/index/**", "/cadastrar/**", "/painel/js/**", "/painel/css/**", "/app/**", "/index/css/**", "/login3", "/css/**", "/fonts/**").permitAll()
			.and()
			.authorizeHttpRequests()
			.anyRequest()
			.authenticated()
			.and()
			.formLogin(form -> form.loginPage("/login").permitAll())
			.httpBasic()
			.and()
			.logout()
			.logoutSuccessUrl("/")
			.permitAll();
		
		http.csrf().disable();
		
		return http.build();
	}
	
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception{
		auth.userDetailsService(userDetailsService)
		.passwordEncoder(getPasswordEncoder());
	}

	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder(12);
	}
	
}
