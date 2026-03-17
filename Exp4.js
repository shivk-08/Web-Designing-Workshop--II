function calculateResult(){
    let n = document.getElementById("subjects").value;
    let total = 0;
     
    for(let i = 1;i <= n;i++){
        let temp = parseFloat(prompt("Enter marks of the subject " + i));
        total = total + temp;
    }

    let average = total / n;

    let grade;
    let result;

    if(average >= 90){
        grade = "A+";
    }
    else if(average >= 75){
        grade = "A";
    }
    else if(average >= 60){
        grade = "C";
    }
    else if(average >= 50){
        grade = "E";
    }
    else{
        grade = "F";
    }

    if(average >= 40){
        result = "Pass";
    }
    else{
        result = "Fail";
    }

    document.getElementById("output").innerHTML = 
    "Total Marks : " + total + "<br>" +
    "Average Marks : " + average.toFixed(2) + "<br>" +
    "Grade : " + grade + "<br>" +
    "Result : " + result;
}
