async function calculateFuzzy() {
  const dirt = document.getElementById("dirt_level").value;
  const load = document.getElementById("load_size").value;
  const water = document.getElementById("water_temperature").value;

  const response = await fetch(
    "https://fuzzy-washing-backend.onrender.com/calculate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dirt_level: dirt,
        load_size: load,
        water_temperature: water,
      }),
    }
  );
  const data = await response.json();

  document.getElementById(
    "result"
  ).innerHTML = `Washing Time: <strong>${data.washing_time}</strong> mins<br> 
         Detergent Quantity: <strong>${data.detergent_quantity}</strong> ml`;
}
