function generatePattern() {
    let n = document.getElementById("rows").value;
    let result = document.getElementById("result");

    if (n === "" || n <= 0) {
        result.textContent = "Please enter a valid number!";
        return;
    }

    let output = "";

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            output += j + " ";
        }
        output += "\n";
    }

    result.textContent = output;
}