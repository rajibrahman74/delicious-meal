const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};




const displayMeals = (meals) => {
  console.log(meals);
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerText = "";
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");

    mealDiv.innerHTML = `
        <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <button onclick="loadMealDetail(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">Details</button>
            </div>
          </div>
        `;

    mealsContainer.appendChild(mealDiv);
  });
};




const searchMeals = () => {
  const searchField = document.getElementById("search-field").value;
  console.log(searchField);
  loadMeals(searchField);
};



const loadMealDetail = (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]))
    .catch((error) => {
      console.log(error);
    });
};



const displayMealDetail = (meal) => {
  document.getElementById("mealDetailsLabel").innerText = meal.strMeal;
  const mealDetailsBody = document.getElementById("mealDetailsBody");
  mealDetailsBody.innerHTML = `
    <img class="img-fluid" src="${meal.strMealThumb}">
    `;
};

loadMeals("chicken");