const apiKey = "0cbca3c4e94745a7a22145413261602";
const city = "herat";
const weeklyForcast = document.querySelector(".week");
const dailyForecast = document.querySelector(".lef-panel-middle");
fetch(
  `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`,
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const todaydate = new Date(data.current.last_updated);
    const todayName = todaydate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    dailyForecast.innerHTML = `<div class="icon"></div>

              <h1 class="degree">${data.current.temp_c}°C</h1>

              <div class="current-status">
                <h4 class="slim-text">${todayName}</h4>
                <h4 class="slim-text">${data.current.condition.text}</h4>
              </div>`;
    const forecast = data.forecast.forecastday;
    forecast.forEach((day) => {
      const date = new Date(day.date);
      const dayName = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      console.log(dayName + " " + day.day.maxtemp_c);
      weeklyForcast.innerHTML += `
      
            <div class="week-days">
              <h1>${dayName}</h1>
              <div class="little-Icon"></div>
              <h2>Max:${day.day.maxtemp_c}&deg;C</h2>
                            <h2>Min:${day.day.mintemp_c}&deg;C</h2>

            </div>
     `;
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });
