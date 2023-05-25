package org.pzsp2.proman;

// import org.pzsp2.proman.database_management.DatabaseManager;
import org.pzsp2.proman.security.TokenService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import org.springframework.beans.factory.annotation.Autowired;
import org.pzsp2.proman.security.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.*;

import lombok.AllArgsConstructor;
import org.pzsp2.proman.tips.Tip;
import org.pzsp2.proman.database_management.tables.admin.service.AdminServiceImpl;
import org.pzsp2.proman.database_management.tables.inverter.dto.InverterDTO;
import org.pzsp2.proman.database_management.tables.inverter.service.InverterServiceImpl;
import org.pzsp2.proman.database_management.tables.inverter_a_data.dto.InverterADataDTO;
import org.pzsp2.proman.database_management.tables.inverter_a_data.service.InverterADataServiceImpl;
import org.pzsp2.proman.database_management.tables.user.service.UserServiceImpl;
import org.pzsp2.proman.database_management.tables.user.model.User;
import org.pzsp2.proman.database_management.tables.user.dto.UserDTO;


@RestController
@CrossOrigin
public class Controller {

    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    // private final DatabaseManager databaseManager;

    @Autowired
    private InverterServiceImpl inverterServiceImpl;

    @Autowired
    private InverterADataServiceImpl inverterADataServiceImpl;

    @Autowired
    private UserServiceImpl userDetailsServiceImpl;

    @Autowired
    private AdminServiceImpl adminServiceImpl;

    public Controller(TokenService tokenService, 
            AuthenticationManager authenticationManager) {
        System.out.println("fffffffffff");
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        // this.databaseManager = new DatabaseManager();
    }

    @PostMapping("/log_in")
    public Map<String, String> logAUserIn(@RequestBody Map<String, String> credentials) {// } throws
                                                                                         // AuthenticationException{
        HashMap<String, String> response = new HashMap<String, String>();
        System.out.println("User tried to log in");
        String username = credentials.get("username");
        String password = credentials.get("password");
        System.out.println(username + ", " + password);
        try {
            Authentication authentication = authenticationManager
                .authenticate(
                    new UsernamePasswordAuthenticationToken(
                        username,
                        password
                    )
            );
            String token = tokenService.generateToken(authentication);
            System.out.println("Authenticated successfully");

            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

            // Extract the role from authorities
            String role = authorities.stream()
                    .map(GrantedAuthority::getAuthority)
                    .findFirst()
                    .orElse("");

            response.put("status", "success");
            response.put("token", token);
            response.put("role", role);
        } catch (AuthenticationException ex) {
            // ex.printStackTrace();
            System.out.println("Could not authenticate user");
            response.put("status", "failure");
        }
        return response;
    }

    @AllArgsConstructor
    @Getter
    private class UserOverviewResponse {
        private String status;
        private String username;
        private List<InverterADataDTO> records;
        private List<InverterDTO> devices;
        private ArrayList<Tip> tips;
    }

    @GetMapping("/user_home/overview")
    public UserOverviewResponse userOverviewPage() {
        System.out.println("Tried to access the user home page");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        UserOverviewResponse response = new UserOverviewResponse(
            "success",
            username,
            inverterADataServiceImpl.getDataByInverterId(1),
            inverterServiceImpl.getInvertersByUser(1),
            new ArrayList<Tip>()
        );
        return response;
    }

    @AllArgsConstructor
    @Getter
    private class UserAnalysisResponse {
        private String status;
        private List<InverterADataDTO> records;
    };

    @GetMapping("/user_home/analysis")
    public UserAnalysisResponse userAnalysisPage() {
        System.out.println("Tried to access the user home page");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        System.out.println(username);

        UserAnalysisResponse response = new UserAnalysisResponse(
            "success", 
            inverterADataServiceImpl.getDataByInverterId(1)
        );
        return response;
    }

    @AllArgsConstructor
    @Getter
    private class UserDevicesResponse {
        private String status;
        private List<InverterDTO> devices;
    };

    @GetMapping("/user_home/devices")
    public UserDevicesResponse userDevicesPage() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        System.out.println(username);

        UserDevicesResponse response = new UserDevicesResponse(
            "success", 
            inverterServiceImpl.getAllInverters()
        );
        return response;
    }

    @AllArgsConstructor
    @Getter
    private class UserTipsResponse {
        private String status;
        private List<Tip> tips;
    };

    @GetMapping("/user_home/tips")
    public UserTipsResponse userTipsPage() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        System.out.println(username);

        UserTipsResponse response = new UserTipsResponse(
            "success", 
            new ArrayList<Tip>()
        );
        return response;
    }

    // @GetMapping("/admin_home/overview")
    // public Map<String, String> adminOverviewPage() {
    //     System.out.println("Tried to access the admin home page");

    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     String username = authentication.getName();

    //     System.out.println(username);
    //     String name = "AAAAAAA";
    //     String role = "AAAAAAA";

    //     Map<String, String> response = new HashMap<String, String>();
    //     response.put("status", "success");
    //     response.put("name", name);
    //     response.put("role", role);
    //     return response;
    // }

    // @GetMapping({"/owner_home/overview", "/owner_home/users",
    // "/owner_home/users_create",
    // "/owner_home/users_edit", "/owner_home/admins", "/owner_home/admins_create",
    // "/owner_home/admins_edit"})
    // public Map<String, String> ownerHomeOverviewPagea() {
    // System.out.println("Tried to access the owner home page");

    // Authentication authentication =
    // SecurityContextHolder.getContext().getAuthentication();
    // String username = authentication.getName();

    // System.out.println(username);
    // String name = databaseManager.getUser(username).getName();
    // String role = databaseManager.getUser(username).getRole();

    // Map<String, String> response = new HashMap<String, String>();
    // response.put("status", "success");
    // response.put("name", name);
    // response.put("role", role);
    // return response;
    // }

    // @AllArgsConstructor
    // @Getter
    // private class OwnerOverviewResponse {
    //     private String status;
    //     private String username;
    //     private String role;
    // };

    // @GetMapping("/owner_home/overview")
    // public OwnerOverviewResponse ownerOverviewPage() {
    //     System.out.println("Tried to access the owner home page");

    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     String username = authentication.getName();

    //     System.out.println(username);
    //     String name = "AAAAAAA";
    //     String role = "AAAAAAA";

    //     OwnerOverviewResponse response = new OwnerOverviewResponse(
    //         "success",
    //         name,
    //         role);
    //     return response;
    // }

    // @AllArgsConstructor
    // @Getter
    // private class OwnerUsersResponse {
    //     private String status;
    //     private String username;
    //     private String role;
    //     private List<UserDTO> users;
    // };

    // @GetMapping("/owner_home/users")
    // public OwnerUsersResponse ownerUsersPage() {
    //     System.out.println("Tried to access the owner users page");

    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     String username = authentication.getName();

    //     System.out.println(username);
    //     String name = "AAAAA";
    //     String role = "AAAAA";

    //     OwnerUsersResponse response = new OwnerUsersResponse(
    //         "success",
    //         name,
    //         role,
    //         userDetailsServiceImpl.getAllUsers());
    //     return response;
    // }

//     @AllArgsConstructor
//     @Getter
//     private class OwnerAdminsResponse {
//         private String status;
//         private String username;
//         private String role;
//         private List<User> users;
//     };

//     @GetMapping("/owner_home/admins")
//     public OwnerAdminsResponse ownerAdminsPage() {
//         System.out.println("Tried to access the owner admins page");

//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();

//         System.out.println(username);
//         String name = "AAAAA";
//         String role = "AAAAA";

//         OwnerAdminsResponse response = new OwnerAdminsResponse(
//             "success",
//             name,
//             role,
//             databaseManager.getUsers());
//         return response;
//     }

//     @GetMapping("/owner_home/get_user")
//     public User ownerUsersGetUserPage(@RequestParam String username) {
//         System.out.println("Tried to access the owner get_user page");
                  
//         User response = databaseManager.getUser(username);
//         return response;
//     }

//     @DeleteMapping("/owner_home/delete_user")
//     public String ownerUsersDeleteUser(@RequestParam String username) {
//         System.out.println("Tried to access the owner delete_user page");
//         User deleted_user = databaseManager.getUser(username);
//         if (deleted_user != null){
//           databaseManager.deleteUser(username);
//           return "User deleted succesfully";
//         }
//         else {
//           return "There is no such user";
//         }
//     }

//     @AllArgsConstructor
// @Getter
//     private class OwnerUsersCreateResponse {
//         private String status;
//         private String username;
//         private String role;
//     };

//     @GetMapping("/owner_home/users_create")
//     public OwnerUsersCreateResponse ownerUsersCreatePage() {
//         System.out.println("Tried to access the owner users create page");

//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();
        
//         System.out.println(username);
//         String name = databaseManager.getUser(username).getName();
//         String role = databaseManager.getUser(username).getRole();
                  
//         OwnerUsersCreateResponse response = new OwnerUsersCreateResponse(
//         "success", 
//         name,
//         role
//         );
//         return response;
//     }

//     @PostMapping("/owner_home/create_user")
//     public User ownerUsersCreateUser(@RequestBody User user) {
//         System.out.println("Tried to access the owner get_users page");
//         System.out.println(user.getName());
//         databaseManager.createUser(user);
//         return user;
//     }

//     @GetMapping("/owner_home/users_edit")
//     public OwnerUsersCreateResponse ownerUsersEditPage() {
//         System.out.println("Tried to access the owner users edit page");

//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();
        
//         System.out.println(username);
//         String name = databaseManager.getUser(username).getName();
//         String role = databaseManager.getUser(username).getRole();
                  
//         OwnerUsersCreateResponse response = new OwnerUsersCreateResponse(
//         "success", 
//         name,
//         role
//         );
//         return response;
//     }

//     @PutMapping("/owner_home/edit_user")
//     public User ownerUsersEditUser(@RequestBody User user) {
//         System.out.println("Tried to access the owner get_users page");
//         System.out.println(user.getName());
//         databaseManager.editUser(user);
//         return user;
//     }
  
//     @AllArgsConstructor
// @Getter
//     private class OwnerDevicesPageResponse {
//         private String status;
//         private String username;
//         private String role;
//         private ArrayList<UserInverter> userInverters;
//     };

//     @GetMapping("/owner_home/devices")
//     public OwnerDevicesPageResponse ownerDevicesPage() {
//         System.out.println("Tried to access the owner devices page");

//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();
        
//         System.out.println(username);
//         String name = databaseManager.getUser(username).getName();
//         String role = databaseManager.getUser(username).getRole();
                  
//         OwnerDevicesPageResponse response = new OwnerDevicesPageResponse(
//             "success", 
//             name,
//             role,
//             databaseManager.getUserInverters()
//         );
//         return response;
//     }

//     @GetMapping("/owner_home/get_device")
//     public UserInverter ownerUsersGetDevice(@RequestParam String login) {
//         System.out.println("Tried to access the owner get_user page");
                  
//         UserInverter response = databaseManager.getUserInverter(login);
//         return response;
//     }

//     @AllArgsConstructor
// @Getter
//     private class OwnerDevicesCreatePageResponse {
//         private String status;
//         private String username;
//         private String role;
//     };

//     @GetMapping("/owner_home/devices_create")
//     public OwnerDevicesCreatePageResponse ownerDevicesCreatePage() {
//         System.out.println("Tried to access the owner devices page");

//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();
        
//         System.out.println(username);
//         String name = databaseManager.getUser(username).getName();
//         String role = databaseManager.getUser(username).getRole();
                    
//         OwnerDevicesCreatePageResponse response = new OwnerDevicesCreatePageResponse(
//             "success", 
//             name,
//             role
//         );
//         return response;
//     }
 
//     @PostMapping("/owner_home/create_device")
//     public UserInverter ownerUsersCreateUser(@RequestBody UserInverter inverter) {
//         System.out.println("Tried to access create_device");
//         System.out.println(inverter.getLogin());
//         databaseManager.createUserInverter(inverter);
//         return inverter;
//     }

//     @GetMapping("/owner_home/devices_edit")
//     public OwnerDevicesCreatePageResponse ownerDevicesEditPage() {
//         System.out.println("Tried to access the owner devices page");

//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();
        
//         System.out.println(username);
//         String name = databaseManager.getUser(username).getName();
//         String role = databaseManager.getUser(username).getRole();
                  
//         OwnerDevicesCreatePageResponse response = new OwnerDevicesCreatePageResponse(
//             "success", 
//             name,
//             role
//         );
//         return response;
//     }

//     @AllArgsConstructor
// @Getter
//     private static class UsersResponse {
//         private String status;
//         private String username;
//         private String role;
//         private ArrayList<User> users;
//     }

//     @AllArgsConstructor
// @Getter
//     private static class InvertersResponse {
//         private String status;
//         private String username;
//         private String role;
//         private ArrayList<UserInverter> inverters;
//     }

//     @AllArgsConstructor
// @Getter
//     private static class Response {
//         private String status;
//         private String username;
//         private String role;
//     }

//     @GetMapping("/admin_home/users")
//     public UsersResponse adminUsersPage() {
//         System.out.println("Tried to access the admin users page");

//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();

//         System.out.println(username);
//         String name = databaseManager.getUser(username).getName();
//         String role = databaseManager.getUser(username).getRole();

//         return new UsersResponse("success", name, role, databaseManager.getUsers());
//     }

//     @GetMapping("/admin_home/users/edit")
//     public Response adminUsersEditPage() {
//         System.out.println("Tried to access the admin users edit page");

//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();

//         System.out.println(username);
//         String name = databaseManager.getUser(username).getName();
//         String role = databaseManager.getUser(username).getRole();

//         return new Response("success", name, role);
//     }

//     @PutMapping("/admin_home/users/edit")
//     public User adminUsersEditUserPage(@RequestBody User user) {
//         databaseManager.editUser(user);
//         return user;
//     }

//     @GetMapping("/admin_home/users/create")
//     public Response adminUsersCreatePage() {
//         System.out.println("Tried to access the admin users create page");

//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();

//         System.out.println(username);
//         String name = databaseManager.getUser(username).getName();
//         String role = databaseManager.getUser(username).getRole();

//         return new Response("success", name, role);
//     }
    
//     @PostMapping("/admin_home/users/create")
//     public User adminUsersCreatePage(@RequestBody User user) {
//         System.out.println(user);
//         System.out.println("Tried to access the admin create new user page");
//         System.out.println(user.getName());
//         databaseManager.createUser(user);
//         return user;
//     }

//     @GetMapping("/admin_home/inverters")
//     public InvertersResponse adminInvertersPage() {
//         System.out.println("Tried to access the admin inverters page");

//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();

//         System.out.println(username);
//         String name = databaseManager.getUser(username).getName();
//         String role = databaseManager.getUser(username).getRole();

//         return new InvertersResponse("success", name, role, databaseManager.getUserInverters());
//     }

//     @GetMapping("/admin_home/inverters/edit")
//     public Response adminInvertersEditPage() {
//         System.out.println("Tried to access the admin inverters edit page");

//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();

//         System.out.println(username);
//         String name = databaseManager.getUser(username).getName();
//         String role = databaseManager.getUser(username).getRole();

//         return new Response("success", name, role);
//     }

//     @PutMapping("/admin_home/inverters/edit")
//     public UserInverter adminInvertersEditInverterPage(@RequestBody UserInverter inverter) {
//         System.out.println(inverter.getModelName());
//         System.out.println(inverter.getUserUsername());
//         System.out.println(inverter.getIP());
//         databaseManager.editInverter(inverter);
//         return inverter;
//     }

//     @GetMapping("/admin_home/inverters/create")
//     public Response adminInvertersCreatePage() {
//         System.out.println("Tried to access the admin inverters create page");

//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String username = authentication.getName();

//         System.out.println(username);
//         String name = databaseManager.getUser(username).getName();
//         String role = databaseManager.getUser(username).getRole();

//         return new Response("success", name, role);
//     }

//     @PostMapping("/admin_home/inverters/create")
//     public UserInverter adminInvertersCreateInverterPage(@RequestBody UserInverter inverter) {
//         System.out.println(inverter);
//         inverter.setId(databaseManager.getUserInverters().size());
//         System.out.println("Tried to access the admin create new user page");
//         databaseManager.createInverter(inverter);
//         return inverter;
//     }
}
