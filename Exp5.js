employees = [];

function addEmployee(){
    let name = document.getElementById("empName").value;
    let id = document.getElementById("empId").value;
    let salary = parseFloat(document.getElementById("empSalary").value);
    let dept = document.getElementById("empDep").value;

    if(name === "" || id === "" || isNaN(salary) || dept === ""){
        alert("Please fill all the details.");
        return;
    }
    let employee = {
        name: name, id: id, salary: salary, dept: dept
    };
    employees.push(employee);
    alert("Employee Added Successfully.");
    document.getElementById("empName").value = "";
    document.getElementById("empId").value = "";
    document.getElementById("empSalary").value = "";
    document.getElementById("empDep").value = "";
}

function displayAll(){
    let output = "<h3>All Employees</h3>";
    if(employees.length === 0){
        output = "<h3>No employees found.</h3>"
    }
    employees.forEach(emp => {
        output += `<h4>Name: ${emp.name} | ID:  ${emp.id} | Salary: ${emp.salary} | Department: ${emp.dept} </h4>`;
    });

    document.getElementById("output").innerHTML = output;
}

function salaryOver5000(){
    let output = "<h3>Employees having salary over 5000 are: </h3>";
    let found = false;
    
    employees.forEach(emp => {
        if(emp.salary > 5000){
            output += `
            <h4>Name: ${emp.name} <br>Salary: ${emp.salary} </h4>
            `;
            found = true; 
        }
    });
    if(found === false){
        output = "<h3>No employee has salary over 5000.</h3>";
    }
    document.getElementById("output").innerHTML = output;
}

function totalSalary(){
    let total = 0;

    employees.forEach(emp => {
        total += emp.salary
    });
    document.getElementById("output").innerHTML = "<h4>The total income is " + total + ".</h4>";
}

function averageSalary(){
    let total = 0;

    employees.forEach(emp => {
        total += emp.salary
    });
    if(employees.length === 0){
        output = 0;
    }
    else{
        output = total / employees.length;
    }
    document.getElementById("output").innerHTML = "<h4>The average income is " + output + ".</h4>";
}

function count(){
    let targetDept = prompt("Enter Department name :");
    let count = 0;

    employees.forEach(emp => {
        if(emp.dept === targetDept){
            count = count + 1;
        }
    });

    document.getElementById("output").innerHTML = "<h4>The specified department (" + targetDept + ") consists of " + count + " employees.</h4>";
}