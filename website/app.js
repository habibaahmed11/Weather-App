
/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

const apiKey = '&appid=1339a129a7f58bb1d94ee9ab4bd76147&units = imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//eventlistener to get all data when clicking "generate" button 
document.getElementById('generate').addEventListener('click', perform);

//main function
function perform(e) {
    // the zip code
    const zip = document.getElementById('zip').value;
    // the user's feeling
    const feeling = document.getElementById('feelings').value;

    //function to get weather
    weatherCalc(baseURL, zip, apiKey)
        .then(function (data) {
            console.log(data);

            postData('/all', { temp: data.main.temp, date: newDate, feeling: feeling });
        })
        .then(
            updateUI
        )
}
const weatherCalc = async (baseURL, zip, apikey) => {
    //using fetch function
    const res = await fetch(baseURL + zip + apikey)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
const postData = async (url = '', data = {}) => {

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // body data type must match Content-Type
        body: JSON.stringify(data),
    });

    try {

        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};
const updateUI = async () => {
    //using fetch function for user data
    const req = await fetch('/all');
    try {
        const userData = await req.json();
        document.getElementById('date').innerHTML = 'Date: ' + userData.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + userData.temp + '°F';
        document.getElementById('content').innerHTML = 'Feelings: ' + userData.feeling;

    } catch (error) {
        //appropriatly handling errors
        console.log("error", error);
    }
}
