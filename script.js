const apiKey = "0cbca3c4e94745a7a22145413261602";
const city = "herat";

fetch(
  `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`,
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const forecast = data.forecast.forecastday;
    // console.log("today tempreture is:" + " " + forecast);

    forecast.forEach((day) => {
      console.log(
        "Max temperature forcast is " +
          " " +
          day.day.maxtemp_c +
          "  " +
          "Minimum temperature forcast is " +
          " " +
          day.day.mintemp_c,
      );
      //   console.log(day.day_fields.maxtemp_c);
      //   console.log(day.day_fields.condition.text);
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });
