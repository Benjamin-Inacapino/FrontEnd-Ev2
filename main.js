/* -------------------------------------------------->
   --- Establecemos algunas variables -->
   --- globales que vamos a ocupar.   -->
   -------------------------------------------------->  */
const students=[]
const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");

const firstNameValidation = "Por favor, complete el campo 'Nombre'.";
const lastNameValidation = "Por favor, complete el campo 'Apellido'.";
const gradeValidation = "Por favor, complete el campo 'Calificación'.";


/* -------------------------------------------------->
    --- Añadimos el estudiante a  -->
    --- la tabla de estudiantes.  -->
   -------------------------------------------------->  */
function addStudentToTable(student, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td>
            <button onclick="editStudent(${index})">Editar</button>
            <button onclick="deleteStudent(${index})">Eliminar</button>
        </td>`;
    tableBody.appendChild(row);
}


/* -------------------------------------------------->
   --- Calculamos el promedio -->
   -------------------------------------------------->  */
function calcularPromedio(){
    if(students.length===0){
        averageDiv.textContent="Promedio de Calificaciones: No Disponible"
        return
    }

    const total=students.reduce((sum,student)=>sum+student.grade,0);
    const prom=total/students.length;
    averageDiv.textContent="Promedio de Calificaciones: "+prom.toFixed(2);
}


/* -------------------------------------------------->
   --- Se enfoca el primer nombre y no hace falta   -->
   --- hacer nada.                                  -->
   -------------------------------------------------->  */
function focusOnFirstName() {
    // ~ Nada aqui ~ //
}


/* -------------------------------------------------->
   --- Se desenfoca el primer nombre y le ponemos   -->
   --- un error para evitar que se envíe antes de   -->
   --- rellenar este campo.                         -->
   -------------------------------------------------->  */
function blurOnFirstName() {
    const firstname=document.getElementById("firstName");

    if (!firstname || !firstname.value.trim())
        firstname.setCustomValidity("Por favor, complete el campo 'Nombre'.");
    else
        firstname.setCustomValidity("");
}


/* -------------------------------------------------->
   --- Se enfoca el apellido y nos aseguramos de    -->
   --- que el campo del nombre haya sido rellenado, -->
   --- de lo contrario ponemos un error para que    -->
   --- se rellene el campo del nombre primero       -->
   -------------------------------------------------->  */
function focusOnLastName() {
    const firstname=document.getElementById("firstName");

    if (!firstname || !firstname.value.trim()) {
        firstname.setCustomValidity(firstNameValidation);
        firstname.reportValidity();
    } else {
        firstname.setCustomValidity("");
    }
}


/* -------------------------------------------------->
   --- Se desenfoca el apellido y nos aseguramos de -->
   --- que contenga algo, de lo contrario           -->
   --- establecemos un error para evitar el envío.  -->
   -------------------------------------------------->   */
function blurOnLastName() {
    const lastname=document.getElementById("lastName");

    if (!lastname || !lastname.value.trim())
        lastname.setCustomValidity(lastNameValidation);
    else
        lastname.setCustomValidity("");
}


/* -------------------------------------------------->
   --- Se hace enfoque en la nota del estudiante    -->
   --- y nos aseguramos de que los dos campos       -->
   --- anteriores hayan sido rellenados.            -->
   -------------------------------------------------->   */
function focusOnGrade() {
    const firstname=document.getElementById("firstName");
    const lastname=document.getElementById("lastName");

    if (!firstname || !firstname.value.trim()) {
        firstname.setCustomValidity(firstNameValidation);
        firstname.reportValidity();
    } else {
        firstname.setCustomValidity("");
    }

    if (!firstname || !lastname.value.trim()) {
        lastname.setCustomValidity(lastNameValidation);
        lastname.reportValidity();
    } else {
        lastname.setCustomValidity("");
    }
}


/* -------------------------------------------------->
   --- Se desenfoca el campo de la Calificación     -->
   --- y verificamos que el campo contenga algo, de -->
   --- lo contrario establecemos un error.          -->
   -------------------------------------------------->   */
function blurOnGrade() {
    const grade=document.getElementById("grade");

    if (!grade || !grade.value.trim())
        grade.setCustomValidity(gradeValidation);
    else
        grade.setCustomValidity("");
}


/* -------------------------------------------------->
   --- Ejecutamos las funciones para establecer los -->
   --- errores y evitar el envio de un formulario   -->
   --- vacio.                                       -->
   -------------------------------------------------->   */
blurOnFirstName();
blurOnLastName();
blurOnGrade();


/* -------------------------------------------------->
   --- Funcion final que maneja el envio del        -->
   --- formulario,                                  -->
   -------------------------------------------------->   */
document.getElementById("studentForm").addEventListener("submit", function (e) {
    const name=document.getElementById("firstName").value.trim();
    const lastName=document.getElementById("lastName").value.trim();
    const grade=parseFloat(document.getElementById("grade").value);

    e.preventDefault();

    if(!name || !lastName || isNaN(grade) || grade<1 || grade>7){
        alert("Error al ingresar Datos")
        return
    }

    const student={name,lastName,grade};

    addStudentToTable(student, students.length);
    students.push(student);

    calcularPromedio();
    this.reset();

    blurOnFirstName();
    blurOnLastName();
    blurOnGrade();
});

function deleteStudent(index) {
    students.splice(index, 1);
    tableBody.innerHTML = "";
    students.forEach((s, i) => addStudentToTable(s, i));
    calcularPromedio();
}

