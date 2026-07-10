const students = [
  {
    name: "Aarav Sharma",
    age: 19,
    course: "Computer Science",
    address: "12 Park Street, Delhi",
  },
  {
    name: "Priya Verma",
    age: 20,
    course: "Information Technology",
    address: "44 Lake Road, Pune",
  },
  {
    name: "Rahul Singh",
    age: 18,
    course: "Mechanical Engineering",
    address: "8 MG Road, Jaipur",
  },
  {
    name: "Ananya Gupta",
    age: 21,
    course: "Business Administration",
    address: "77 Green Avenue, Mumbai",
  },
  {
    name: "Vikram Patel",
    age: 22,
    course: "Electronics",
    address: "19 Market Street, Ahmedabad",
  },
  {
    name: "Neha Kapoor",
    age: 19,
    course: "Data Science",
    address: "31 Hill View, Bengaluru",
  },
  {
    name: "Karan Mehta",
    age: 20,
    course: "Civil Engineering",
    address: "55 River Lane, Lucknow",
  },
  {
    name: "Isha Nair",
    age: 18,
    course: "Psychology",
    address: "23 Coastal Road, Kochi",
  },
  {
    name: "Aditya Roy",
    age: 21,
    course: "Artificial Intelligence",
    address: "66 Sunset Blvd, Hyderabad",
  },
  {
    name: "Pooja Reddy",
    age: 20,
    course: "Commerce",
    address: "10 Central Park, Chennai",
  },
  {
    name: "Siddharth Joshi",
    age: 22,
    course: "Architecture",
    address: "48 Lake Side, Bhopal",
  },
  {
    name: "Meera Khan",
    age: 19,
    course: "English Literature",
    address: "90 Garden Street, Kolkata",
  },
];

const studentDivs = document.querySelectorAll(".stud-details div");

studentDivs.forEach((div, index) => {
  const student = students[index];
  div.innerHTML = `
    <p><strong>Name:</strong> ${student.name}</p>
    <p><strong>Age:</strong> ${student.age}</p>
    <p><strong>Course:</strong> ${student.course}</p>
    <p><strong>Address:</strong> ${student.address}</p>
  `;
});

const searchBar = document.getElementById("bar");

searchBar.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();

  students.forEach((student, index) => {
    if (student.name.toLowerCase().includes(searchText)) {
      studentDivs[index].style.display = "block";
    } else {
      studentDivs[index].style.display = "none";
    }
  });
});
