package org.pzsp2.proman.database_management.tables.admin.service;

import org.pzsp2.proman.database_management.tables.admin.dto.AdminDTO;
import org.pzsp2.proman.database_management.tables.admin.model.Admin;

import java.util.List;

public interface AdminService {
    Admin saveAdmin(Admin admin);

    List<Admin> getAllAdmins();

    AdminDTO mapToDTO(Admin admin);

    Admin getAdminById(long adminId);

    void deleteAdminById(Long adminId);

    void deleteAdmin(long adminId);

    AdminDTO addNewAdmin(AdminDTO adminDTO);

    AdminDTO editAdmin(AdminDTO adminDTO);
}
