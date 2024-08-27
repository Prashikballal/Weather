
const apiurl = "https://cat-fact.herokuapp.com/facts";

let btn = document.querySelector('#getFact');
let btnW = document.querySelector('#getweather');




let getweather = async () => {
    try {
        const text = document.getElementById('getcity').value;
        const apikey = 'd1c8c98c8b3a42e5ac9160428232907';
        const weatherurl = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${text}&aqi=no`;
        let res = await fetch(weatherurl);
        console.log('getting data ...');
        let weartherdata = await res.json();
        if(weartherdata.error){
                document.getElementById('weatherdata-left').style.visibility="hidden";
                document.getElementById('weather').style.visibility="visible";
                document.getElementById('weather').style.marginTop='50px';
                document.getElementById('weather').style.color ="red"
                document.getElementById('weather').innerHTML =`<strong>Location not found. Please enter the correct location</ strong>`;
                
        }
        else{
            document.getElementById('weatherdata-left').style.visibility="visible";
            document.getElementById('weather').style.visibility="hidden";
        console.log(`location ${weartherdata.location.name}`)
        console.log(`temp ${weartherdata.current.temp_c}`)
        document.getElementById('weatherdata-left').style.color ="Black"
        let div = document.getElementById('weatherdata-left').innerHTML =
            `<h2>Weather in ${weartherdata.location.name} is ${weartherdata.current.condition.text} <img src=${weartherdata.current.condition.icon} width=42 height=42 style=vertical-align:middle></h2>
        <p>Temperature in ${weartherdata.current.temp_c}</p>
        <p>Local time of ${weartherdata.location.name} is ${weartherdata.location.localtime}<p>
        <p>Humidity ${weartherdata.current.humidity}</p>`
        }
    } catch (error) {

        let err = error;
        `<p>${err}<p>`
    }
}


let getdata = async () => {
    let idx = Math.floor(Math.random() * 5)

    console.log("Getting Data .........")
    let response = await fetch(apiurl)
    // console.log(response)
    let fact = await response.json();
    console.log(`facts for ${idx} is:   `)
    console.log(fact[idx].text);
    document.getElementById('card').style.visibility = "visible";
}

btn.addEventListener('click', getdata);


