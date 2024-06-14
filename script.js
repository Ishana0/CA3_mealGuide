const searchBar = document.getElementById("search");
const searchButton = document.getElementById("search-btn");
const image = document.getElementById("image");
const text = document.getElementById("text");
const modal = document.getElementById("modal");
const container = document.getElementById("container");
const context = document.getElementById("context");
const cross = document.getElementById("cross");
const mainContainer = document.getElementById("main-container")
const recipeContainer = document.getElementById("recipe-container")


// Fetch a random meal on page load
function getData() {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            displayRandomData(data);
        });
}
getData();

// Fetch meals based on the search query
function searchedData(recipeName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            displaySearchedData(data.meals);
        });
}

function displaySearchedData(mealArray) {
    if (mealArray && mealArray.length > 0) {
        mainContainer.style.display = "block"; 
        recipeContainer.innerHTML = ""; 
        mealArray.forEach(meal => {
            const recipeCard = document.createElement("div");
            recipeCard.className = "recipe-card";
            recipeCard.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
            `;
            recipeContainer.appendChild(recipeCard);
        });
        document.body.style.overflow = "auto"; 
    } else {
        mainContainer.style.display = "none"; 
        recipeContainer.innerHTML = ""; 
        document.body.style.overflow = "hidden"; 
    }
}

// Display the random meal
function displayRandomData(data) {
    console.log();
    let meal = data.meals[0];
    image.src = meal.strMealThumb;
    text.innerText = meal.strMeal;
    image.onclick = () => {
        modal.style.display = "flex";
        displayModal(meal);
    };
}

// Display modal with meal details
function displayModal(meal) {
    context.innerHTML = "";
    for (let key in meal) {
        if (meal[key] && key.startsWith("strIngredient") && meal[key].trim()) {
            const li = document.createElement("li");
            li.innerText = meal[key];
            context.appendChild(li);
        }
    }
}

// Close the modal
cross.onclick = () => {
    modal.style.display = "none";
}

// Search button functionality
searchButton.onclick = () => {
    if (searchBar.value.trim() !== "") {
        searchedData(searchBar.value.trim());
    } else {
        searchBar.value = "";
    }
}

// Initial page load: hide mainContainer and disable scrolling
mainContainer.style.display = "none";
document.body.style.overflow = "hidden";