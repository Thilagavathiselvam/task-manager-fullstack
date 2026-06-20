const API_URL = "http://localhost:8080/tasks";

window.onload = function () {

    document.getElementById("todayDate").innerHTML =
        "📅 " + new Date().toDateString();

    loadTasks();
    loadQuote();
};

function loadTasks() {

    fetch(API_URL)
        .then(response => response.json())
        .then(tasks => {

            let completed = 0;
            let pending = 0;
            let progress = 0;

            let output = "";

            let search =
                document.getElementById("search")
                    .value
                    .toLowerCase();

            let filter =
                document.getElementById("filter")
                    .value;

            tasks.forEach(task => {

                if (task.status === "Completed")
                    completed++;

                if (task.status === "Pending")
                    pending++;

                if (task.status === "In Progress")
                    progress++;

                if (
                    task.title.toLowerCase().includes(search)
                ) {

                    if (
                        filter === "All" ||
                        task.status === filter
                    ) {

                        let badgeColor = "secondary";

                        if (task.status === "Completed")
                            badgeColor = "success";

                        if (task.status === "Pending")
                            badgeColor = "warning";

                        if (task.status === "In Progress")
                            badgeColor = "info";

                        output += `

                        <div class="task-card">

                            <h5>${task.title}</h5>

                            <p>${task.description}</p>

                            <span class="badge bg-${badgeColor}">
                                ${task.status}
                            </span>

                            <p class="mt-2">
                                📅 Due Date:
                                ${task.dueDate}
                            </p>

                        </div>
                        `;
                    }
                }
            });

            document.getElementById("taskList").innerHTML =
                output;

            document.getElementById("totalTasks").innerText =
                tasks.length;

            document.getElementById("completedTasks").innerText =
                completed;

            document.getElementById("pendingTasks").innerText =
                pending;

            document.getElementById("progressTasks").innerText =
                progress;

            let percent = 0;

            if (tasks.length > 0) {
                percent =
                    Math.round(
                        (completed / tasks.length) * 100
                    );
            }

            document.getElementById("progressBar")
                .style.width =
                percent + "%";

            document.getElementById("progressBar")
                .innerText =
                percent + "% Completed";

            updateAchievement(percent);

            createPieChart(
                completed,
                pending,
                progress
            );

            createBarChart(
                completed,
                pending,
                progress
            );

            loadAlerts(tasks);
        });
}

/* PIE CHART */

function createPieChart(
    completed,
    pending,
    progress
) {

    const ctx =
        document.getElementById("taskChart");

    if (window.pieChart) {
        window.pieChart.destroy();
    }

    window.pieChart =
        new Chart(ctx, {

            type: "doughnut",

            data: {

                labels: [
                    "Completed",
                    "Pending",
                    "In Progress"
                ],

                datasets: [{

                    data: [
                        completed,
                        pending,
                        progress
                    ],

                    backgroundColor: [
                        "#00c6ff",
                        "#ff6b6b",
                        "#feca57"
                    ]
                }]
            }
        });
}

/* BAR CHART */

function createBarChart(
    completed,
    pending,
    progress
) {

    const ctx =
        document.getElementById("barChart");

    if (window.barChart) {
        window.barChart.destroy();
    }

    window.barChart =
        new Chart(ctx, {

            type: "bar",

            data: {

                labels: [
                    "Completed",
                    "Pending",
                    "In Progress"
                ],

                datasets: [{

                    label: "Tasks",

                    data: [
                        completed,
                        pending,
                        progress
                    ],

                    backgroundColor: [
                        "#28a745",
                        "#ffc107",
                        "#17a2b8"
                    ]
                }]
            }
        });
}

/* MOTIVATION */

function loadQuote() {

    const quotes = [

        "Dream big and dare to fail.",

        "Success is the sum of small efforts repeated daily.",

        "Stay focused and never give up.",

        "Discipline beats motivation.",

        "Productivity is never an accident."
    ];

    document.getElementById("quote")
        .innerHTML =

        quotes[
            Math.floor(
                Math.random() *
                quotes.length
            )
        ];
}

/* ACHIEVEMENT */

function updateAchievement(percent) {

    let text =
        "Keep Going!";

    if (percent >= 100)
        text =
        "🏆 Champion - 100% Tasks Completed";

    else if (percent >= 75)
        text =
        "🥇 Excellent Progress";

    else if (percent >= 50)
        text =
        "🥈 Good Work";

    document.getElementById(
        "achievementText"
    ).innerHTML = text;
}

/* ALERTS */

function loadAlerts(tasks) {

    let alerts = "";

    let today =
        new Date();

    tasks.forEach(task => {

        let due =
            new Date(task.dueDate);

        let diff =
            Math.ceil(
                (due - today)
                / (1000 * 60 * 60 * 24)
            );

        if (diff <= 3) {

            alerts +=
                `<li>
                ⚠ ${task.title}
                due in ${diff} day(s)
                </li>`;
        }
    });

    if (alerts === "") {
        alerts =
            "<li>No Upcoming Alerts</li>";
    }

    document.getElementById(
        "alertList"
    ).innerHTML = alerts;
}

/* EXCEL EXPORT */

function exportExcel() {

    let tableData = [

        ["Total Tasks",
            document.getElementById("totalTasks")
                .innerText],

        ["Completed",
            document.getElementById("completedTasks")
                .innerText],

        ["Pending",
            document.getElementById("pendingTasks")
                .innerText],

        ["In Progress",
            document.getElementById("progressTasks")
                .innerText]
    ];

    let ws =
        XLSX.utils.aoa_to_sheet(
            tableData
        );

    let wb =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Report"
    );

    XLSX.writeFile(
        wb,
        "Task_Report.xlsx"
    );
}

/* PDF */

function downloadPDF() {

    const { jsPDF } =
        window.jspdf;

    const doc =
        new jsPDF();

    doc.setFontSize(20);

    doc.text(
        "Task Management Report",
        20,
        20
    );

    doc.setFontSize(12);

    doc.text(
        "Generated Successfully",
        20,
        40
    );

    doc.text(
        "Total Tasks : "
        + document.getElementById("totalTasks").innerText,
        20,
        60
    );

    doc.text(
        "Completed : "
        + document.getElementById("completedTasks").innerText,
        20,
        75
    );

    doc.text(
        "Pending : "
        + document.getElementById("pendingTasks").innerText,
        20,
        90
    );

    doc.text(
        "In Progress : "
        + document.getElementById("progressTasks").innerText,
        20,
        105
    );

    doc.save(
        "Task_Report.pdf"
    );
}

/* DARK MODE */

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );
}

/* LOGOUT */

function logout() {

    sessionStorage.clear();

    window.location.href =
        "login.html";
}