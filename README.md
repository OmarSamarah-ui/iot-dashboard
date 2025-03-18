# IoT Dashboard

## 🚀 Project Overview

This IoT Dashboard is a full-stack web application designed to manage and monitor IoT devices. It features a **React frontend**, an **Express backend**, and a **Supabase PostgreSQL database**. The project is containerized with **Docker**, and the backend is deployed on **Heroku**.

---

## 🛠️ Setup Instructions

### Running Locally (Without Docker)

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd dashboardiot
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the project:
   ```sh
   npm run dev
   ```
4. The application will be available at:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

### Running with Docker

1. Ensure **Docker** is installed on your machine.
2. Run the following command:
   ```sh
   docker compose up --build
   ```
3. The app will be available at the same URLs:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

💡 **Note:** The database is hosted on **Supabase**, so no additional database setup is needed.

---

## 📌 Usage

### **Testing the Backend APIs**

You can test the backend APIs using **Postman** or any API testing tool.

#### **Example: Fetch All Devices**

- **GET Request:**
  - `http://localhost:5000/devices` (Local)
  - `https://dashboard-iot-docker-31994fb378fb.herokuapp.com/devices` (Deployed API)
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "Temperature Sensor",
      "type": "Sensor",
      "location": "Lab",
      "status": "Active"
    }
  ]
  ```

#### **Example: Add a New Device**

- **POST Request:** `http://localhost:5000/devices`
- **Body:**
  ```json
  {
    "name": "New Sensor",
    "type": "Humidity Sensor",
    "location": "Office",
    "status": "Active"
  }
  ```
- **Response:**
  ```json
  { "message": "Device added successfully" }
  ```

### **Using the React Frontend**

1. Run the project using `npm run dev`.
2. Open `http://localhost:5173` in your browser.
3. Explore the dashboard:
   - View a list of IoT devices.
   - Add and remove devices.
   - Monitor device activity.
   - Try the **dark mode** for an enhanced experience! 🌙

---

## 📖 Summary

### **Methodology & Design Decisions**

- The **frontend** was built using **React** with **Tailwind CSS**.
- The **backend** is an **Express API** connected to a **Supabase PostgreSQL** database.
- The application is **containerized** using **Docker**, allowing easy deployment and scaling.

### **Challenges Faced**

- **First Time Using Docker:** It took about **2 days** to properly configure and containerize everything.
- **Unit & Integration Testing:** This was my **first experience with Jest**, so setting up proper **test cases** took extra time.
- **Database Transition:** Initially, the plan was to use **SQL Server**, but I switched to **Supabase** for ease of deployment.

---

💡 **This project was a great learning experience! Feel free to explore and contribute.**

