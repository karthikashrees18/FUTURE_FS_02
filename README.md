# Client Lead Management System (Mini CRM) 🚀
**Built for the Future Interns Full Stack Web Development Task 2 (2026)**

A simple yet functional CRM (Customer Relationship Management) system designed for agencies, freelancers, and startups to manage and track incoming client leads.

## 🌐 Live Demo
https://future-fs-02-h396.onrender.com

## 🌐 Git Repository
https://github.com/karthikashrees18/FUTURE_FS_02


---

## ✨ Features
* **Lead Capture:** Integrated backend to receive and store lead data (Name, Email, Source) from website forms.
* **Admin Dashboard:** A secure panel for business owners to view and manage all incoming leads.
* **Status Management:** Ability to update lead status in real-time (New → Contacted → Converted).
* **Persistence:** Data is stored securely in a MongoDB cloud database.
* **Responsive UI:** Clean and professional interface built with CSS for ease of use.

---

## 🛠️ Technology Stack
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud)
* **Deployment:** Render (Hosting)
* **Version Control:** Git & GitHub

---

## 📂 Project Structure
```text
mini-crm/
├── public/          # Frontend files (Static)
│   ├── index.html   # Main Dashboard UI
│   ├── style.css    # Custom Styling
│   └── script.js    # Frontend Logic & API calls
├── .env             # Environment Variables (Local only)
├── .gitignore       # Files to ignore (node_modules, .env)
├── server.js        # Main Express server & API routes
├── package.json     # Project dependencies
└── README.md        # Project documentation

🚀 Getting Started (Local Setup)
Clone the repository:

Bash
git clone [https://github.com/REPLACE_WITH_YOUR_USERNAME/REPLACE_WITH_YOUR_REPO_NAME.git](https://github.com/REPLACE_WITH_YOUR_USERNAME/REPLACE_WITH_YOUR_REPO_NAME.git)
cd mini-crm
Install Dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and add your MongoDB connection string:

Plaintext
MONGO_URI=your_mongodb_atlas_connection_string
PORT=10000
Run the Server:

Bash
node server.js
View in Browser:
Open http://localhost:10000

📝 Real-World Impact
This project mirrors real-world business workflows by solving the problem of how to quickly see new leads, track follow-ups easily, and identify conversion rates. It provides a job-ready foundation for software that supports business growth.

👤 Author
Karthika Shree S

GitHub: https://github.com/karthikashrees18
