function setGeolocation() {
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  // Success callback function
  function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    // Set the geolocation data to the desired system component or variable
    // Example: Set the latitude and longitude to a form input field
    document.getElementById("latitudeInput").value = latitude;
    document.getElementById("longitudeInput").value = longitude;
  }
  
  // Error callback function
  function errorCallback(error) {
    console.log("Error occurred while retrieving geolocation data: " + error.message);
  }