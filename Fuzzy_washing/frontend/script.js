function calculateFuzzy() {
  let dirt = document.getElementById("dirt_level").value;
  let load = document.getElementById("load_size").value;
  let temp = document.getElementById("water_temperature").value;
  let resultDiv = document.getElementById("result");

  if (!dirt || !load || !temp) {
    resultDiv.innerHTML =
      "<p class='text-red-500'>Please enter all fields.</p>";
    return;
  }
  if (
    dirt < 0 ||
    dirt > 100 ||
    load < 0 ||
    load > 10 ||
    temp < 20 ||
    temp > 80
  ) {
    resultDiv.innerHTML = "<p class='text-red-500'>Invalid input values.</p>";
    return;
  }

  resultDiv.innerHTML = "<p class='text-blue-500'>Calculating...</p>";

  fetch("https://fuzzy-washing-backend.onrender.com/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dirt_level: parseFloat(dirt),
      load_size: parseFloat(load),
      water_temperature: parseFloat(temp),
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("result").innerHTML = `
            <p class="text-green-600">Washing Time : <b>${data.washing_time} min</b></p>
            <p class="text-blue-600">Detergent Quantity : <b>${data.detergent_quantity} ml</b></p>
        `;
    })
    .catch((error) => {
      document.getElementById(
        "result"
      ).innerHTML = `<span class='text-red-500'>Error: ${error.message}</span>`;
      console.error("Error:", error);
    });
}
