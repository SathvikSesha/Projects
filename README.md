# Projects
🧼 Fuzzy Logic-Based Washing Machine Control System
🚀 Live Demo
🌐 Try the App :  <a href="https://fuzzy-washing.netlify.app/">Fuzzy_washing</a>

📌 Project Overview
This is a smart fuzzy logic-powered washing machine simulator that mimics human decision-making. Based on Dirt Level, Load Size, and Water Temperature, it dynamically calculates:

🕒 Washing Time

🧴 Detergent Quantity

The system is built using Python Flask + scikit-fuzzy on the backend and a clean HTML + Tailwind CSS + JavaScript frontend. It also includes a graph feature to visualize the system’s behavior using Matplotlib.

⚙️ Tech Stack

Layer	Technologies Used
Frontend	HTML, Tailwind CSS, JavaScript
Backend	Python, Flask, scikit-fuzzy
Graphing	Matplotlib
Deployment	Netlify (frontend), Render (backend)
🎯 Features
Real-time calculation of washing time & detergent quantity

User-friendly interface with responsive design

Graphical representation of fuzzy decisions

Error handling for invalid input values

Fully deployed full-stack application

📂 Folder Structure
bash
Copy
Edit
Fuzzy_washing/
├── backend/
│   ├── fuzzy_washing.py         # Flask + Fuzzy Logic backend
│   ├── plot_fuzzy_results.py    # Local script to display graph
├── frontend/
│   ├── index.html               # UI for input and result
│   ├── script.js                # API calls and input handling
🧠 Fuzzy Logic System Breakdown
📌 Membership Functions Explained
Fuzzy logic transforms crisp input values into degrees of membership between 0 and 1. This project uses triangular membership functions (trimf) for simplicity and interpretability.

🔷 Inputs

Input	Range	Fuzzy Sets	Explanation
Dirt Level	0 to 100 (%)	Low, Medium, High	Indicates how dirty the clothes are. Higher values require more time and detergent.
Load Size	0 to 10 (kg)	Small, Medium, Large	Amount of clothes to wash. Affects both time and detergent needs.
Water Temperature	20 to 80 (°C)	Low, Medium, High	Warmer water helps remove dirt faster, possibly reducing time or detergent needed.
Each fuzzy set is defined using triangular membership functions like:
fuzz.trimf(variable.universe, [start, peak, end])
Example: dirt_level['medium'] = fuzz.trimf(dirt_level.universe, [0, 50, 100])

🔷 Outputs

Output	Range	Fuzzy Sets	Explanation
Washing Time	0 to 100 (mins)	Short, Medium, Long	Duration for which the wash cycle runs.
Detergent Quantity	0 to 200 (ml)	Low, Medium, High	Amount of detergent required for optimal wash.
Output values are converted back to crisp numbers using centroid defuzzification.

🧾 Input-Output Mapping Logic
The fuzzy rules are constructed like natural language:

IF dirt is high AND load is large AND water temp is low → THEN washing time is long AND detergent is high

There are a total of 27 fuzzy rules covering combinations of input conditions.

📦 Packages Used

Package	Purpose
Flask	Web framework to host backend API
Flask-CORS	Handle cross-origin requests from frontend
scikit-fuzzy	Create fuzzy variables, rules, and inference logic
NumPy	Array operations and input ranges
Matplotlib	Graph plotting from fuzzy output
io	In-memory file handling for graph return as image
Install with:
pip install flask flask-cors scikit-fuzzy numpy matplotlib

🔌 API Endpoints
POST /calculate
Request:

json
{
  "dirt_level": 70,
  "load_size": 5,
  "water_temperature": 40
}
Response:

json
{
  "washing_time": 67.42,
  "detergent_quantity": 139.28
}
POST /graph
Request:

json
{
  "inputs": [
    { "dirt_level": 20, "load_size": 2, "water_temperature": 40 },
    { "dirt_level": 60, "load_size": 5, "water_temperature": 40 },
    { "dirt_level": 100, "load_size": 9, "water_temperature": 40 }
  ]
}
Response:
Returns a PNG image with:

Dirt Level vs Washing Time

Load Size vs Detergent Quantity

🧩 System Flow Summary
User enters dirt level, load size, and water temperature

Inputs are sent to the backend

Fuzzy logic system processes inputs using membership functions and 27 rules

Backend returns calculated washing time and detergent quantity

Results are displayed on the frontend

Optional: Graph is displayed to visualize system behavior

📷 Screenshots
Add your screenshots here if available

📽️ Demo Video
🎬 YouTube Walkthrough:https://youtu.be/3hMkBXa0-rc?si=3uFKQlKLHhT9776V

🌱 Future Enhancements
Add support for cloth type (cotton, silk, wool)

Display energy usage estimates

Store user wash history

Convert app to Progressive Web App (PWA)

Voice-based input and IoT integration

Thank you for exploring our fuzzy-powered smart washing system! 🌟<br>
Here are some other basic projects i made:
<ul>
 <a href="https://sathviksesha.github.io/Projects/tic-tac-toe/">tic-tac-toe</a><br>
 <a href="https://sathviksesha.github.io/Projects/rock-Paper-Scissors/">Rock-Paper-Scissors</a><br>
  <a href = "https://sathviksesha.github.io/Projects/Calculator/"> Calculator </a> <br>
</ul>


