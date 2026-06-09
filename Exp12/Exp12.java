<project xmlns="http://maven.apache.org/POM/4.0.0" 
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
 https://maven.apache.org/xsd/maven-4.0.0.xsd"> 
 <modelVersion>4.0.0</modelVersion> 
 <groupId>com.example</groupId> 
 <artifactId>employeeapi</artifactId> 
 <version>0.0.1-SNAPSHOT</version> 
 <name>employeeapi</name> 
 <parent> 
 <groupId>org.springframework.boot</groupId> 
 <artifactId>spring-boot-starter-parent</artifactId> 
 <version>3.2.5</version> 
 </parent> 
 <properties> 
 <java.version>17</java.version> 
 </properties> 
 <dependencies> 
 <!-- Spring Web --> 
 <dependency> 
 <groupId>org.springframework.boot</groupId> 
 <artifactId>spring-boot-starter-web</artifactId> 
 </dependency> 
 <!-- Spring Data JPA --> <dependency> 
 <groupId>org.springframework.boot</groupId> 
 <artifactId>spring-boot-starter-data-jpa</artifactId> 
 </dependency> 
 <!-- H2 Database --> 
 <dependency> 
 <groupId>com.h2database</groupId> 
 <artifactId>h2</artifactId> 
 <scope>runtime</scope> 
 </dependency> 
 </dependencies> 
 <build> 
 <plugins> 
 <plugin> 
 <groupId>org.springframework.boot</groupId> 
 <artifactId>spring-boot-maven-plugin</artifactId> 
 </plugin> 
 </plugins> 
 </build> 
</project> 
Main class 
package com.example.employeeapi; 
import org.springframework.boot.SpringApplication; 
import org.springframework.boot.autoconfigure.SpringBootApplication; 
@SpringBootApplication public class EmployeeApiApplication { 
 public static void main(String[] args) { 
 SpringApplication.run(EmployeeApiApplication.class, args); 
 } 
} 
Employee class 
package com.example.employeeapi.entity; 
import jakarta.persistence.Entity; 
import jakarta.persistence.Id; 
@Entity 
public class Employee { 
 @Id 
 private int id; 
 private String name; 
 private String department; 
 private double salary; 
 public Employee() { 
 } 
 public Employee(int id, String name, String department, double salary) { 
 this.id = id; 
 this.name = name; 
 this.department = department; 
 this.salary = salary; 
 } public int getId() { 
 return id; 
 } 
 public void setId(int id) { 
 this.id = id; 
 } 
 public String getName() { 
 return name; 
 } 
 public void setName(String name) { 
 this.name = name; 
 } 
 public String getDepartment() { 
 return department; 
 } 
 public void setDepartment(String department) { 
 this.department = department; 
 } 
 public double getSalary() { 
 return salary; 
 } 
public void setSalary(double salary) { 
this.salary = salary; 
} 
} package com.example.employeeapi.repository; 
import org.springframework.data.jpa.repository.JpaRepository; 
import com.example.employeeapi.entity.Employee; 
public interface EmployeeRepository extends JpaRepository<Employee, Integer> { 
} 
Employee service 
package com.example.employeeapi.service; 
import java.util.List; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service; 
import com.example.employeeapi.entity.Employee; 
import com.example.employeeapi.repository.EmployeeRepository; 
@Service 
public class EmployeeService { 
 @Autowired 
 private EmployeeRepository repository; 
 // Add Employee 
 public Employee saveEmployee(Employee employee) { 
 return repository.save(employee); 
 } 
 // Get All Employees 
 public List<Employee> getAllEmployees() { 
 return repository.findAll(); 
 } 
 // Get Employee By ID 
 public Employee getEmployeeById(int id) { 
 return repository.findById(id).orElse(null); 
 } // Update Employee 
 public Employee updateEmployee(int id, Employee employeeDetails) { 
 Employee employee = repository.findById(id).orElse(null); 
 if (employee != null) { 
 employee.setName(employeeDetails.getName()); 
 employee.setDepartment(employeeDetails.getDepartment()); 
 employee.setSalary(employeeDetails.getSalary()); 
 return repository.save(employee); 
 } 
 return null; 
 } 
 // Delete Employee 
 public String deleteEmployee(int id) { 
 repository.deleteById(id); 
 return "Employee deleted successfully!"; 
 } 
} 
Employee controller 
package com.example.employeeapi.controller; 
import java.util.List; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.*; 
import com.example.employeeapi.entity.Employee; 
import com.example.employeeapi.service.EmployeeService; 
@RestController @RequestMapping("/employees") 
public class EmployeeController { 
 @Autowired 
 private EmployeeService service; 
 // POST: Add Employee 
 @PostMapping 
 public Employee addEmployee(@RequestBody Employee employee) { 
 return service.saveEmployee(employee); 
 } 
 // GET: All Employees 
 @GetMapping 
 public List<Employee> getAllEmployees() { 
 return service.getAllEmployees(); 
 } 
// GET: Employee By ID
 @GetMapping("/{id}") 
 public Employee getEmployeeById(@PathVariable int id) { 
 return service.getEmployeeById(id); 
 } 
// PUT: Update Employee
 @PutMapping("/{id}") 
 public Employee updateEmployee(@PathVariable int id, @RequestBody Employee 
employee) { 
 return service.updateEmployee(id, employee); 
 } // DELETE: Delete Employee 
 @DeleteMapping("/{id}") 
 public String deleteEmployee(@PathVariable int id) { 
return service.deleteEmployee(id); 
} 
}