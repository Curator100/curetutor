const API_KEY = "AIzaSyDC_aqgXAhScsYg85qTTs1fQcUtgn2Z2xQ";
const SHEET_ID = "1KwicnXVW52o81HBv7H9HAUtWf1CfgWCKrjumCZVaqN8";
const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const roll = document.getElementById("roll").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(SHEET_URL);
    const data = await response.json();
    const rows = data.values.slice(1); // Exclude headers
    
    const user = rows.find(row => row[0] === roll && row[1] === password);

    if (user) {
      document.getElementById("name").textContent = `Name: ${user[2]}`;
      document.getElementById("nextClass").textContent = `Next Class: ${user[3]}`;
      document.getElementById("time").textContent = `Time: ${user[4]}`;
      document.getElementById("totalEarning").textContent = `Total Earning: ${user[5]}`;
      document.getElementById("balance").textContent = `Balance: ${user[6]}`;
      document.getElementById("classTaken").textContent = `Classes Taken: ${user[7]}`;
      
      document.getElementById("userData").classList.remove("hidden");
    } else {
      alert("Invalid Roll or Password.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
