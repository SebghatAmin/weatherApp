const apiKey = "0cbca3c4e94745a7a22145413261602";
const weeklyForcast = document.querySelector(".week");
const dailyForecast = document.querySelector(".lef-panel-middle");
const uvIndex = document.querySelector("#uvIndex");
// const city = "herat";
let inputCity = 0;
const input = document.querySelector(".search-bar");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    inputCity = input.value.trim();
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${inputCity}&days=7&aqi=yes`,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        uvIndex.innerHTML = data.current.uv;
        document.getElementById("wind-status").innerHTML =
          `${data.current.wind_kph}<span> KM/h</span>`;
        document.getElementById("sunrise").innerHTML =
          data.forecast.forecastday[0].astro.sunrise;
        document.getElementById("sunset").innerHTML =
          data.forecast.forecastday[0].astro.sunset;
        document.getElementById("humidity").innerHTML = data.current.humidity;
        document.getElementById("airquality").innerHTML =
          data.current.air_quality.pm2_5;
        document.getElementById("visibility").innerHTML = data.current.vis_km;

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
        weeklyForcast.innerHTML = "";

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
        return;
      });
  }
});
