const API_URL = "http://localhost:4000/api/superheroes";

// Extract heroID from the URL
const urlParams = new URLSearchParams(window.location.search);
const heroID = urlParams.get("id");


// Fetch hero details
async function fetchHeroDetails() {
    if (!heroID) {
        document.getElementById("hero-details").innerHTML = "<p>Hero not found.</p>";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${heroID}`);
        const hero = await response.json();

        // console.log(hero[0].name);
        // console.log(hero.superproperty);

        // Display hero details
        document.getElementById("hero-details").innerHTML = `
            <h2>Hero ID: ${hero[0].heroID}</h2>
            <h2>Name: ${hero[0].name}</h2>
            <p><strong>Year of Birth:</strong> ${hero[0].yearOfBirth}</p>
            <p><strong>Superproperty:</strong> ${hero[0].superproperty}</p>
            <p><strong>Gear:</strong> ${hero[0].gear}</p>
        `;
    } catch (err) {
        document.getElementById("hero-details").innerHTML = "<p>Failed to load hero details.</p>";
        console.error("Error fetching hero details:", err);
    }
}

// Call function on page load
fetchHeroDetails();