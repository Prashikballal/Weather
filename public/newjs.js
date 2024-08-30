


let getweather = async () => {
    try {
        const apikey = 'd1c8c98c8b3a42e5ac9160428232907';
        let city = document.getElementById('getcity').value; // City value from text box
        let name = document.getElementById('weather-name');
        let time = document.getElementById('local-time');
        let img = document.getElementById('weather-img');
        let temp = document.getElementById('weather-temp');
        let condition = document.getElementById('condition');
        let humidity = document.getElementById('humidity');
        let wind = document.getElementById('wind');
        let details = document.getElementById('details');
       
        
        if(!city){
            
            window.alert("Please enter city name");
        }

        const weatherurl = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`;
        let res = await fetch(weatherurl); // fetching data 
        if(!res.ok){
            alert('City not found please enter correct city')
            throw new error(`HTTP error Status ${res.status}`);
        }
        let weartherdata = await res.json(); // converting data in json format

       
        let apiDateTime = weartherdata.location.localtime;

        name.innerHTML = weartherdata.location.name;
        time.innerHTML = formatDateTime(apiDateTime);
        condition.innerHTML = weartherdata.current.condition.text;
        img.src = weartherdata.current.condition.icon;
        temp.innerHTML = `Temperature is ${weartherdata.current.temp_c}\u00B0 C`;
        details.innerHTML = `More Details`;
        humidity.innerHTML = `Humidity : ${weartherdata.current.humidity}`;
        wind.innerHTML = `Wind : ${weartherdata.current.wind_kph} kph`;
    }
    catch(error)
    {
        console.log(error);

    }


}

function formatDateTime(apiDateTime) {
    // Split the input into date and time components
    const [datePart, timePart] = apiDateTime.split(' ');

    // Further split the date and time parts
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');

    // Create a Date object. Note: month is 0-based in JavaScript Date constructor
    const date = new Date(year, month - 1, day, hour, minute);

    // Define options for formatting
    const options = {
        weekday: 'long',  // Day name (e.g., "Monday")
        hour: '2-digit',  // Hour with leading zero
        minute: '2-digit',// Minute with leading zero
        second: '2-digit',// Second with leading zero
        hour12: true      // Use 12-hour clock with AM/PM
    };

    // Create a formatter with the desired options
    const formatter = new Intl.DateTimeFormat('en-US', options);

    // Format the date and time
    return formatter.format(date);
}