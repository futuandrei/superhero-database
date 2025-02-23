const API_URL = "http://localhost:4000/api/superheroes";

async function fetchHeroes() {
    const response = await fetch(API_URL);
    const data = await response.json();

    let table = '<table>';
    table += `<tr>
        <th>heroID</th>
        <th>name</th>
        <th>yearOfBirth</th>
        <th>superproperty</th>
        <th>gear</th>
        <th></th>
    </tr>`;

    data.forEach((hero) => {
        table += `<tr>`;
        table += `<td> ${hero.heroID} </td>`;
        table += `<td> ${hero.name} </td>`;
        table += `<td> ${hero.yearOfBirth} </td>`;
        table += `<td> ${hero.superproperty} </td>`;
        table += `<td> ${hero.gear} </td>`;
        table += `<td><button onclick="deleteHero(${hero.heroID})">Delete</button></td>`;
    });
    document.getElementById("hero-list").innerHTML = table;
}

const addSuperhero = async (e) => {
    e.preventDefault();

    // Collect form values
    const name = document.getElementById('name').value;
    const yearElement = document.getElementById('year');
    const superproperty = document.getElementById('superproperty').value;
    const gear = document.getElementById('gear').value;

    if (!yearElement) {
        console.error("Error: The 'year' input field was not found in the DOM.");
    } else {
        console.log("Year input element found:", yearElement);
    }

    const yearInput = yearElement ? parseInt(yearElement.value) : NaN;
    console.log("Parsed year:", yearInput);
    const errorMessage = document.getElementById('errorMessage');

    // Validation: Check if all required fields are provided
    if (!name || !yearInput || !superproperty || !gear) {
        errorMessage.textContent = 'All fields are required. Please fill out all fields.';
        errorMessage.style.display = 'block';
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    // Create superhero object
    const superhero = { name, yearOfBirth: yearInput, superproperty, gear };
    console.log(superhero);

    console.log("Sending data:", superhero); // Check if data is correct before sending

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(superhero)
    });

    if (response.ok) {
        // Automatically refresh the superhero list after adding
        await fetchHeroes();

        // Clear the form after successful submission
        document.getElementById('heroForm').reset();
    }

    // const result = await response.json();
    // console.log("Response from server:", result); // Debugging response


};

const deleteHero = async (heroID) => {
    try {
        // Handle `null` number explicitly
        const endpoint = heroID === null ? `${API_URL}/null` : `${API_URL}/${heroID}`;

        // Send DELETE request to the backend
        const response = await fetch(endpoint, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Failed to delete hero with ID: ${heroID}`);

        alert(`Hero #${heroID ?? 'null'} deleted successfully.`);
        await fetchHeroes(); // Refresh the data
    } catch (err) {
        console.error('Failed to delete hero:', err.message);
    }
}

const filterHeroes = async () => {
    const value = document.getElementById('search').value;
    console.log(`filterHeroes was called with value: ${value}`);

    const response = await fetch(API_URL);
    const data = await response.json();
    const filteredHeroes = data.filter(hero =>
        hero.heroID === parseInt(value)
    );

    console.log(filteredHeroes);
}

// Event Listener for empty values
document.getElementById('clearSearchButton').addEventListener('click', () => {
    document.getElementById('number').value = '';
    document.getElementById('name').value = '';
    document.getElementById('year').value = '';
    document.getElementById('superproperty').value = '';
    document.getElementById('gear').value = '';
    console.log("Inputs were cleared!")
});


// Event Listeners
document.getElementById('heroForm').addEventListener('submit', addSuperhero);
document.getElementById('search').addEventListener('input', filterHeroes);


// Initial fetch of superheroes
fetchHeroes();