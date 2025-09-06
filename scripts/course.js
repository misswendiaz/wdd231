// ==========================
// COURSE DATA
// ==========================
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]


// ==========================
// CREATE COURSE CARDS
// ==========================
// This builds HTML cards for each course dynamically
function createCourseCards(coursesArray) {
    return coursesArray.map(course => {
        return `
            <div class="courseCard">
                <p>
                    ${course.subject} ${course.number}
                    <span class="status ${course.completed ? "completed" : "not-completed"}">
                        ${course.completed ? "✔️ Completed" : "❌ Not Completed"}
                    </span>
                </p>
                <h3>${course.title}</h3>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
                <p class="desc">${course.description}</p>
            </div>
        `;
    }).join(""); // join makes it one string instead of an array
}


// ==========================
// DISPLAY CREDITS
// ==========================
// Calculates and displays total + completed credits for a given array
function displayCredits(coursesArray) {
    const totalCredits = coursesArray.reduce((sum, course) => sum + course.credits, 0);
    const completedCredits = coursesArray
        .filter(course => course.completed)
        .reduce((sum, course) => sum + course.credits, 0);

    document.getElementById("credits").innerHTML = `
        <p><strong>Total Credits:</strong> ${totalCredits}</p>
        <p><strong>Completed Credits:</strong> ${completedCredits}</p>
    `;
}


// ==========================
// UPDATE UI
// ==========================
// Re-renders both the course cards and the credits at the same time
function updateUI(coursesArray) {
    document.getElementById("courseCards").innerHTML = createCourseCards(coursesArray);
    displayCredits(coursesArray);
}


// ==========================
// ACTIVE BUTTON HANDLER
// ==========================
// Highlights the currently selected button
function setActiveButton(buttonId) {
    document.querySelectorAll("#certificates button").forEach(btn => {
        btn.classList.remove("active");
    });
    document.getElementById(buttonId).classList.add("active");
}


// ==========================
// FILTER FUNCTIONS
// ==========================

// Show all courses
function getAllCourses() {
    updateUI(courses);
    setActiveButton("all-btn");
}

// Show only CSE courses
function getCSECourses() {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    updateUI(cseCourses);
    setActiveButton("cse-btn");
}

// Show only WDD courses
function getWDDCourses() {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    updateUI(wddCourses);
    setActiveButton("wdd-btn");
}


// ==========================
// EVENT LISTENERS
// ==========================
// These connect the buttons to the filter functions
document.getElementById("all-btn").addEventListener("click", (e) => {
    e.preventDefault();
    getAllCourses();
});

document.getElementById("cse-btn").addEventListener("click", (e) => {
    e.preventDefault();
    getCSECourses();
});

document.getElementById("wdd-btn").addEventListener("click", (e) => {
    e.preventDefault();
    getWDDCourses();
});


// ==========================
// INITIAL LOAD
// ==========================
// Start with "All" selected when the page loads
getAllCourses();
