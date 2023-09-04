const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "7ca78e271675476a6a167286fe79f3b2&units=imperial";
const urlServer = "http://localhost:3077/data";

/**
 * Get weather data from Openweather with url params
 * @params @url
 * @return @data
 */
const getApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const postApi = async (url, data) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const handleGetData = async () => {
  const feel = document.getElementById("emotion");
  const zipcode = document.getElementById("zipcode");

  if (zipcode.value.length == 0 || feel.value.length == 0) {
    window.alert("You need fill all fields, example: zipcode = 94040");
    return;
  }
  const url = baseUrl + zipcode.value + `&appid=${apiKey}`;
  let result = await getApi(url);

  if (result.message) {
    alert(result.cod + ": " + result.message, "Input zipcode again");
    return;
  }
  // Create a new Date object and set it using the result.dt (in milliseconds)
  const date = new Date(result.dt * 1000);

  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 to month (zero-based index)
  const year = date.getFullYear();

  // Format the date as DD-MM-YYYY
  const formattedDate = `${day}-${month}-${year}`;

  const data = {
    name: result.name,
    temp: result.main.temp,
    content: feel.value,
    date: formattedDate,
  };

  //Send data to server
  await postApi(urlServer, data);

  /**
   * Get data from server then display it on the page
   */
  updateScreen();
};

const updateScreen = async () => {
  //Get data from the server
  let dataJson = await getApi(urlServer);

  try {
    // const dataJson = await data.json();
    document.getElementById("name").innerHTML = dataJson.name;
    document.getElementById("date").innerHTML = `Date: ` + dataJson.date;
    document.getElementById("temp").innerHTML =
      `Temp: ` + Math.round(dataJson.temp) + "degrees";
    document.getElementById("content").innerHTML =
      `Content: ` + dataJson.content;
  } catch (error) {
    console.log(error);
  }
};

const btn = document.querySelector("#generate");
btn.addEventListener("click", handleGetData);
