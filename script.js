const students = [
  {
    name: "Aarav Sharma",
    marks: 91,
    class: "Computer Science",
    address: "12 Park Street, Delhi",
  },
  {
    name: "Priya Verma",
    marks: 88,
    class: "Information Technology",
    address: "44 Lake Road, Pune",
  },
  {
    name: "Rahul Singh",
    marks: 84,
    class: "Mechanical Engineering",
    address: "8 MG Road, Jaipur",
  },
  {
    name: "Ananya Gupta",
    marks: 95,
    class: "Business Administration",
    address: "77 Green Avenue, Mumbai",
  },
  {
    name: "Vikram Patel",
    marks: 79,
    class: "Electronics",
    address: "19 Market Street, Ahmedabad",
  },
  {
    name: "Neha Kapoor",
    marks: 93,
    class: "Data Science",
    address: "31 Hill View, Bengaluru",
  },
  {
    name: "Karan Mehta",
    marks: 81,
    class: "Civil Engineering",
    address: "55 River Lane, Lucknow",
  },
  {
    name: "Isha Nair",
    marks: 87,
    class: "Psychology",
    address: "23 Coastal Road, Kochi",
  },
  {
    name: "Aditya Roy",
    marks: 96,
    class: "Artificial Intelligence",
    address: "66 Sunset Blvd, Hyderabad",
  },
  {
    name: "Pooja Reddy",
    marks: 82,
    class: "Commerce",
    address: "10 Central Park, Chennai",
  },
  {
    name: "Siddharth Joshi",
    marks: 89,
    class: "Architecture",
    address: "48 Lake Side, Bhopal",
  },
  {
    name: "Meera Khan",
    marks: 90,
    class: "English Literature",
    address: "90 Garden Street, Kolkata",
  },
];

const studentDetails = document.querySelector(".stud-details");

function renderStudents(studentList) {
  // map() creates one card element per student
  studentDetails.innerHTML = "";

  const part = document.createDocumentFragment();

  if (studentList.length) {
    studentList.map((student) => {
      const card = document.createElement("article");
      card.className = "student-card";
      card.innerHTML = `
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Marks:</strong> ${student.marks}</p>
        <p><strong>Class:</strong> ${student["class"]}</p>
        <p><strong>Address:</strong> ${student.address}</p>
      `;
      part.appendChild(card);
      return card;
    });
  } else {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = "No students match your search.";
    part.appendChild(emptyState);
  }

  studentDetails.appendChild(part);
}

renderStudents(students);

const searchBar = document.getElementById("bar");

searchBar.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  // filter() narrows the student list by name before we render the results again.
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchText),
  );

  renderStudents(filteredStudents);
});
