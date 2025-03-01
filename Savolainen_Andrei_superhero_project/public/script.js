const API_URL = "http://localhost:4000/api/superheroes";

let superheroes = []; // Global variable to store superheroes

async function fetchHeroes() {
    const response = await fetch(API_URL);
    superheroes = await response.json(); // Store data globally
    renderTable(superheroes); // Render table with the full dataset
    loadHeroesIntoDropdown(); // Populate dropdown for updating
}

function renderTable(data) {
    let table = '<table>';
    table += `<tr>
        <th>heroID</th>
        <th>name</th>
        <th>yearOfBirth</th>
        <th>superproperty</th>
        <th>gear</th>
        <th>Actions</th>
    </tr>`;

    data.forEach((hero) => {
        table += `<tr>`;
        table += `<td> ${hero.heroID} </td>`;
        table += `<td> <a href="hero.html?id=${hero.heroID} ">${hero.name}</a></td>`;
        table += `<td> ${hero.yearOfBirth} </td>`;
        table += `<td> ${hero.superproperty} </td>`;
        table += `<td> ${hero.gear} </td>`;
        table += `<td>
        <button onclick="deleteHero(${hero.heroID})">Delete</button></td>`;
        table += `</tr>`;
    });

    document.getElementById("hero-list").innerHTML = table;
}

const addOrUpdateSuperhero = async (e) => {
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

function applyFilter() {
    // const searchValue = document.getElementById("search").value.toLowerCase();
    const searchValue = document.getElementById("search").value.toLowerCase();

    const filteredHeroes = superheroes.filter(hero =>
        hero.heroID === parseInt(searchValue) ||
        hero.name.toLowerCase().includes(searchValue) ||
        hero.superproperty.toLowerCase().includes(searchValue) ||
        hero.gear.toLowerCase().includes(searchValue)
    );

    renderTable(filteredHeroes); // Render only the filtered results
}

function switchTab(tab) {
    if (tab === 'add') {
        document.getElementById("addSection").style.display = "block";
        document.getElementById("updateSection").style.display = "none";
        document.getElementById("addTab").classList.add("active");
        document.getElementById("updateTab").classList.remove("active");
    } else {
        document.getElementById("addSection").style.display = "none";
        document.getElementById("updateSection").style.display = "block";
        document.getElementById("addTab").classList.remove("active");
        document.getElementById("updateTab").classList.add("active");
        loadHeroesIntoDropdown(); // Load heroes into dropdown when switching to update tab
    }
}

function loadHeroesIntoDropdown() {
    const select = document.getElementById("heroSelect");
    select.innerHTML = '<option value="">-- Select Hero --</option>';

    superheroes.forEach(hero => {
        const option = document.createElement("option");
        option.value = hero.heroID;
        option.textContent = `${hero.name} (ID: ${hero.heroID})`;
        select.appendChild(option);
    });
}

function populateHeroForm() {
    const heroID = document.getElementById("heroSelect").value;
    if (!heroID) return;

    const hero = superheroes.find(h => h.heroID === parseInt(heroID));
    if (!hero) return;

    // Populate the form with existing values
    document.getElementById("updateHeroID").value = hero.heroID;
    document.getElementById("updateName").value = hero.name;
    document.getElementById("updateYear").value = hero.yearOfBirth;
    document.getElementById("updateSuperproperty").value = hero.superproperty;
    document.getElementById("updateGear").value = hero.gear;
}

async function updateSuperhero(e) {
    e.preventDefault();

    const heroID = document.getElementById("updateHeroID").value;
    const name = document.getElementById("updateName").value.trim();
    const yearOfBirth = parseInt(document.getElementById("updateYear").value);
    const superproperty = document.getElementById("updateSuperproperty").value.trim();
    const gear = document.getElementById("updateGear").value.trim();

    if (!heroID || !name || isNaN(yearOfBirth) || !superproperty || !gear) {
        alert("All fields are required.");
        return;
    }

    const superhero = { name, yearOfBirth, superproperty, gear };

    try {
        console.log(`Updating superhero with ID: ${heroID}`);
        console.log("Superhero data:", superhero);

        const response = await fetch(`${API_URL}/${heroID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(superhero)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update superhero. Server response: ${errorText}`);
        }

        alert(`Superhero ID ${heroID} updated successfully!`);
        await fetchHeroes(); // Refresh hero list
        document.getElementById("updateHeroForm").reset(); // Clear form
    } catch (err) {
        console.error("Error updating superhero:", err);
    }
}

async function deleteAllHeroes() {
    try {
        const response = await fetch('http://localhost:4000/api/superheroes', {
            method: 'DELETE'
        });
        const result = await response.json();
        if (response.ok) {
            console.log(result.message);
            // Optionally, update the UI to reflect the deletion
        } else {
            console.error(`Failed to delete all heroes: ${result.error}`);
        }
        await fetchHeroes(); // Refresh hero list
    } catch (error) {
        console.error('Error deleting all heroes', error);
    }
}

// Event Listener for empty values
document.getElementById('clearSearchButton').addEventListener('click', () => {
    // document.getElementById('number').value = '';
    document.getElementById('name').value = '';
    document.getElementById('year').value = '';
    document.getElementById('superproperty').value = '';
    document.getElementById('gear').value = '';
    console.log("Inputs were cleared!")
});


// Event Listeners
document.getElementById('heroForm').addEventListener('submit', addOrUpdateSuperhero);
document.getElementById('search').addEventListener('input', applyFilter);

// document.getElementById('heroForm').addEventListener('submit', addOrUpdateSuperhero);
document.getElementById('updateHeroForm').addEventListener('submit', updateSuperhero);
document.getElementById('heroSelect').addEventListener('change', populateHeroForm);
document.getElementById('deleteAllSuperheroes').addEventListener('click', () => { deleteAllHeroes(); });


// Initial fetch of superheroes
fetchHeroes();