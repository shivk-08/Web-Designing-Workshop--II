<project xmlns="http://maven.apache.org/POM/4.0.0" 
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
 xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
 https://maven.apache.org/xsd/maven-4.0.0.xsd"> 
 <modelVersion>4.0.0</modelVersion> 
 <groupId>com.example</groupId> 
 <artifactId>student-rest-api</artifactId> 
 <version>0.0.1-SNAPSHOT</version> 
 <parent> 
 <groupId>org.springframework.boot</groupId> 
 <artifactId>spring-boot-starter-parent</artifactId> 
 <version>3.2.5</version> 
 </parent> 
 <properties> 
 <java.version>17</java.version> 
 </properties> 
 <dependencies> 
 <!-- Spring Web Dependency --> 
 <dependency> 
 <groupId>org.springframework.boot</groupId> 
 <artifactId>spring-boot-starter-web</artifactId> 
 </dependency> 
 </dependencies> 
 <build> <plugins> 
 <plugin> 
 <groupId>org.springframework.boot</groupId> 
 <artifactId>spring-boot-maven-plugin</artifactId> 
 </plugin> 
 </plugins> 
 </build> 
</project> 
package com.example.student; 
// Model class representing Student entity 
public class Student { 
 private int id; 
 private String name; 
 private String course; 
 // Default constructor 
 public Student() { 
 } 
 // Parameterized constructor 
 public Student(int id, String name, String course) { 
 this.id = id; 
 this.name = name; 
 this.course = course; 
 } // Getter and Setter methods 
 public int getId() { 
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
 public String getCourse() { 
 return course; 
 } 
 public void setCourse(String course) { 
 this.course = course; 
 } 
} 
package com.example.student; 
import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity; import org.springframework.web.bind.annotation.*; 
// REST Controller 
@RestController 
@RequestMapping("/") 
public class StudentController { 
 private Student student; 
 // Welcome endpoint 
 @GetMapping 
 public String welcomeMessage() { 
 return "Welcome to Student Management REST API"; 
 } 
 // GET student details 
 @GetMapping("/student") 
 public ResponseEntity<Student> getStudent() { 
 if (student == null) { 
 return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
 } 
 return new ResponseEntity<>(student, HttpStatus.OK); 
 } 
 // POST student data 
 @PostMapping("/student") 
 public ResponseEntity<Student> createStudent(@RequestBody Student student) { 
 this.student = student; return new ResponseEntity<>(student, HttpStatus.CREATED); 
 } 
} 
package com.example.student; 
import org.springframework.boot.SpringApplication; 
import org.springframework.boot.autoconfigure.SpringBootApplication; 
// Main Spring Boot Application 
@SpringBootApplication 
public class StudentRestApiApplication { 
 public static void main(String[] args) { 
 SpringApplication.run(StudentRestApiApplication.class, args); 
 } 
}