package org.pzsp2.proman.database_management.tables.inverter.service;

import java.util.List;

import org.pzsp2.proman.database_management.tables.inverter.dto.InverterDTO;

public interface InverterService {
    List<InverterDTO> getAllInverters();

    List<InverterDTO> getInvertersByUser(long userId);

    InverterDTO getInverterById(long inverterId);

    InverterDTO addNewInverter(InverterDTO inverterDTO);

    InverterDTO editInverter(InverterDTO inverterDTO);

    void deleteInverterById(long inverterId);
}