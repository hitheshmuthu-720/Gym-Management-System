// Login

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        if (
            email === "admin@fitzone.com" &&
            password === "admin123"
        ) {

            localStorage.setItem("isLoggedIn", "true");

            window.location.href = "dashboard.html";

        } else {

            document.getElementById("loginMessage").textContent =
                "Invalid email or password";

        }

    });

}


// Forgot Password

const forgotForm =
    document.getElementById("forgotForm");

if (forgotForm) {

    forgotForm.addEventListener("submit", function(event) {

        event.preventDefault();

        document.getElementById("forgotMessage").textContent =
            "Password reset link sent successfully!";

    });

}
// Logout

function logout() {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";
}


// Protect Dashboard

// Protect all admin pages
const adminPages = [
    "dashboard.html",
    "members.html",
    "trainers.html",
    "memberships.html",
    "attendance.html",
    "workouts.html",
    "payments.html",
    "profile.html",
    "settings.html"
];

const currentPage = window.location.pathname.split("/").pop();

if (
    adminPages.includes(currentPage) &&
    localStorage.getItem("isLoggedIn") !== "true"
) {
    window.location.href = "login.html";
}
// =============================
// MEMBER MANAGEMENT
// =============================


// Get existing members

let members =
    JSON.parse(localStorage.getItem("members")) || [

        {
            name: "Rahul Kumar",
            email: "rahul@gmail.com",
            phone: "9876543210",
            gender: "Male",
            age: "24",
            plan: "Premium",
            joiningDate: "2026-09-01",
            status: "Active"
        },

        {
            name: "Priya Sharma",
            email: "priya@gmail.com",
            phone: "9876543211",
            gender: "Female",
            age: "22",
            plan: "Standard",
            joiningDate: "2026-08-15",
            status: "Active"
        },

        {
            name: "Arun Raj",
            email: "arun@gmail.com",
            phone: "9876543212",
            gender: "Male",
            age: "28",
            plan: "Basic",
            joiningDate: "2026-07-20",
            status: "Inactive"
        }

    ];


// Save members

function saveMembers() {

    localStorage.setItem(
        "members",
        JSON.stringify(members)
    );

}


// Display members

function displayMembers() {

    const tableBody =
        document.getElementById("membersTableBody");

    if (!tableBody) {
        return;
    }


    const search =
        document
            .getElementById("memberSearch")
            .value
            .toLowerCase();


    const planFilter =
        document.getElementById(
            "membershipFilter"
        ).value;


    const statusFilter =
        document.getElementById(
            "statusFilter"
        ).value;


    tableBody.innerHTML = "";


    members.forEach(function(member, index) {

        const matchesSearch =
            member.name
                .toLowerCase()
                .includes(search);


        const matchesPlan =
            planFilter === "All" ||
            member.plan === planFilter;


        const matchesStatus =
            statusFilter === "All" ||
            member.status === statusFilter;


        if (
            matchesSearch &&
            matchesPlan &&
            matchesStatus
        ) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <strong>
                        ${member.name}
                    </strong>
                </td>

                <td>
                    ${member.email}
                </td>

                <td>
                    ${member.phone}
                </td>

                <td>
                    ${member.gender}
                </td>

                <td>
                    ${member.age}
                </td>

                <td>
                    ${member.plan}
                </td>

                <td>
                    ${member.joiningDate}
                </td>

                <td>

                    <span class="${
                        member.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }">

                        ${member.status}

                    </span>

                </td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editMember(${index})">

                        Edit

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteMember(${index})">

                        Delete

                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        }

    });

}


// Open form

function openMemberForm() {

    document.getElementById(
        "memberFormContainer"
    ).style.display = "block";

}


// Close form

function closeMemberForm() {

    document.getElementById(
        "memberFormContainer"
    ).style.display = "none";

    document.getElementById(
        "memberForm"
    ).reset();

    document.getElementById(
        "editIndex"
    ).value = "";

    document.getElementById(
        "formTitle"
    ).textContent = "Add New Member";

}


// Add / Edit member

const memberForm =
    document.getElementById("memberForm");


if (memberForm) {

    memberForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const editIndex =
                document.getElementById(
                    "editIndex"
                ).value;


            const member = {

                name:
                    document.getElementById(
                        "memberName"
                    ).value,

                email:
                    document.getElementById(
                        "memberEmail"
                    ).value,

                phone:
                    document.getElementById(
                        "memberPhone"
                    ).value,

                gender:
                    document.getElementById(
                        "memberGender"
                    ).value,

                age:
                    document.getElementById(
                        "memberAge"
                    ).value,

                plan:
                    document.getElementById(
                        "memberPlan"
                    ).value,

                joiningDate:
                    document.getElementById(
                        "joiningDate"
                    ).value,

                status:
                    document.getElementById(
                        "memberStatus"
                    ).value

            };


            if (editIndex === "") {

                members.push(member);

            } else {

                members[
                    Number(editIndex)
                ] = member;

            }


            saveMembers();

            displayMembers();

            closeMemberForm();

        }
    );

}


// Edit member

function editMember(index) {

    const member = members[index];


    document.getElementById(
        "memberFormContainer"
    ).style.display = "block";


    document.getElementById(
        "formTitle"
    ).textContent =
        "Edit Member";


    document.getElementById(
        "editIndex"
    ).value = index;


    document.getElementById(
        "memberName"
    ).value = member.name;


    document.getElementById(
        "memberEmail"
    ).value = member.email;


    document.getElementById(
        "memberPhone"
    ).value = member.phone;


    document.getElementById(
        "memberGender"
    ).value = member.gender;


    document.getElementById(
        "memberAge"
    ).value = member.age;


    document.getElementById(
        "memberPlan"
    ).value = member.plan;


    document.getElementById(
        "joiningDate"
    ).value = member.joiningDate;


    document.getElementById(
        "memberStatus"
    ).value = member.status;

}


// Delete member

function deleteMember(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this member?"
        );


    if (confirmDelete) {

        members.splice(index, 1);

        saveMembers();

        displayMembers();

    }

}


// Display members when page loads

if (
    document.getElementById(
        "membersTableBody"
    )
) {

    displayMembers();

}
// =============================
// TRAINER MANAGEMENT
// =============================


// Get trainers from localStorage

let trainers =
    JSON.parse(localStorage.getItem("trainers")) || [

        {
            name: "Arun Kumar",
            specialization: "Strength Training",
            experience: "5 Years",
            phone: "9876543210",
            email: "arun@fitzone.com",
            assignedMembers: 18
        },

        {
            name: "Priya Sharma",
            specialization: "Yoga",
            experience: "4 Years",
            phone: "9876543211",
            email: "priya@fitzone.com",
            assignedMembers: 12
        },

        {
            name: "Rahul Raj",
            specialization: "Personal Training",
            experience: "7 Years",
            phone: "9876543212",
            email: "rahul@fitzone.com",
            assignedMembers: 20
        }

    ];


// Save trainers

function saveTrainers() {

    localStorage.setItem(
        "trainers",
        JSON.stringify(trainers)
    );

}


// Display trainers

function displayTrainers() {

    const container =
        document.getElementById(
            "trainerContainer"
        );


    if (!container) {

        return;

    }


    const search =
        document
            .getElementById("trainerSearch")
            .value
            .toLowerCase();


    container.innerHTML = "";


    trainers.forEach(function(trainer, index) {

        if (
            trainer.name
                .toLowerCase()
                .includes(search)
        ) {

            const card =
                document.createElement("div");


            card.className =
                "trainer-card";


            const firstLetter =
                trainer.name
                    .charAt(0)
                    .toUpperCase();


            card.innerHTML = `

                <div class="trainer-avatar">
                    ${firstLetter}
                </div>

                <h3>
                    ${trainer.name}
                </h3>

                <p class="trainer-specialization">
                    ${trainer.specialization}
                </p>

                <p class="trainer-info">
                    💼 Experience:
                    ${trainer.experience}
                </p>

                <p class="trainer-info">
                    📞 ${trainer.phone}
                </p>

                <p class="trainer-info">
                    ✉️ ${trainer.email}
                </p>

                <p class="trainer-info">
                    👥 Assigned Members:
                    ${trainer.assignedMembers}
                </p>

                <div class="trainer-actions">

                    <button
                        class="trainer-edit"
                        onclick="editTrainer(${index})">

                        Edit

                    </button>

                    <button
                        class="trainer-delete"
                        onclick="deleteTrainer(${index})">

                        Delete

                    </button>

                </div>

            `;


            container.appendChild(card);

        }

    });

}


// Open trainer form

function openTrainerForm() {

    document.getElementById(
        "trainerFormContainer"
    ).style.display = "block";

}


// Close trainer form

function closeTrainerForm() {

    document.getElementById(
        "trainerFormContainer"
    ).style.display = "none";


    document.getElementById(
        "trainerForm"
    ).reset();


    document.getElementById(
        "trainerEditIndex"
    ).value = "";


    document.getElementById(
        "trainerFormTitle"
    ).textContent =
        "Add New Trainer";

}


// Add / Edit Trainer

const trainerForm =
    document.getElementById(
        "trainerForm"
    );


if (trainerForm) {

    trainerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const editIndex =
                document.getElementById(
                    "trainerEditIndex"
                ).value;


            const trainer = {

                name:
                    document.getElementById(
                        "trainerName"
                    ).value,

                specialization:
                    document.getElementById(
                        "trainerSpecialization"
                    ).value,

                experience:
                    document.getElementById(
                        "trainerExperience"
                    ).value,

                phone:
                    document.getElementById(
                        "trainerPhone"
                    ).value,

                email:
                    document.getElementById(
                        "trainerEmail"
                    ).value,

                assignedMembers:
                    document.getElementById(
                        "assignedMembers"
                    ).value || 0

            };


            if (editIndex === "") {

                trainers.push(trainer);

            } else {

                trainers[
                    Number(editIndex)
                ] = trainer;

            }


            saveTrainers();

            displayTrainers();

            closeTrainerForm();

        }
    );

}


// Edit Trainer

function editTrainer(index) {

    const trainer =
        trainers[index];


    document.getElementById(
        "trainerFormContainer"
    ).style.display = "block";


    document.getElementById(
        "trainerFormTitle"
    ).textContent =
        "Edit Trainer";


    document.getElementById(
        "trainerEditIndex"
    ).value = index;


    document.getElementById(
        "trainerName"
    ).value =
        trainer.name;


    document.getElementById(
        "trainerSpecialization"
    ).value =
        trainer.specialization;


    document.getElementById(
        "trainerExperience"
    ).value =
        trainer.experience;


    document.getElementById(
        "trainerPhone"
    ).value =
        trainer.phone;


    document.getElementById(
        "trainerEmail"
    ).value =
        trainer.email;


    document.getElementById(
        "assignedMembers"
    ).value =
        trainer.assignedMembers;

}


// Delete Trainer

function deleteTrainer(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this trainer?"
        );


    if (confirmDelete) {

        trainers.splice(index, 1);

        saveTrainers();

        displayTrainers();

    }

}


// Display trainers when page loads

if (
    document.getElementById(
        "trainerContainer"
    )
) {

    displayTrainers();

}
// =============================
// MEMBERSHIP MANAGEMENT
// =============================


// Get membership plans

let membershipPlans =
    JSON.parse(
        localStorage.getItem("membershipPlans")
    ) || [

        {
            name: "Basic",
            duration: "1 Month",
            price: 999,
            features: [
                "Gym Access",
                "Basic Equipment",
                "Locker Facility"
            ],
            status: "Active"
        },

        {
            name: "Standard",
            duration: "3 Months",
            price: 3999,
            features: [
                "Gym Access",
                "Personal Training",
                "Workout Plan"
            ],
            status: "Active"
        },

        {
            name: "Premium",
            duration: "6 Months",
            price: 7999,
            features: [
                "Unlimited Gym Access",
                "Personal Trainer",
                "Diet Plan",
                "Priority Support"
            ],
            status: "Active"
        }

    ];


// Save plans

function saveMembershipPlans() {

    localStorage.setItem(
        "membershipPlans",
        JSON.stringify(membershipPlans)
    );

}


// Display plans

function displayMemberships() {

    const container =
        document.getElementById(
            "membershipContainer"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    membershipPlans.forEach(
        function(plan, index) {

            const card =
                document.createElement("div");

            card.className =
                "membership-card";


            const features =
                plan.features
                    .map(function(feature) {

                        return `
                            <li>✓ ${feature}</li>
                        `;

                    })
                    .join("");


            card.innerHTML = `

                <h2>
                    ${plan.name}
                </h2>

                <p class="membership-price">
                    ₹${Number(plan.price).toLocaleString()}
                </p>

                <p class="membership-duration">
                    Duration: ${plan.duration}
                </p>

                <ul class="membership-features">
                    ${features}
                </ul>

                <span class="${
                    plan.status === "Active"
                    ? "membership-status-active"
                    : "membership-status-inactive"
                }">

                    ${plan.status}

                </span>


                <div class="membership-actions">

                    <button
                        class="membership-edit"
                        onclick="editMembership(${index})">

                        Edit

                    </button>


                    <button
                        class="membership-delete"
                        onclick="deleteMembership(${index})">

                        Delete

                    </button>

                </div>

            `;


            container.appendChild(card);

        }
    );

}


// Open form

function openMembershipForm() {

    document.getElementById(
        "membershipFormContainer"
    ).style.display = "block";

}


// Close form

function closeMembershipForm() {

    document.getElementById(
        "membershipFormContainer"
    ).style.display = "none";


    document.getElementById(
        "membershipForm"
    ).reset();


    document.getElementById(
        "membershipEditIndex"
    ).value = "";


    document.getElementById(
        "membershipFormTitle"
    ).textContent =
        "Add Membership Plan";

}


// Add / Edit membership

const membershipForm =
    document.getElementById(
        "membershipForm"
    );


if (membershipForm) {

    membershipForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const editIndex =
                document.getElementById(
                    "membershipEditIndex"
                ).value;


            const featuresText =
                document.getElementById(
                    "planFeatures"
                ).value;


            const features =
                featuresText
                    .split(",")
                    .map(function(feature) {

                        return feature.trim();

                    })
                    .filter(function(feature) {

                        return feature !== "";

                    });


            const plan = {

                name:
                    document.getElementById(
                        "planName"
                    ).value,

                duration:
                    document.getElementById(
                        "planDuration"
                    ).value,

                price:
                    document.getElementById(
                        "planPrice"
                    ).value,

                features: features,

                status:
                    document.getElementById(
                        "planStatus"
                    ).value

            };


            if (editIndex === "") {

                membershipPlans.push(plan);

            } else {

                membershipPlans[
                    Number(editIndex)
                ] = plan;

            }


            saveMembershipPlans();

            displayMemberships();

            closeMembershipForm();

        }
    );

}


// Edit membership

function editMembership(index) {

    const plan =
        membershipPlans[index];


    document.getElementById(
        "membershipFormContainer"
    ).style.display = "block";


    document.getElementById(
        "membershipFormTitle"
    ).textContent =
        "Edit Membership Plan";


    document.getElementById(
        "membershipEditIndex"
    ).value = index;


    document.getElementById(
        "planName"
    ).value =
        plan.name;


    document.getElementById(
        "planDuration"
    ).value =
        plan.duration;


    document.getElementById(
        "planPrice"
    ).value =
        plan.price;


    document.getElementById(
        "planFeatures"
    ).value =
        plan.features.join(", ");


    document.getElementById(
        "planStatus"
    ).value =
        plan.status;

}


// Delete membership

function deleteMembership(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this membership plan?"
        );


    if (confirmDelete) {

        membershipPlans.splice(index, 1);

        saveMembershipPlans();

        displayMemberships();

    }

}


// Display memberships

if (
    document.getElementById(
        "membershipContainer"
    )
) {

    displayMemberships();

}
/* =========================
   ATTENDANCE MANAGEMENT
========================= */

let attendanceRecords =
    JSON.parse(localStorage.getItem("attendanceRecords")) || [
        {
            date: "2026-09-28",
            member: "Rahul Kumar",
            email: "rahul@gmail.com",
            status: "Present"
        },
        {
            date: "2026-09-28",
            member: "Priya Sharma",
            email: "priya@gmail.com",
            status: "Present"
        },
        {
            date: "2026-09-27",
            member: "Arun Raj",
            email: "arun@gmail.com",
            status: "Absent"
        }
    ];


/* Save attendance */

function saveAttendance() {

    localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(attendanceRecords)
    );

}


/* Load members into dropdown */

function loadAttendanceMembers() {

    const memberSelect =
        document.getElementById("attendanceMember");

    if (!memberSelect) {
        return;
    }

    const members =
        JSON.parse(localStorage.getItem("members")) || [];

    memberSelect.innerHTML =
        '<option value="">Select Member</option>';

    members.forEach(function(member) {

        const option =
            document.createElement("option");

        option.value = member.email;

        option.textContent = member.name;

        memberSelect.appendChild(option);

    });

}


/* Display attendance */

function displayAttendance() {

    const tableBody =
        document.getElementById("attendanceTableBody");

    if (!tableBody) {
        return;
    }

    const search =
        document.getElementById("attendanceSearch")
            .value
            .toLowerCase();

    const filterDate =
        document.getElementById("attendanceFilterDate")
            .value;

    const filterStatus =
        document.getElementById("attendanceFilterStatus")
            .value;


    tableBody.innerHTML = "";


    const filteredRecords =
        attendanceRecords.filter(function(record) {

            const matchesName =
                record.member
                    .toLowerCase()
                    .includes(search);

            const matchesDate =
                filterDate === "" ||
                record.date === filterDate;

            const matchesStatus =
                filterStatus === "All" ||
                record.status === filterStatus;

            return (
                matchesName &&
                matchesDate &&
                matchesStatus
            );

        });


    if (filteredRecords.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No attendance records found.
                </td>
            </tr>
        `;

        return;

    }


    filteredRecords.forEach(function(record) {

        const originalIndex =
            attendanceRecords.indexOf(record);

        const row =
            document.createElement("tr");


        let statusClass = "";

        if (record.status === "Present") {

            statusClass = "attendance-present";

        } else {

            statusClass = "attendance-absent";

        }


        row.innerHTML = `

            <td>${record.date}</td>

            <td>${record.member}</td>

            <td>${record.email}</td>

            <td>
                <span class="${statusClass}">
                    ${record.status}
                </span>
            </td>

            <td>

                <button
                    class="attendance-delete"
                    onclick="deleteAttendance(${originalIndex})"
                >
                    Delete
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* Mark attendance */

const attendanceForm =
    document.getElementById("attendanceForm");


if (attendanceForm) {

    attendanceForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const date =
                document.getElementById(
                    "attendanceDate"
                ).value;


            const memberEmail =
                document.getElementById(
                    "attendanceMember"
                ).value;


            const status =
                document.getElementById(
                    "attendanceStatus"
                ).value;


            const members =
                JSON.parse(
                    localStorage.getItem("members")
                ) || [];


            const selectedMember =
                members.find(function(member) {

                    return member.email === memberEmail;

                });


            if (!selectedMember) {

                document.getElementById(
                    "attendanceMessage"
                ).textContent =
                    "Please select a valid member.";

                return;

            }


            const alreadyMarked =
                attendanceRecords.some(function(record) {

                    return (
                        record.date === date &&
                        record.email === memberEmail
                    );

                });


            if (alreadyMarked) {

                document.getElementById(
                    "attendanceMessage"
                ).textContent =
                    "Attendance already marked for this member on this date.";

                return;

            }


            const newAttendance = {

                date: date,

                member: selectedMember.name,

                email: selectedMember.email,

                status: status

            };


            attendanceRecords.push(
                newAttendance
            );


            saveAttendance();

            displayAttendance();


            document.getElementById(
                "attendanceMessage"
            ).textContent =
                "Attendance marked successfully!";


            attendanceForm.reset();


            setTodayDate();

        }
    );

}


/* Delete attendance */

function deleteAttendance(index) {

    if (
        confirm(
            "Are you sure you want to delete this attendance record?"
        )
    ) {

        attendanceRecords.splice(index, 1);

        saveAttendance();

        displayAttendance();

    }

}


/* Set today's date */

function setTodayDate() {

    const dateInput =
        document.getElementById("attendanceDate");

    if (!dateInput) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    dateInput.value =
        `${year}-${month}-${day}`;

}


/* Search */

const attendanceSearch =
    document.getElementById("attendanceSearch");


if (attendanceSearch) {

    attendanceSearch.addEventListener(
        "input",
        displayAttendance
    );

}


/* Date filter */

const attendanceFilterDate =
    document.getElementById(
        "attendanceFilterDate"
    );


if (attendanceFilterDate) {

    attendanceFilterDate.addEventListener(
        "change",
        displayAttendance
    );

}


/* Status filter */

const attendanceFilterStatus =
    document.getElementById(
        "attendanceFilterStatus"
    );


if (attendanceFilterStatus) {

    attendanceFilterStatus.addEventListener(
        "change",
        displayAttendance
    );

}


/* Start attendance page */

if (
    document.getElementById(
        "attendanceTableBody"
    )
) {

    loadAttendanceMembers();

    setTodayDate();

    displayAttendance();

}
/* =========================
   WORKOUT & DIET PLANS
========================= */


let workoutPlans =
    JSON.parse(localStorage.getItem("workoutPlans")) || [
        {
            member: "Rahul Kumar",
            email: "rahul@gmail.com",
            planName: "Muscle Building Plan",
            type: "Muscle Gain",
            duration: "12 Weeks",
            trainer: "Arun Kumar",
            exercises: [
                "Bench Press",
                "Squats",
                "Deadlift",
                "Pull Ups"
            ],
            diet: "High protein breakfast, chicken or paneer for lunch, vegetables and curd for dinner.",
            status: "Active"
        },

        {
            member: "Priya Sharma",
            email: "priya@gmail.com",
            planName: "Fitness & Yoga Plan",
            type: "Fitness",
            duration: "8 Weeks",
            trainer: "Priya Sharma",
            exercises: [
                "Yoga",
                "Stretching",
                "Walking",
                "Light Cardio"
            ],
            diet: "Balanced diet with fruits, vegetables, rice, dal and adequate protein.",
            status: "Active"
        }
    ];


/* Save plans */

function saveWorkoutPlans() {

    localStorage.setItem(
        "workoutPlans",
        JSON.stringify(workoutPlans)
    );

}


/* Load members */

function loadWorkoutMembers() {

    const memberSelect =
        document.getElementById("workoutMember");

    if (!memberSelect) {
        return;
    }


    const members =
        JSON.parse(
            localStorage.getItem("members")
        ) || [];


    memberSelect.innerHTML =
        '<option value="">Select Member</option>';


    members.forEach(function(member) {

        const option =
            document.createElement("option");


        option.value =
            member.email;


        option.textContent =
            member.name;


        memberSelect.appendChild(option);

    });

}


/* Display workout plans */

function displayWorkoutPlans() {

    const container =
        document.getElementById(
            "workoutContainer"
        );


    if (!container) {
        return;
    }


    const search =
        document.getElementById(
            "workoutSearch"
        ).value.toLowerCase();


    const filterType =
        document.getElementById(
            "workoutFilterType"
        ).value;


    container.innerHTML = "";


    const filteredPlans =
        workoutPlans.filter(function(plan) {

            const matchesSearch =
                plan.member
                    .toLowerCase()
                    .includes(search) ||

                plan.planName
                    .toLowerCase()
                    .includes(search);


            const matchesType =
                filterType === "All" ||
                plan.type === filterType;


            return (
                matchesSearch &&
                matchesType
            );

        });


    if (filteredPlans.length === 0) {

        container.innerHTML = `
            <div class="dashboard-panel">
                <h3>No workout plans found.</h3>
            </div>
        `;

        return;

    }


    filteredPlans.forEach(function(plan) {

        const index =
            workoutPlans.indexOf(plan);


        const statusClass =
            plan.status === "Active"
                ? "workout-status-active"
                : "workout-status-inactive";


        const exerciseList =
            plan.exercises
                .map(function(exercise) {

                    return `<li>${exercise}</li>`;

                })
                .join("");


        const card =
            document.createElement("div");


        card.className =
            "workout-card";


        card.innerHTML = `

            <h3>
                ${plan.planName}
            </h3>

            <p class="workout-member">
                Member: ${plan.member}
            </p>

            <span class="workout-type">
                ${plan.type}
            </span>

            <div class="workout-info">

                <strong>Duration:</strong>
                ${plan.duration}

                <br>

                <strong>Trainer:</strong>
                ${plan.trainer || "Not Assigned"}

                <br>

                <strong>Status:</strong>

                <span class="${statusClass}">
                    ${plan.status}
                </span>

            </div>


            <div class="workout-section">

                <h4>Exercises</h4>

                <ul class="exercise-list">
                    ${exerciseList}
                </ul>

            </div>


            <div class="workout-section">

                <h4>Diet Plan</h4>

                <p>
                    ${plan.diet || "No diet plan assigned."}
                </p>

            </div>


            <div class="workout-actions">

                <button
                    class="workout-edit"
                    onclick="editWorkoutPlan(${index})"
                >
                    Edit
                </button>


                <button
                    class="workout-delete"
                    onclick="deleteWorkoutPlan(${index})"
                >
                    Delete
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* Open form */

function openWorkoutForm() {

    const formContainer =
        document.getElementById(
            "workoutFormContainer"
        );


    formContainer.style.display =
        "block";


    document.getElementById(
        "workoutFormTitle"
    ).textContent =
        "Create Workout Plan";


    document.getElementById(
        "workoutForm"
    ).reset();


    document.getElementById(
        "workoutEditIndex"
    ).value = "";

}


/* Close form */

function closeWorkoutForm() {

    document.getElementById(
        "workoutFormContainer"
    ).style.display =
        "none";

}


/* Save workout plan */

const workoutForm =
    document.getElementById(
        "workoutForm"
    );


if (workoutForm) {

    workoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const memberEmail =
                document.getElementById(
                    "workoutMember"
                ).value;


            const members =
                JSON.parse(
                    localStorage.getItem("members")
                ) || [];


            const selectedMember =
                members.find(function(member) {

                    return (
                        member.email ===
                        memberEmail
                    );

                });


            if (!selectedMember) {

                alert(
                    "Please select a valid member."
                );

                return;

            }


            const exercisesText =
                document.getElementById(
                    "workoutExercises"
                ).value;


            const exercises =
                exercisesText
                    .split(",")
                    .map(function(exercise) {

                        return exercise.trim();

                    })
                    .filter(function(exercise) {

                        return exercise !== "";

                    });


            const plan = {

                member:
                    selectedMember.name,

                email:
                    selectedMember.email,

                planName:
                    document.getElementById(
                        "workoutPlanName"
                    ).value,

                type:
                    document.getElementById(
                        "workoutType"
                    ).value,

                duration:
                    document.getElementById(
                        "workoutDuration"
                    ).value,

                trainer:
                    document.getElementById(
                        "workoutTrainer"
                    ).value,

                exercises:
                    exercises,

                diet:
                    document.getElementById(
                        "dietPlan"
                    ).value,

                status:
                    document.getElementById(
                        "workoutStatus"
                    ).value

            };


            const editIndex =
                document.getElementById(
                    "workoutEditIndex"
                ).value;


            if (editIndex === "") {

                workoutPlans.push(plan);

            } else {

                workoutPlans[
                    Number(editIndex)
                ] = plan;

            }


            saveWorkoutPlans();

            displayWorkoutPlans();

            closeWorkoutForm();

        }
    );

}


/* Edit plan */

function editWorkoutPlan(index) {

    const plan =
        workoutPlans[index];


    document.getElementById(
        "workoutFormContainer"
    ).style.display =
        "block";


    document.getElementById(
        "workoutFormTitle"
    ).textContent =
        "Edit Workout Plan";


    document.getElementById(
        "workoutEditIndex"
    ).value =
        index;


    document.getElementById(
        "workoutMember"
    ).value =
        plan.email;


    document.getElementById(
        "workoutPlanName"
    ).value =
        plan.planName;


    document.getElementById(
        "workoutType"
    ).value =
        plan.type;


    document.getElementById(
        "workoutDuration"
    ).value =
        plan.duration;


    document.getElementById(
        "workoutTrainer"
    ).value =
        plan.trainer;


    document.getElementById(
        "workoutExercises"
    ).value =
        plan.exercises.join(", ");


    document.getElementById(
        "dietPlan"
    ).value =
        plan.diet;


    document.getElementById(
        "workoutStatus"
    ).value =
        plan.status;

}


/* Delete plan */

function deleteWorkoutPlan(index) {

    if (
        confirm(
            "Are you sure you want to delete this workout plan?"
        )
    ) {

        workoutPlans.splice(index, 1);

        saveWorkoutPlans();

        displayWorkoutPlans();

    }

}


/* Search */

const workoutSearch =
    document.getElementById(
        "workoutSearch"
    );


if (workoutSearch) {

    workoutSearch.addEventListener(
        "input",
        displayWorkoutPlans
    );

}


/* Filter */

const workoutFilterType =
    document.getElementById(
        "workoutFilterType"
    );


if (workoutFilterType) {

    workoutFilterType.addEventListener(
        "change",
        displayWorkoutPlans
    );

}


/* Start workout page */

if (
    document.getElementById(
        "workoutContainer"
    )
) {

    loadWorkoutMembers();

    displayWorkoutPlans();

}
/* =========================
   PAYMENT MANAGEMENT
========================= */


let paymentRecords =
    JSON.parse(localStorage.getItem("paymentRecords")) || [
        {
            invoice: "INV-1001",
            member: "Rahul Kumar",
            email: "rahul@gmail.com",
            amount: 7999,
            date: "2026-09-01",
            method: "UPI",
            status: "Completed",
            renewal: "2027-03-01",
            notes: "Premium membership"
        },

        {
            invoice: "INV-1002",
            member: "Priya Sharma",
            email: "priya@gmail.com",
            amount: 3999,
            date: "2026-09-05",
            method: "Card",
            status: "Completed",
            renewal: "2026-12-05",
            notes: "Standard membership"
        },

        {
            invoice: "INV-1003",
            member: "Arun Raj",
            email: "arun@gmail.com",
            amount: 999,
            date: "2026-09-10",
            method: "Cash",
            status: "Pending",
            renewal: "2026-10-10",
            notes: "Basic membership"
        }
    ];


/* Save payments */

function savePaymentRecords() {

    localStorage.setItem(
        "paymentRecords",
        JSON.stringify(paymentRecords)
    );

}


/* Load members */

function loadPaymentMembers() {

    const memberSelect =
        document.getElementById(
            "paymentMember"
        );


    if (!memberSelect) {
        return;
    }


    const members =
        JSON.parse(
            localStorage.getItem("members")
        ) || [];


    memberSelect.innerHTML =
        '<option value="">Select Member</option>';


    members.forEach(function(member) {

        const option =
            document.createElement("option");


        option.value =
            member.email;


        option.textContent =
            member.name;


        memberSelect.appendChild(option);

    });

}


/* Display payments */

function displayPayments() {

    const tableBody =
        document.getElementById(
            "paymentTableBody"
        );


    if (!tableBody) {
        return;
    }


    const search =
        document.getElementById(
            "paymentSearch"
        ).value.toLowerCase();


    const filterStatus =
        document.getElementById(
            "paymentFilterStatus"
        ).value;


    tableBody.innerHTML = "";


    const filteredPayments =
        paymentRecords.filter(function(payment) {

            const matchesSearch =
                payment.member
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                filterStatus === "All" ||
                payment.status === filterStatus;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    if (filteredPayments.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    No payment records found.
                </td>
            </tr>
        `;

        updatePaymentSummary();

        return;

    }


    filteredPayments.forEach(function(payment) {

        const index =
            paymentRecords.indexOf(payment);


        let statusClass =
            "payment-status-completed";


        if (payment.status === "Pending") {

            statusClass =
                "payment-status-pending";

        }


        if (payment.status === "Failed") {

            statusClass =
                "payment-status-failed";

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${payment.invoice}
            </td>

            <td>
                ${payment.member}
            </td>

            <td>
                ₹${Number(payment.amount).toLocaleString("en-IN")}
            </td>

            <td>
                ${payment.date}
            </td>

            <td>
                ${payment.method}
            </td>

            <td>

                <span class="${statusClass}">
                    ${payment.status}
                </span>

            </td>

            <td>
                ${payment.renewal || "-"}
            </td>

            <td>

                <div class="payment-actions">

                    <button
                        class="payment-invoice"
                        onclick="showInvoice(${index})"
                    >
                        Invoice
                    </button>

                    <button
                        class="payment-edit"
                        onclick="editPayment(${index})"
                    >
                        Edit
                    </button>

                    <button
                        class="payment-delete"
                        onclick="deletePayment(${index})"
                    >
                        Delete
                    </button>

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });


    updatePaymentSummary();

}


/* Payment summary */

function updatePaymentSummary() {

    const totalAmount =
        paymentRecords
            .filter(function(payment) {

                return payment.status === "Completed";

            })
            .reduce(function(total, payment) {

                return total +
                    Number(payment.amount);

            }, 0);


    const completedCount =
        paymentRecords.filter(function(payment) {

            return payment.status === "Completed";

        }).length;


    const pendingCount =
        paymentRecords.filter(function(payment) {

            return payment.status === "Pending";

        }).length;


    const totalElement =
        document.getElementById(
            "totalPaymentAmount"
        );


    const completedElement =
        document.getElementById(
            "completedPaymentCount"
        );


    const pendingElement =
        document.getElementById(
            "pendingPaymentCount"
        );


    if (totalElement) {

        totalElement.textContent =
            "₹" +
            totalAmount.toLocaleString("en-IN");

    }


    if (completedElement) {

        completedElement.textContent =
            completedCount;

    }


    if (pendingElement) {

        pendingElement.textContent =
            pendingCount;

    }

}


/* Open form */

function openPaymentForm() {

    document.getElementById(
        "paymentFormContainer"
    ).style.display =
        "block";


    document.getElementById(
        "paymentFormTitle"
    ).textContent =
        "Add Payment";


    document.getElementById(
        "paymentForm"
    ).reset();


    document.getElementById(
        "paymentEditIndex"
    ).value = "";


    setPaymentDate();

}


/* Close form */

function closePaymentForm() {

    document.getElementById(
        "paymentFormContainer"
    ).style.display =
        "none";

}


/* Today's date */

function setPaymentDate() {

    const dateInput =
        document.getElementById(
            "paymentDate"
        );


    if (!dateInput) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    dateInput.value =
        `${year}-${month}-${day}`;

}


/* Save payment */

const paymentForm =
    document.getElementById(
        "paymentForm"
    );


if (paymentForm) {

    paymentForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const memberEmail =
                document.getElementById(
                    "paymentMember"
                ).value;


            const members =
                JSON.parse(
                    localStorage.getItem("members")
                ) || [];


            const selectedMember =
                members.find(function(member) {

                    return (
                        member.email ===
                        memberEmail
                    );

                });


            if (!selectedMember) {

                alert(
                    "Please select a valid member."
                );

                return;

            }


            const payment = {

                invoice:
                    document.getElementById(
                        "invoiceNumber"
                    ).value,

                member:
                    selectedMember.name,

                email:
                    selectedMember.email,

                amount:
                    document.getElementById(
                        "paymentAmount"
                    ).value,

                date:
                    document.getElementById(
                        "paymentDate"
                    ).value,

                method:
                    document.getElementById(
                        "paymentMethod"
                    ).value,

                status:
                    document.getElementById(
                        "paymentStatus"
                    ).value,

                renewal:
                    document.getElementById(
                        "renewalDate"
                    ).value,

                notes:
                    document.getElementById(
                        "paymentNotes"
                    ).value

            };


            const editIndex =
                document.getElementById(
                    "paymentEditIndex"
                ).value;


            if (editIndex === "") {

                paymentRecords.push(payment);

            } else {

                paymentRecords[
                    Number(editIndex)
                ] = payment;

            }


            savePaymentRecords();

            displayPayments();

            closePaymentForm();

        }
    );

}


/* Edit payment */

function editPayment(index) {

    const payment =
        paymentRecords[index];


    document.getElementById(
        "paymentFormContainer"
    ).style.display =
        "block";


    document.getElementById(
        "paymentFormTitle"
    ).textContent =
        "Edit Payment";


    document.getElementById(
        "paymentEditIndex"
    ).value =
        index;


    document.getElementById(
        "paymentMember"
    ).value =
        payment.email;


    document.getElementById(
        "paymentAmount"
    ).value =
        payment.amount;


    document.getElementById(
        "paymentDate"
    ).value =
        payment.date;


    document.getElementById(
        "paymentMethod"
    ).value =
        payment.method;


    document.getElementById(
        "paymentStatus"
    ).value =
        payment.status;


    document.getElementById(
        "renewalDate"
    ).value =
        payment.renewal;


    document.getElementById(
        "invoiceNumber"
    ).value =
        payment.invoice;


    document.getElementById(
        "paymentNotes"
    ).value =
        payment.notes;

}


/* Delete payment */

function deletePayment(index) {

    if (
        confirm(
            "Are you sure you want to delete this payment?"
        )
    ) {

        paymentRecords.splice(
            index,
            1
        );


        savePaymentRecords();

        displayPayments();

    }

}


/* Invoice */

function showInvoice(index) {

    const payment =
        paymentRecords[index];


    alert(

        "FITZONE INVOICE\n\n" +

        "Invoice: " +
        payment.invoice +

        "\nMember: " +
        payment.member +

        "\nAmount: ₹" +
        Number(
            payment.amount
        ).toLocaleString("en-IN") +

        "\nPayment Date: " +
        payment.date +

        "\nPayment Method: " +
        payment.method +

        "\nStatus: " +
        payment.status +

        "\nRenewal Date: " +
        (
            payment.renewal ||
            "-"
        )

    );

}


/* Search */

const paymentSearch =
    document.getElementById(
        "paymentSearch"
    );


if (paymentSearch) {

    paymentSearch.addEventListener(
        "input",
        displayPayments
    );

}


/* Filter */

const paymentFilterStatus =
    document.getElementById(
        "paymentFilterStatus"
    );


if (paymentFilterStatus) {

    paymentFilterStatus.addEventListener(
        "change",
        displayPayments
    );

}


/* Start payment page */

if (
    document.getElementById(
        "paymentTableBody"
    )
) {

    loadPaymentMembers();

    setPaymentDate();

    displayPayments();

}
/* =========================
   USER PROFILE
========================= */


/* Default profile */

let adminProfile =
    JSON.parse(
        localStorage.getItem("adminProfile")
    ) || {

        name: "FitZone Admin",

        email: "admin@fitzone.com",

        phone: "9876543210",

        role: "Administrator"

    };


/* Save profile */

function saveAdminProfile() {

    localStorage.setItem(
        "adminProfile",
        JSON.stringify(adminProfile)
    );

}


/* Display profile */

function displayAdminProfile() {

    const nameInput =
        document.getElementById(
            "profileName"
        );


    const emailInput =
        document.getElementById(
            "profileEmail"
        );


    const phoneInput =
        document.getElementById(
            "profilePhone"
        );


    const displayName =
        document.getElementById(
            "profileDisplayName"
        );


    const displayEmail =
        document.getElementById(
            "profileDisplayEmail"
        );


    if (nameInput) {

        nameInput.value =
            adminProfile.name;

    }


    if (emailInput) {

        emailInput.value =
            adminProfile.email;

    }


    if (phoneInput) {

        phoneInput.value =
            adminProfile.phone;

    }


    if (displayName) {

        displayName.textContent =
            adminProfile.name;

    }


    if (displayEmail) {

        displayEmail.textContent =
            adminProfile.email;

    }

}


/* Edit profile */

const profileForm =
    document.getElementById(
        "profileForm"
    );


if (profileForm) {

    profileForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            adminProfile.name =
                document.getElementById(
                    "profileName"
                ).value;


            adminProfile.email =
                document.getElementById(
                    "profileEmail"
                ).value;


            adminProfile.phone =
                document.getElementById(
                    "profilePhone"
                ).value;


            saveAdminProfile();

            displayAdminProfile();


            document.getElementById(
                "profileMessage"
            ).textContent =
                "Profile updated successfully!";

        }
    );

}


/* Change password */

const passwordForm =
    document.getElementById(
        "passwordForm"
    );


if (passwordForm) {

    passwordForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const currentPassword =
                document.getElementById(
                    "currentPassword"
                ).value;


            const newPassword =
                document.getElementById(
                    "newPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            const passwordMessage =
                document.getElementById(
                    "passwordMessage"
                );


            /* Demo password */

            if (
                currentPassword !==
                "admin123"
            ) {

                passwordMessage.textContent =
                    "Current password is incorrect.";

                return;

            }


            if (
                newPassword !==
                confirmPassword
            ) {

                passwordMessage.textContent =
                    "New passwords do not match.";

                return;

            }


            if (
                newPassword.length < 6
            ) {

                passwordMessage.textContent =
                    "Password must contain at least 6 characters.";

                return;

            }


            passwordMessage.textContent =
                "Password changed successfully!";


            passwordForm.reset();

        }
    );

}


/* Start profile page */

if (
    document.getElementById(
        "profileForm"
    )
) {

    displayAdminProfile();

}
/* =========================
   SETTINGS MANAGEMENT
========================= */


/* Default settings */

let gymSettings =
    JSON.parse(
        localStorage.getItem("gymSettings")
    ) || {

        theme: "light",

        notifications: true,

        emailNotifications: true,

        gymName: "FitZone Gym",

        gymEmail: "info@fitzone.com",

        gymPhone: "9876543210",

        gymAddress:
            "Chennai, Tamil Nadu, India"

    };


/* Save settings */

function saveGymSettings() {

    localStorage.setItem(
        "gymSettings",
        JSON.stringify(gymSettings)
    );

}


/* Apply theme */

function applyGymTheme() {

    if (
        gymSettings.theme ===
        "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

    }

}


/* Display settings */

function displayGymSettings() {

    const themeSetting =
        document.getElementById(
            "themeSetting"
        );


    const notificationSetting =
        document.getElementById(
            "notificationSetting"
        );


    const emailNotificationSetting =
        document.getElementById(
            "emailNotificationSetting"
        );


    const gymName =
        document.getElementById(
            "gymName"
        );


    const gymEmail =
        document.getElementById(
            "gymEmail"
        );


    const gymPhone =
        document.getElementById(
            "gymPhone"
        );


    const gymAddress =
        document.getElementById(
            "gymAddress"
        );


    if (themeSetting) {

        themeSetting.value =
            gymSettings.theme;

    }


    if (notificationSetting) {

        notificationSetting.checked =
            gymSettings.notifications;

    }


    if (emailNotificationSetting) {

        emailNotificationSetting.checked =
            gymSettings.emailNotifications;

    }


    if (gymName) {

        gymName.value =
            gymSettings.gymName;

    }


    if (gymEmail) {

        gymEmail.value =
            gymSettings.gymEmail;

    }


    if (gymPhone) {

        gymPhone.value =
            gymSettings.gymPhone;

    }


    if (gymAddress) {

        gymAddress.value =
            gymSettings.gymAddress;

    }


    applyGymTheme();

}


/* Theme change */

const themeSetting =
    document.getElementById(
        "themeSetting"
    );


if (themeSetting) {

    themeSetting.addEventListener(
        "change",
        function() {

            gymSettings.theme =
                themeSetting.value;


            saveGymSettings();

            applyGymTheme();

        }
    );

}


/* Notification change */

const notificationSetting =
    document.getElementById(
        "notificationSetting"
    );


if (notificationSetting) {

    notificationSetting.addEventListener(
        "change",
        function() {

            gymSettings.notifications =
                notificationSetting.checked;


            saveGymSettings();

        }
    );

}


/* Email notification change */

const emailNotificationSetting =
    document.getElementById(
        "emailNotificationSetting"
    );


if (emailNotificationSetting) {

    emailNotificationSetting.addEventListener(
        "change",
        function() {

            gymSettings.emailNotifications =
                emailNotificationSetting.checked;


            saveGymSettings();

        }
    );

}


/* Gym information */

const gymSettingsForm =
    document.getElementById(
        "gymSettingsForm"
    );


if (gymSettingsForm) {

    gymSettingsForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            gymSettings.gymName =
                document.getElementById(
                    "gymName"
                ).value;


            gymSettings.gymEmail =
                document.getElementById(
                    "gymEmail"
                ).value;


            gymSettings.gymPhone =
                document.getElementById(
                    "gymPhone"
                ).value;


            gymSettings.gymAddress =
                document.getElementById(
                    "gymAddress"
                ).value;


            saveGymSettings();


            document.getElementById(
                "settingsMessage"
            ).textContent =
                "Settings saved successfully!";

        }
    );

}


/* Reset settings */

function resetGymSettings() {

    if (
        confirm(
            "Are you sure you want to reset all settings?"
        )
    ) {

        gymSettings = {

            theme: "light",

            notifications: true,

            emailNotifications: true,

            gymName: "FitZone Gym",

            gymEmail: "info@fitzone.com",

            gymPhone: "9876543210",

            gymAddress:
                "Chennai, Tamil Nadu, India"

        };


        saveGymSettings();

        displayGymSettings();


        const message =
            document.getElementById(
                "settingsMessage"
            );


        if (message) {

            message.textContent =
                "Settings reset successfully!";

        }

    }

}


/* Start settings page */

if (
    document.getElementById(
        "gymSettingsForm"
    )
) {

    displayGymSettings();

} else {

    /* Apply saved theme on other pages */

    applyGymTheme();

}
// ===============================
// DASHBOARD REAL STATISTICS
// ===============================

function updateDashboardStats() {

    // Get members
    const members =
        JSON.parse(localStorage.getItem("members")) || [];

    // Get trainers
    const trainers =
        JSON.parse(localStorage.getItem("trainers")) || [];

    // Get payments
    const payments =
        JSON.parse(localStorage.getItem("paymentRecords")) || [];

    // Get attendance
    const attendance =
        JSON.parse(localStorage.getItem("attendanceRecords")) || [];


    // Total members
    const totalMembers =
        document.getElementById("totalMembers");

    if (totalMembers) {
        totalMembers.textContent = members.length;
    }


    // Active memberships
    const activeMemberships =
        document.getElementById("activeMemberships");

    if (activeMemberships) {

        const activeCount = members.filter(function(member) {
            return member.status === "Active";
        }).length;

        activeMemberships.textContent = activeCount;
    }


    // Total trainers
    const totalTrainers =
        document.getElementById("totalTrainers");

    if (totalTrainers) {
        totalTrainers.textContent = trainers.length;
    }


    // Monthly revenue
    const monthlyRevenue =
        document.getElementById("monthlyRevenue");

    if (monthlyRevenue) {

        const today = new Date();

        const currentYear = today.getFullYear();
        const currentMonth =
            String(today.getMonth() + 1).padStart(2, "0");

        const currentMonthText =
            currentYear + "-" + currentMonth;

        let revenue = 0;

        payments.forEach(function(payment) {

            if (
                payment.status === "Completed" &&
                payment.date &&
                payment.date.startsWith(currentMonthText)
            ) {
                revenue += Number(payment.amount) || 0;
            }

        });

        monthlyRevenue.textContent =
            "₹" + revenue.toLocaleString("en-IN");
    }


    // Today's attendance
    const todayAttendance =
        document.getElementById("todayAttendance");

    if (todayAttendance) {

        const today = new Date();

        const year = today.getFullYear();

        const month =
            String(today.getMonth() + 1).padStart(2, "0");

        const day =
            String(today.getDate()).padStart(2, "0");

        const todayDate =
            year + "-" + month + "-" + day;

        const presentCount =
            attendance.filter(function(record) {

                return (
                    record.date === todayDate &&
                    record.status === "Present"
                );

            }).length;

        todayAttendance.textContent = presentCount;
    }
}


// Run dashboard statistics
if (
    window.location.pathname
        .split("/")
        .pop() === "dashboard.html"
) {
    updateDashboardStats();
}
// ===============================
// DASHBOARD RECENT ACTIVITIES
// ===============================

function updateRecentActivities() {

    const activityContainer =
        document.getElementById("recentActivities");

    if (!activityContainer) {
        return;
    }

    const members =
        JSON.parse(localStorage.getItem("members")) || [];

    const trainers =
        JSON.parse(localStorage.getItem("trainers")) || [];

    const payments =
        JSON.parse(localStorage.getItem("paymentRecords")) || [];

    const attendance =
        JSON.parse(localStorage.getItem("attendanceRecords")) || [];


    let activities = [];


    // Members
    members.forEach(function(member) {

        activities.push({
            icon: "👤",
            text: member.fullName + " joined the gym",
            date: member.joiningDate || "",
            type: "member"
        });

    });


    // Trainers
    trainers.forEach(function(trainer) {

        activities.push({
            icon: "🏋️",
            text: "Trainer " + trainer.name + " added",
            date: "",
            type: "trainer"
        });

    });


    // Payments
    payments.forEach(function(payment) {

        activities.push({
            icon: "💰",
            text: "Payment received from " + payment.memberName,
            date: payment.date || "",
            type: "payment"
        });

    });


    // Attendance
    attendance.forEach(function(record) {

        activities.push({
            icon: "📋",
            text: "Attendance marked for " + record.memberName,
            date: record.date || "",
            type: "attendance"
        });

    });


    // Show latest activities
    activities = activities.slice(-5).reverse();


    activityContainer.innerHTML = "";


    if (activities.length === 0) {

        activityContainer.innerHTML = `
            <div class="activity">

                <span>👤</span>

                <div>
                    <strong>No recent activities</strong>
                    <p>Activity will appear here</p>
                </div>

            </div>
        `;

        return;
    }


    activities.forEach(function(activity) {

        activityContainer.innerHTML += `

            <div class="activity">

                <span>${activity.icon}</span>

                <div>
                    <strong>${activity.text}</strong>
                    <p>${activity.date || "Recent"}</p>
                </div>

            </div>

        `;

    });

}


// Run recent activities
if (
    window.location.pathname
        .split("/")
        .pop() === "dashboard.html"
) {
    updateRecentActivities();
}
// ===============================
// MOBILE SIDEBAR
// ===============================

function toggleSidebar() {

    const sidebar =
        document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.classList.toggle("active");
    }

}