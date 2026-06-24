function generateInputs() {
    const count = parseInt(document.getElementById("subjectCount").value);
    const container = document.getElementById("marksContainer");

    container.innerHTML = "";

    if (isNaN(count) || count <= 0) {
        alert("Please enter a valid number of subjects.");
        return;
    }

    for (let i = 1; i <= count; i++) {
        const div = document.createElement("div");
        div.classList.add("subject-input");

        div.innerHTML = `
            <label>Subject ${i} Marks:</label>
            <input type="number" class="marks" min="0" max="100" placeholder="Enter marks">
        `;

        container.appendChild(div);
    }
}

function calculateResult() {
    const marks = document.querySelectorAll(".marks");

    if (marks.length === 0) {
        alert("Generate subject fields first.");
        return;
    }

    let total = 0;
    let pass = true;

    marks.forEach(mark => {
        const value = Number(mark.value);

        if (value < 0 || value > 100 || mark.value === "") {
            alert("Please enter valid marks between 0 and 100.");
            pass = false;
            return;
        }

        total += value;

        if (value < 33) {
            pass = false;
        }
    });

    const average = total / marks.length;

    let grade;

    if (average >= 90) {
        grade = "A+";
    } else if (average >= 80) {
        grade = "A";
    } else if (average >= 70) {
        grade = "B";
    } else if (average >= 60) {
        grade = "C";
    } else if (average >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = `
        <h2>Result</h2>
        <p><strong>Total Marks:</strong> ${total}</p>
        <p><strong>Average:</strong> ${average.toFixed(2)}</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <p class="${pass ? 'pass' : 'fail'}">
            ${pass ? 'PASS ✅' : 'FAIL ❌'}
        </p>
    `;
}