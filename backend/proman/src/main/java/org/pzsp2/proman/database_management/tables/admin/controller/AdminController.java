package org.pzsp2.proman.database_management.tables.admin.controller;

import org.pzsp2.proman.database_management.tables.admin.dto.AdminDTO;
import org.pzsp2.proman.database_management.tables.admin.model.Admin;
import org.pzsp2.proman.database_management.tables.admin.service.AdminServiceImpl;
import org.pzsp2.proman.database_management.tables.privileges.service.PrivilegesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AdminController {

    private final AdminServiceImpl adminDetailsService;
    private final PrivilegesService privilegesService;

    public AdminController(AdminServiceImpl adminDetailsService, PrivilegesService privilegesService) {
        this.adminDetailsService = adminDetailsService;
        this.privilegesService = privilegesService;
    }

    @GetMapping("/admins")
    public List<AdminDTO> getAllAdmins() {
        List<Admin> admins = adminDetailsService.getAllAdmins();
        return admins.stream()
                .map(this::mapAdminToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/admins/{adminId}")
    public AdminDTO getAdmin(@PathVariable long adminId) {
        Admin admin = adminDetailsService.getAdminById(adminId);
        return mapAdminToDTO(admin);
    }

    @PostMapping("/admins/create")
    public ResponseEntity<AdminDTO> createAdmin(@RequestBody AdminDTO adminDTO) {
        AdminDTO createdAdminDTO = adminDetailsService.addNewAdmin(adminDTO);
        return new ResponseEntity<>(createdAdminDTO, HttpStatus.CREATED);
    }

    @PostMapping("/admins/edit/{adminId}")
    public ResponseEntity<AdminDTO> editAdmin(@RequestBody AdminDTO adminDTO) {
        AdminDTO editedAdminDTO = adminDetailsService.editAdmin(adminDTO);
        return new ResponseEntity<>(editedAdminDTO, HttpStatus.OK);
    }

    @DeleteMapping("/admins/delete/{adminId}")
    public void deleteAdmin(@PathVariable Long adminId) {
        adminDetailsService.deleteAdminById(adminId);
    }

    private AdminDTO mapAdminToDTO(Admin admin) {
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
}