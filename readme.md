# 🧠 Productivity Dashboard

A modern, all-in-one productivity dashboard designed to help you **plan your day, stay focused, and build consistency**.

This project combines multiple productivity tools into a single clean interface with real-time updates, local persistence, and a smooth user experience.


## ✨ Features

### 📅 Weather Card (Live)
- Real-time date and clock (updates every second)
- Live weather information (temperature, humidity, wind, condition)
- Location-based weather display
- Clean glassmorphism weather card

---

### 🔥 Daily Streak System
- Tracks consecutive days the dashboard is opened
- Automatically increments once per day
- Resets if a day is missed
- Stored using `localStorage`

---

### 📝 To-Do List
- Add tasks with detailed descriptions
- Mark tasks as **important**
- Expand/collapse task details
- Persistent storage using `localStorage`
- Clean, distraction-free layout

---

### 🗓️ Daily Planner
- Time-based daily planning layout
- Input fields for scheduling your day
- Scrollable and responsive layout
- Data persists locally

---

### 💡 Motivation Section
- Displays a **Quote of the Day**
- Refresh button to fetch a new quote
- Elegant animated card design
- Focused, calm visual experience

---

### ⏱️ Pomodoro Timer
- 25-minute focus sessions
- 5-minute break sessions
- Start / Pause / Reset controls
- Automatic session switching
- Clear visual state (Focus / Break)

---


### 🎯 Daily Goals Tracker
- Add goals with emoji support
- Manual progress control (0% → 100%)
- Progress states:
  - Not Started
  - Started
  - In Progress
  - Going Strong
  - Almost Finished
- Goals automatically disappear at 100%
- Daily reset at midnight
- Stored using `localStorage`

---

## 🛠️ Tech Stack

- **HTML5** – Semantic layout
- **SCSS** – Modular, maintainable styling
- **Vanilla JavaScript** – Core logic (no frameworks)
- **WeatherAPI** – Live weather data
- **LocalStorage** – Data persistence
- **Custom Fonts** – Aeonik (Light, Regular, Bold)


## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/mannatgupta146/DOM-Project.git```

2. Open the project folder:

   ```bash
   cd productivity-dashboard
   ```

3. Open `index.html` in your browser
   *(No server required)*

## ⚠️ Notes

* This project uses **localStorage**, so data persists per browser
* Clearing browser data will reset all data
* Weather requires an active **WeatherAPI key**


## 🎯 Purpose of the Project

This project was built to:

* Practice **DOM manipulation**
* Design a **real-world productivity UI**
* Implement **state management without frameworks**
* Focus on **UX, logic, and consistency**

## 🙌 Acknowledgements

* Weather data from **WeatherAPI**
* Icons from **Remix Icon**
* UI inspiration from modern SaaS dashboards

---

> *“Small progress every day leads to big results.”*
