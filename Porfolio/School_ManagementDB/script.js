
document.getElementById('addStudentForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const studentData = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        gender: document.getElementById('gender').value,
        dob: document.getElementById('dob').value,
        address: document.getElementById('address').value,
        contact_number: document.getElementById('contact_number').value,
        email: document.getElementById('email').value,
        enrollment_date: document.getElementById('enrollment_date').value,
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/add_student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });

        const result = await response.json();
        document.getElementById('student-result').innerText = result.message || 'Error: ' + result.error;
        loadStudents();
    } catch (error) {
        document.getElementById('student-result').innerText = 'Error: ' + error.message;
    }
});

document.getElementById('addClassForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const classData = {
        class_name: document.getElementById('class-name').value,
        teacher_id: document.getElementById('teacher-id').value,
        schedule: document.getElementById('schedule').value,
        room_number: document.getElementById('room_number').value
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/add_class', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(classData)
        });

        const result = await response.json();
        document.getElementById('class-result').innerText = result.message || 'Error: ' + result.error;
    } catch (error) {
        document.getElementById('class-result').innerText = 'Error: ' + error.message;
    }
});

// Load students
async function loadStudents() {
    try {
        const response = await fetch('http://127.0.0.1:5000/students');
        const students = await response.json();

        let html = '';
        students.forEach(student => {
            html += `
                <div class="student">
            ${student.first_name} ${student.last_name} 
                    <button onclick="confirmDelete(${student.id}, '${student.first_name}', '${student.last_name}')">Delete</button>
                </div>`;
        });

        document.getElementById('students-list').innerHTML = html;
    } catch (error) {
        document.getElementById('students-list').innerText = 'Error loading students: ' + error.message;
    }
}

function confirmDelete(studentId, firstName, lastName) {
    document.getElementById('confirmationModal').style.display = 'block';
    document.getElementById('confirmMessage').innerText = `Are you sure you want to delete ${firstName} ${lastName}?`;

    document.getElementById('confirmYes').onclick = async function() {
        await deleteStudent(studentId);
        document.getElementById('confirmationModal').style.display = 'none';
        loadStudents();
    };

    document.getElementById('confirmNo').onclick = function() {
        document.getElementById('confirmationModal').style.display = 'none';
    };
modal.style.display = 'block';
}


async function deleteStudent(studentId) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/delete_student/${studentId}`, { method: 'DELETE' });
        const result = await response.json();
        document.getElementById('student-result').innerText = result.message || 'Error: ' + result.error;
    } catch (error) {
        document.getElementById('student-result').innerText = 'Error: ' + error.message;
    }
}
document.getElementById('refresh-btn').onclick = loadStudents;
document.getElementById('display-all-btn').onclick = loadStudents;

window.onload = loadStudents;



