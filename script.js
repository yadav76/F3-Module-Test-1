var studentId = 0;
var students = [];

function addStudentRecord() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    const degree = document.getElementById('degree').value;

    //Inputs Mandatory, Blank will not be submitted.
    if (name == '' || email == '' || age == '' || grade == '' || degree == "") {
        alert("All Fields Are Compulsory")
        return;
    }

    studentId++;

    // add recode into Students Array
    students.push({
        ID: studentId, name: name, email: email, age: age, grade: grade, degree: degree
    });

    //Store data into local Storage of Browser 
    localStorage.setItem("students", JSON.stringify(students));

    // Clear all Fields 
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('age').value = "";
    document.getElementById('grade').value = "";
    document.getElementById('degree').value = "";
    console.log(students);
    showTable();
}

function showTable() {
    const tableBody = document.getElementById('table-body');
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.firstChild);
    }

    tableBody.value = "";
    students.forEach((student) => {
        const row = document.createElement("tr");

        var keys = Object.keys(student);
        var id = document.createElement('td');

        const name = document.createElement('td');
        const email = document.createElement('td');
        const age = document.createElement('td');
        const grade = document.createElement('td');
        const degree = document.createElement('td');

        keys.forEach((key) => {
            if (key == 'ID') {
                id.innerHTML = student[key];
            }
            else if (key == 'name') {
                name.innerHTML = student[key];
            }
            else if (key == 'email') {
                email.innerHTML = student[key];
            }
            else if (key == 'age') {
                age.innerHTML = student[key];
            }
            else if (key == 'grade') {
                grade.innerHTML = student[key];
            }
            else
                degree.innerHTML = `<div>${
                    student[key]
                }
                </div> <div class="icons"><a onClick="edit(${student['ID']})" class='fa'>&#xf044;</a> <a onClick="del(${student['ID']})" class='fa'>&#xf1f8;</a> </div> `;

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(age);
            row.appendChild(grade);
            row.appendChild(degree);
        })
        tableBody.appendChild(row);
    })
}

function searchStudent() {
    var input, filter, table, tr, t1, i, Value1, Value2, Value3;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-body");
    tr = table.getElementsByTagName("tr");

    // Search in Students Array and Those who not match Hide those Students
    for (i = 0; i < tr.length; i++) {
        t1 = tr[i].getElementsByTagName("td")[1];
        t2 = tr[i].getElementsByTagName("td")[2];
        t3 = tr[i].getElementsByTagName("td")[5];

        if (t1 || t2 || t2) {
            Value1 = t1.textContent || t1.innerText;
            Value2 = t2.textContent || t2.innerText;
            Value3 = t3.textContent || t3.innerText;

            if (Value1.toUpperCase().indexOf(filter) > -1 || Value2.toUpperCase().indexOf(filter) > -1 || Value3.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }

            else {
                tr[i].style.display = "none";
            }

        }
    }
}

// Edit Student Record by ID of Student
function edit(id) {
    students.forEach((student) => {
        if (student['ID'] == id) {
            document.getElementById('name').value = student['name'];
            document.getElementById('email').value = student['email'];
            document.getElementById('age').value = student['age'];
            document.getElementById('grade').value = student['grade'];
            document.getElementById('degree').value = student['degree'];
            document.getElementById('submit').innerText = 'Edit Student';

            document.getElementById("submit").onclick = function jsFunc() {

                student['name'] = document.getElementById('name').value;
                student['email'] = document.getElementById('email').value;
                student['age'] = document.getElementById('age').value;
                student['grade'] = document.getElementById('grade').value;
                student['degree'] = document.getElementById('degree').value;

                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
                document.getElementById('age').value = "";
                document.getElementById('grade').value = "";
                document.getElementById('degree').value = "";

                document.getElementById('submit').innerText = 'Add Student';

                showTable();
            }
        }
    })
}

// To Delete The Record from Students Array
function del(id) {
    students.forEach((student, index) => {
        if (student['ID'] == id) {
            students.splice(index, 1);
            showTable();
        }
    })
}

// To Delete The Record from LocatStorages of Browser 
window.onload = () => {
    students = JSON.parse(localStorage.getItem('students')) || [];
    studentId = students.reduce((max, student) => Math.max(max, student.ID), 0);
    showTable();
};

// Store Item to LocalStorage of Browser 
window.onbeforeunload = () => {
    localStorage.setItem('students', JSON.stringify(students));
};