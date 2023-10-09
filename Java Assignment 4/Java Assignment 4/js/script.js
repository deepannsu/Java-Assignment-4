/*
    Assignment #4
    {Deepanshu}
*/

$(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const locationDiv = document.getElementById("locationhere");
        const welcomeMessage = document.getElementById("welcomeMessage");
    
        if ("geolocation" in navigator) {
            // Geolocation is available
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const accuracy = position.coords.accuracy;
    
                // Display the user's current location with accuracy in the 'locationhere' div
                locationDiv.textContent = `Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy} meters`;
    
                // Check if a previous location is stored in localStorage
                const storedLatitude = localStorage.getItem("latitude");
                const storedLongitude = localStorage.getItem("longitude");
    
                if (storedLatitude && storedLongitude) {
                    // Calculate the distance between the stored location and the current location
                    const distanceInMeters = calculateDistance(
                        parseFloat(storedLatitude),
                        parseFloat(storedLongitude),
                        latitude,
                        longitude
                    );
    
                    // Convert distance from meters to kilometers
                    const distanceInKilometers = distanceInMeters / 1000;
    
                    // Display the previous location in a new tag
                    const previousLocationDiv = document.createElement("div");
                    previousLocationDiv.textContent = `Previous Location: Latitude: ${storedLatitude}, Longitude: ${storedLongitude}, Accuracy: N/A`;
                    locationDiv.appendChild(previousLocationDiv);
    
                    // Display a welcome back message and the distance traveled in kilometers
                    welcomeMessage.textContent = `Welcome back! You've traveled ${distanceInKilometers.toFixed(2)} km since your last visit.`;
                } else {
                    // There is no location value in localStorage, welcome the user for the first time
                    welcomeMessage.textContent = "Welcome to the page for the first time!";
                }
    
                // Store the current location in localStorage, replacing the old values
                localStorage.setItem("latitude", latitude);
                localStorage.setItem("longitude", longitude);
            }, function (error) {
                // Handle geolocation errors
                displayError("Error getting location: " + error.message);
            });
        } else {
            // Geolocation is not available, display an error message
            displayError("Geolocation is not supported by your browser.");
        }
    });
    
    function displayError(errorMessage) {
        const locationDiv = document.getElementById("locationhere");
        locationDiv.textContent = errorMessage;
    }
    
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // Earth radius in meters
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    
        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        const distance = R * c;
        return distance;
    }
    
    
    





    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});


