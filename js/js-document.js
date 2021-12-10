var compassMarkers = document.querySelectorAll("[compass-marker]");

for(let i=0; i<compassMarkers.length; i++) {
    compassMarkers[i].pointer = compassMarkers[i].querySelector(".pointer");
}

for(let i=0; i<compassMarkers.length; i++) {
    console.log(compassMarkers[i].pointer.attributes);
}