package com.lesistemas.Dias;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class DiasController {

    @Autowired
    DiasService diasService;

    @PostMapping(value = "/dia/{id_dia}/hora/{id_hora}")
    public ResponseEntity<Dias> setHoraDia(@PathVariable(value = "id_dia") Long id_dia, @PathVariable(value = "id_hora") Long id_hora) {
        return ResponseEntity.status(HttpStatus.CREATED).body(diasService.horaToDia(id_dia, id_hora));
    }

    @DeleteMapping(value = "/dia/{id_dia}/hora/{id_hora}")
    public ResponseEntity<Dias> removeHoraDia(@PathVariable(value = "id_dia") Long id_dia, @PathVariable(value = "id_hora") Long id_hora) {
        return ResponseEntity.status(HttpStatus.CREATED).body(diasService.removehoraToDia(id_dia, id_hora));
    }
}
