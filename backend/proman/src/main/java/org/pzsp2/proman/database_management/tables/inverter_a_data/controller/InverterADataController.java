package org.pzsp2.proman.database_management.tables.inverter_a_data.controller;

import org.pzsp2.proman.database_management.tables.inverter_a_data.dto.InverterADataDTO;
import org.pzsp2.proman.database_management.tables.inverter_a_data.service.InverterADataService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inverter_data")
public class InverterADataController {

    private final InverterADataService inverterADataService;

    public InverterADataController(InverterADataService inverterADataService) {
        this.inverterADataService = inverterADataService;
    }

    @GetMapping("/{inverterId}")
    public ResponseEntity<List<InverterADataDTO>> getDataByInverterId(@PathVariable long inverterId) {
        List<InverterADataDTO> dataList = inverterADataService.getDataByInverterId(inverterId);
        if (dataList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(dataList, HttpStatus.OK);
    }

}
