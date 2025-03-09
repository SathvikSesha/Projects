document.getElementById("calculate-btn").addEventListener("click", function () {
  let dirt = document.getElementById("dirt-level").value;
  let load = document.getElementById("load-size").value;
  let temp = document.getElementById("water-temp").value;

  fetch("https://fuzzy-washing-backend.onrender.com/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dirt_level: dirt,
      load_size: load,
      water_temperature: temp,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        "result"
      ).innerHTML = `Washing Time: ${data.washing_time} min <br> Detergent: ${data.detergent_quantity} ml`;
    })
    .catch((error) => console.error("Error:", error));
});
