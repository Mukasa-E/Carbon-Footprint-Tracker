document.getElementById("carbonForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const vehicleModel = document.getElementById("vehicle_model").value;
    const distance = document.getElementById("distance").value;
    
    const response = await fetch("http://127.0.0.1:5000/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            vehicle_model: vehicleModel,
            distance: distance
        })
    });
    
    const data = await response.json();
    if (data.error) {
        document.getElementById("result").innerText = "Error: " + data.details;
    } else {
        document.getElementById("result").innerText = `Carbon Emission: ${data.data.attributes.carbon_kg} kg`;
        updateChart(data.data.attributes.carbon_kg);
    }
});

function updateChart(carbonValue) {
    const ctx = document.getElementById("carbonChart").getContext("2d");
    if (window.carbonChart) {
        window.carbonChart.destroy();
    }
    window.carbonChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Carbon Emission"],
            datasets: [{
                label: "Kg of CO2",
                data: [carbonValue],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        }
    });
}
