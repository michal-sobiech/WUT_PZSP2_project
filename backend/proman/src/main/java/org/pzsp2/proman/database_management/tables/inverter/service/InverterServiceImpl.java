package org.pzsp2.proman.database_management.tables.inverter.service;

import org.pzsp2.proman.database_management.tables.inverter.dto.InverterDTO;
import org.pzsp2.proman.database_management.tables.inverter.repository.InverterRepository;
import org.pzsp2.proman.database_management.tables.inverter.model.Inverter;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;

@Service
public class InverterServiceImpl implements InverterService {

    private final InverterRepository inverterRepository;

    public InverterServiceImpl(final InverterRepository inverterRepository) {
        this.inverterRepository = inverterRepository;
    }

    @Override
    public List<InverterDTO> getAllInverters() {
        return inverterRepository.findAll().stream().map(InverterDTO::of).toList();
    }

    @Override
    public List<InverterDTO> getInvertersByUser(long userId) {
        final List<Inverter> inverters = inverterRepository.findByUserId(userId);
        return inverters.stream().map(InverterDTO::of).toList();
    }

    @Override
    public InverterDTO getInverterById(long inverterId) {
        return InverterDTO.of(Objects.requireNonNull(inverterRepository.findById(inverterId).orElse(null)));
    }

    @Override
    public InverterDTO addNewInverter(InverterDTO inverterDTO) {
        System.out.println("tworze invertera w service");
        final Inverter newInverter = new Inverter(inverterDTO.userId(), inverterDTO.ipAddress());
        inverterRepository.save(newInverter);
        return InverterDTO.of(newInverter);
    }

    @Override
    public InverterDTO editInverter(InverterDTO inverterDTO) {
        Inverter existingInverter = inverterRepository.findById(inverterDTO.inverterId())
                .orElseThrow(() -> new IllegalArgumentException("Inverter does not exist"));
        existingInverter.setUserId(inverterDTO.userId());
        existingInverter.setIpAddress(inverterDTO.ipAddress());
        inverterRepository.save(existingInverter);
        return InverterDTO.of(existingInverter);
    }

    @Override
    public void deleteInverterById(long inverterId) {
        inverterRepository.deleteById(inverterId);
    }
}