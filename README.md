📋 Task Manager System

A Full Stack Task Management System built using Spring Boot, MySQL, HTML, CSS, and JavaScript.
It helps users manage daily tasks efficiently with a beautiful dashboard, analytics, and reporting features.

🚀 Features

🔐 User Authentication (Login & Register)
➕ Create, Update, Delete Tasks (CRUD)
📊 Dashboard with Task Analytics
📈 Doughnut & Bar Charts (Chart.js)
📅 Due Date Tracking
🔔 Task Alerts & Notifications
🌙 Dark Mode Support
📥 PDF Report Download
📊 Excel Report Export
🏆 Achievement Badge System
🔍 Search & Filter Tasks

🧠 Project Highlights
Real-time task tracking dashboard
Interactive charts and graphs
Role-based user system (User/Admin)
Clean and responsive UI design
Professional reporting system
🛠️ Technologies Used
Java (Spring Boot)
Spring Data JPA
MySQL
HTML5
CSS3
JavaScript
Bootstrap
Chart.js
jsPDF
SheetJS (Excel Export)
📂 Project Structure
TaskManager-System/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   └── config/
│
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── index.html
│   ├── css/
│   └── js/
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/task-manager-system.git
cd task-manager-system
2️⃣ Backend Setup (Spring Boot)
Import project into Eclipse / IntelliJ
Configure MySQL database in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskdb
spring.datasource.username=root
spring.datasource.password=your_password
Run the Spring Boot application
3️⃣ Frontend Setup

Simply open:

login.html

or run using VS Code Live Server.

📊 Dashboard Preview
Total Tasks Overview
Completed vs Pending Analysis
Weekly Productivity Graph
Task Progress Tracking
📄 Sample API Endpoints
POST   /auth/register
POST   /auth/login
GET    /tasks
POST   /tasks
PUT    /tasks/{id}
DELETE /tasks/{id}
🏆 Achievement System
100% Completion → 🏆 Champion Badge
75% Completion → 🥇 Excellent Progress
50% Completion → 🥈 Good Progress
📥 Export Features

✔ Download Task Report as PDF
✔ Export Dashboard Data to Excel

👨‍💻 Author

Thilagavathi Selvam

📜 License

This project is licensed under the MIT License.

⭐ Future Improvements
Mobile App Version
Real-time Notifications
Cloud Deployment
AI-based Task Suggestions
