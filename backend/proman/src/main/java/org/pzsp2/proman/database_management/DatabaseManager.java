// package org.pzsp2.proman.database_management;


// import java.util.ArrayList;

// import org.pzsp2.proman.database_management.database_classes.InverterRecord;
// import org.pzsp2.proman.database_management.database_classes.Tip;
// import org.pzsp2.proman.database_management.database_classes.User;
// import org.pzsp2.proman.database_management.database_classes.UserInverter;


// // TODO prawie wszystko do zmiany
// public class DatabaseManager {
//     private MockDatabase mockDatabase;

//     public DatabaseManager() {
//         this.mockDatabase = new MockDatabase();
//     }

//     public ArrayList<User> getUsers() {
//         return mockDatabase.getUsers();
//     }

//     public User getUser(String username) {
//         for (User user : getUsers()) {
//             if (user.getUsername().equals(username)) {
//                 return user;
//             }
//         }
//         return null;
//     }

//     public void createUser(User user){
//         ArrayList<User> users = mockDatabase.getUsers();
//         users.add(user);
//         mockDatabase.setUsers(users);
//     }

//     public void createInverter(UserInverter inverter) {
//         ArrayList<UserInverter> inverters = mockDatabase.getUserInverters();
//         inverters.add(inverter);
//         mockDatabase.setUserInverters(inverters);

//     }

//     public void editUser(User user_to_edit){
//         ArrayList<User> users = mockDatabase.getUsers();

//         int userIndex = -1;
//         for (int i = 0; i < users.size(); i++) {
//             if (users.get(i).getUsername().equals(user_to_edit.getUsername())) {
//                 userIndex = i;
//                 break;
//             }
//         }

//         if (userIndex != -1) {
//             // User with the given username was found, update their fields
//             users.get(userIndex).setUsername(user_to_edit.getUsername());
//             users.get(userIndex).setName(user_to_edit.getName());
//             users.get(userIndex).setSurname(user_to_edit.getSurname());
//             users.get(userIndex).setEmail(user_to_edit.getEmail());


//             // ... update other fields as needed

//             System.out.println("User with username " + user_to_edit.getUsername() + " was successfully updated.");
//             mockDatabase.setUsers(users);
//         } else {
//             // User with the given username was not found
//             System.out.println("User with username " + user_to_edit.getUsername() + " was not found.");
//         }
//     }

//     public UserInverter getInverterById(int id) {
//         ArrayList<UserInverter> inverters = mockDatabase.getUserInverters();

//         int inverterIndex = -1;
//         for (int i = 0; i < inverters.size(); i++) {
//             if (inverters.get(i).getId() == id) {
//                 inverterIndex = i;
//                 break;
//             }
//         }

//         return inverters.get(inverterIndex);

//     }

//     public void editInverter(UserInverter inverter) {
//         ArrayList<UserInverter> inverters = mockDatabase.getUserInverters();

//         int inverterIndex = -1;
//         for (int i = 0; i < inverters.size(); i++) {
//             if (inverters.get(i).getId() == inverter.getId()) {
//                 inverterIndex = i;
//                 break;
//             }
//         }

//         if (inverterIndex != -1) {
//             // Inverter was found, update their fields
//             inverters.get(inverterIndex).setUserUsername(inverter.getUserUsername());
//             inverters.get(inverterIndex).setModelName(inverter.getModelName());
//             inverters.get(inverterIndex).setIP(inverter.getIP());

//             // ... update other fields as needed

//             System.out.println("Inverter " + inverter.getId() + " was successfully updated.");
//             mockDatabase.setUserInverters(inverters);
//         } else {
//             // Inverter with the given username was not found
//             System.out.println("Inverter " + inverter.getId() + " was not found.");
//         }
//     }

//     public void deleteUser(String username) {
//         ArrayList<User> users = mockDatabase.getUsers();

//         int userIndex = -1;
//         for (int i = 0; i < users.size(); i++) {
//             if (users.get(i).getUsername().equals(username)) {
//                 userIndex = i;
//                 break;
//             }
//         }

//         if (userIndex != -1) {
//             // User with the given username was found, remove them from the list
//             users.remove(userIndex);
//             System.out.println("User with username " + username + " was successfully deleted.");
//         } else {
//             // User with the given username was not found
//             System.out.println("User with username " + username + " was not found.");
//         }
//     }

//     public ArrayList<InverterRecord> getInverterRecords() {
//         return mockDatabase.getInverterRecords();
//     }

//     public void editUser(User user_to_edit){
//         ArrayList<User> users = mockDatabase.getUsers();
    
//         int userIndex = -1;
//         for (int i = 0; i < users.size(); i++) {
//             if (users.get(i).getUsername().equals(user_to_edit.getUsername())) {
//                 userIndex = i;
//                 break;
//             }
//         }
    
//         if (userIndex != -1) {
//           // User with the given username was found, update their fields
//           users.get(userIndex).setName(user_to_edit.getName());
//           users.get(userIndex).setSurname(user_to_edit.getSurname());
//           users.get(userIndex).setEmail(user_to_edit.getEmail());
//           users.get(userIndex).setPassword(user_to_edit.getPassword());
//           users.get(userIndex).setRole(user_to_edit.getRole());
    
//           // ... update other fields as needed
    
//           System.out.println("User with username " + user_to_edit.getUsername() + " was successfully updated.");
//           mockDatabase.setUsers(users);
//         } else {
//           // User with the given username was not found
//           System.out.println("User with username " + user_to_edit.getUsername() + " was not found.");
//         }
//     }

//     public void deleteUser(String username) {
//         ArrayList<User> users = mockDatabase.getUsers();
    
//         int userIndex = -1;
//         for (int i = 0; i < users.size(); i++) {
//             if (users.get(i).getUsername().equals(username)) {
//                 userIndex = i;
//                 break;
//             }
//         }
    
//         if (userIndex != -1) {
//             // User with the given username was found, remove them from the list
//             users.remove(userIndex);
//             System.out.println("User with username " + username + " was successfully deleted.");
//         } else {
//             // User with the given username was not found
//             System.out.println("User with username " + username + " was not found.");
//         }
//     }


//     public ArrayList<InverterRecord> getInverterRecords(String username) {
//         ArrayList<InverterRecord> userRecords = new ArrayList<>();
//         ArrayList<InverterRecord> allRecords = mockDatabase.getInverterRecords();
//         ArrayList<UserInverter> userInverters = getUserInverters(username);
//         for (var record : allRecords) {
//             for (var inverter : userInverters) {
//                 if (inverter.getLogin() == record.getLogin()) {
//                     userRecords.add(record);
//                 }
//             }
//         }
//         return userRecords;
//     }

    
//     public ArrayList<UserInverter> getUserInverters() {
//         return mockDatabase.getUserInverters();
//     }

//     public UserInverter getUserInverter(String login) {
//         for (UserInverter inverter : getUserInverters()) {
//             if (inverter.getLogin().equals(login)) {
//                 return inverter;
//             }
//         }
//         return null;
//     }

//     public void createUserInverter(UserInverter new_inverter) {
//         ArrayList<UserInverter> inverters = mockDatabase.getUserInverters();
//         inverters.add(new_inverter);
//         mockDatabase.setUserInverters(inverters);
//     }


//     public void deleteUserInverter(String login) {
//         ArrayList<UserInverter> inverters = mockDatabase.getUserInverters();
    
//         int inverterIndex = -1;
//         for (int i = 0; i < inverters.size(); i++) {
//             if (inverters.get(i).getLogin().equals(login)) {
//                 inverterIndex = i;
//                 break;
//             }
//         }
    
//         if (inverterIndex != -1) {
//             // User with the given username was found, remove them from the list
//             inverters.remove(inverterIndex);
//             System.out.println("Inverter with login " + login + " was successfully deleted.");
//         } else {
//             // User with the given username was not found
//             System.out.println("Inverter with login  " + login + " was not found.");
//         }
//     }


//     public ArrayList<UserInverter> getUserInverters(String username) {
//         ArrayList<UserInverter> userInverters = new ArrayList<UserInverter>();
//         ArrayList<UserInverter> allInverters = mockDatabase.getUserInverters();
//         for (var inverter : allInverters) {
//             System.out.println(username);
//             System.out.println(inverter.getUserUsername());
//             if (inverter.getUserUsername().equals(username)) {
//                 userInverters.add(inverter);
//             }
//         }
//         return userInverters;
//     }

//     public ArrayList<Tip> getUserTips(String username) {
//         ArrayList<Tip> userTips = new ArrayList<Tip>();
//         ArrayList<Tip> allTips = mockDatabase.getUserTips();
//         for (Tip tip : allTips) {
//             if (tip.getUserUsername().equals(username)) {
//                 userTips.add(tip);
//             }
//         }
//         return userTips;
//     }
// }