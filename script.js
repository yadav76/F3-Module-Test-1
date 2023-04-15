var studentId = 0;
var students = [];

function addStudentRecord() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;


    const error = document.getElementById('error');
    //Inputs Mandatory, Blank will not be submitted.
    if (name == '' || email == '' || age == '') {

        error.innerHTML = "Error : Please Make sure All the fields are filled before adding in an employee !";

        setTimeout(() => {
            error.innerHTML = "";
        },2000);

        return;
    }

    studentId++;

    // add recode into Students Array
    students.push({
        ID: studentId, name: name, email: email, age: age,
    });

    //Store data into local Storage of Browser 
    localStorage.setItem("students", JSON.stringify(students));

    // Clear all Fields 
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('age').value = "";
    console.log(students);
    showTable();
}

function showTable() {

    const success = document.getElementById('success');

    success.innerHTML = "Success : Employee Added!";

    setTimeout(() => {
        success.innerHTML = "";
    },2000);

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
  

        keys.forEach((key) => {
            if (key == 'id') {
                id.innerHTML = student[ID];
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
            else

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(age);

        })
        tableBody.appendChild(row);
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