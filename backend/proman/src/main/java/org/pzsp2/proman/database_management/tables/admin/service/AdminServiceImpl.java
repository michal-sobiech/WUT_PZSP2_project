package org.pzsp2.proman.database_management.tables.admin.service;

import org.pzsp2.proman.database_management.tables.admin.dto.AdminDTO;
import org.pzsp2.proman.database_management.tables.admin.model.Admin;
import org.pzsp2.proman.database_management.tables.admin.repository.AdminRepository;
import org.pzsp2.proman.database_management.tables.privileges.service.PrivilegesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminServiceImpl(AdminRepository adminRepository, PrivilegesService privilegesService) {
        this.adminRepository = adminRepository;
        // this.privilegesService = privilegesService;
    }

    @Override
    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public AdminDTO mapToDTO(Admin admin) {
        AdminDTO adminDTO = new AdminDTO(
            admin.getId(),
            admin.getLogin(),
            admin.getPassword(),
            admin.getName(),
            admin.getSurname(),
            admin.getAddress(),
            admin.getEmail(),
            admin.getPhoneNumber()
        );
        return adminDTO;
    }

    @Override
    public Admin getAdminById(long adminId) {
        Optional<Admin> adminOptional = adminRepository.findById(adminId);
        return adminOptional.orElse(null);
    }

    @Override
    public void deleteAdminById(Long adminId) {
        adminRepository.deleteById(adminId);
    }

    @Override
    public void deleteAdmin(long adminId) {
        adminRepository.deleteById(adminId);
    }

    @Override
    public AdminDTO addNewAdmin(AdminDTO adminDTO) {
        Admin admin = new Admin();
        admin.setLogin(adminDTO.login());
        admin.setPassword(adminDTO.password());
        admin.setName(adminDTO.name());
        admin.setSurname(adminDTO.surname());
        admin.setAddress(adminDTO.address());
        admin.setEmail(adminDTO.email());
        admin.setPhoneNumber(adminDTO.phoneNumber());
        Admin savedAdmin = adminRepository.save(admin);
        return mapToDTO(savedAdmin);
    }

    @Override
    public AdminDTO editAdmin(AdminDTO adminDTO) {
        Optional<Admin> adminOptional = adminRepository.findById(adminDTO.id());
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            admin.setLogin(adminDTO.login());
            admin.setPassword(adminDTO.password());
            admin.setName(adminDTO.name());
            admin.setSurname(adminDTO.surname());
            admin.setAddress(adminDTO.address());
            admin.setEmail(adminDTO.email());
            admin.setPhoneNumber(adminDTO.phoneNumber());
            Admin updatedAdmin = adminRepository.save(admin);
            return mapToDTO(updatedAdmin);
        }
        return null;
    }
}
