let X;
let Y;
let R;
let first = true;
function onSubmit() {
    if (validateForm()) {
        let xRadioButtons = document.getElementsByName("x__");
        for (let xRadioButton of xRadioButtons) {
            if (xRadioButton.checked) {
                X = xRadioButton.value;
                break;
            }
        }

        let rRadioButtons = document.getElementById("r__");
        for (let rRadioButton of rRadioButtons) {
            if (rRadioButton.checked) {
                R = rRadioButton.value;
                break;
            }
        }
        
        Y = document.getElementById("y__").value.replace(/,/, '.');
        console.log("Влад Лошпед")
        $.post("/php/data.php", {x : X, y: Y, r: R}, 
        function (data) {
            console.log("Влад Лох");
            if (data !== "error") {
                let array = data.split("|");
                addRow(array[0], array[1], array[2], array[3], array[4], array[5]);
                addCircle(array[2], array[3], array[4], array[5]);
            }
        });
    }
}


function validateForm() {
    const yValue = document.getElementById("y__").value.trim().replace(/,/, '.');
    if (yValue === "") {
        alert("Заполните поле Значение Y!!!");
        return false;
    } else if (isNaN(Number(yValue))) {
            alert("Поле Значение Y принимает только числа");
            return false;
    } else if (yValue >= 5 || yValue <= -5) {
            alert("Значение Y не входит в установленные рамки");
            return false;
    }
    else {
        console.log(yValue)
        return true;
    }
}

function addRow(cur_time, comp_time, x, y, r, result){
    let tbody = document.getElementById("database")[0].getElementsByTagName('TBODY')[0];
    let row = document.createElement("TR");
    tbody.append(row);
    if (first) {
        first = false;
        document.getElementById("no_result").remove();
    }

    let th1 = document.createElement("TD");
    let th2 = document.createElement("TD");
    let th3 = document.createElement("TD");
    let th4 = document.createElement("TD");
    let th5 = document.createElement("TD");
    let th6 = document.createElement("TD");

    row.appendChild(th1);
    row.appendChild(th2);
    row.appendChild(th3);
    row.appendChild(th4);
    row.appendChild(th5);
    row.appendChild(th6);


    th1.innerHTML = cur_time;
    th2.innerHTML = comp_time;
    th3.innerHTML = x;
    th4.innerHTML = y;
    th5.innerHTML = r;
    th6.innerHTML = result;
    if (result === "Точка не попала в облась видимости") {
        row.className = "notGetIn";
    }
    else {
        row.className = "getIn";
    }
}

function clearHistory(){
    if (!first) {
        $.post("./php/reseting.php");
        first = true;
        let tbody = document.getElementsByClassName("database")[0].getElementsByTagName('TBODY')[0];
        tbody.innerHTML = '<tr id="no_result"><th colspan="6">No results</th></tr>';
    }
}