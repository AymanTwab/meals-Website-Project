let x = 'a';
let htmlCont = '                                                                                                                                    '
meals()

$(document).ready(function () {
    $('#loadingLayer').fadeOut(500)
});
// --------------------------------- navbar ----------------------------------------------------------

$('#openArrow,#closeArrow').click(function () {
    if ($('.side-nav-menu').css('left') == '0px') {
        // close navbar
        closeNav()
        linksMoveBottom()
        closeNavArrow()
    } else if ($('.side-nav-menu').css('left') == '-230px') {
        // open navbar
        openNav()
        linksMoveTop()
        openNavArrow()
    }
})

function openNav() {
    $('.side-nav-menu').css('left', '0px')
}

function closeNav() {
    $('.side-nav-menu').css('left', '-230px')
    closeNavArrow()
}

function linksMoveTop() {
    $('.side-nav ul li:nth-child(1)').animate({ top: 20 }, 100, function () {
        $('.side-nav ul li:nth-child(2)').animate({ top: 20 }, 100, function () {
            $('.side-nav ul li:nth-child(3)').animate({ top: 20 }, 100, function () {
                $('.side-nav ul li:nth-child(4)').animate({ top: 20 }, 100, function () {
                    $('.side-nav ul li:nth-child(5)').animate({ top: 20 }, 100,)
                })
            })
        })
    })
}

function linksMoveBottom() {
    $('.side-nav ul li:nth-child(1)').animate({ top: 150 }, 50, function () {
        $('.side-nav ul li:nth-child(2)').animate({ top: 150 }, 50, function () {
            $('.side-nav ul li:nth-child(3)').animate({ top: 150 }, 50, function () {
                $('.side-nav ul li:nth-child(4)').animate({ top: 150 }, 50, function () {
                    $('.side-nav ul li:nth-child(5)').animate({ top: 150 }, 50,)
                })
            })
        })
    })
}

function openNavArrow() {
    $('#openArrow').fadeOut(300, function () {
        $('#closeArrow').fadeIn(300)
    })
}

function closeNavArrow() {
    $('#closeArrow').fadeOut(300, function () {
        $('#openArrow').fadeIn(300)
    })
}

// --------------------------------------------------------------------------------------------------

// --------------------------APIs---------------------------------------------------------------------

async function meals() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`);
    const meals = (await response.json()).meals;
    showData(meals)

}

async function mealsSearchByLetter() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${x}`);
    const meals = (await response.json()).meals;
    showData(meals)
}

async function mealPageWithId(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const meals = (await response.json()).meals;
    showMealPage(meals[0])
}

async function mealCategories() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const categories = (await response.json()).categories;
    showCategoriesData(categories)
}

async function mealCategoryWithId(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
    const meals = (await response.json()).meals;
    showMealsDataWithId(meals)
}

async function mealArea() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const area = (await response.json()).meals;
    showAreasData(area)
}

async function mealAreaWithId(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`);
    const meals = (await response.json()).meals;
    showMealsDataWithId(meals)
}
async function mealIngredientWithId(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`);
    const meals = (await response.json()).meals;
    showMealsDataWithId(meals)
}

async function mealIngredient() {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const ingredient = (await response.json()).meals;
    showIngredientData(ingredient)
}


// --------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------

function showData(meals) {
    let htmlCont = ''
    for (let i = 0; i < meals.length; i++) {
        htmlCont += (` <div div class="col-md-3 g-3 Card position-relative" >
            <div id="mealData" class="rounded-4 overflow-hidden position-relative">
                <img src="${meals[i].strMealThumb}" alt="">
                    <div class="w-100 overlay">
                        <h2 id="${meals[i].idMeal}" class="ps-3 mealName">${meals[i].strMeal}</h2>
                    </div>
            </div>
    </div> `)
    }
    $('#homePage').html(htmlCont)
    $('.mealName').click(function (event) {
        mealPageWithId(event.target.id);
    })
}

$('#search').click(function () {
    clearData()
    $('#searchBox').html(`<div class="col-md-5 offset-1">
<input id="nameSearch" class="form-control mt-4" type="text" placeholder="Search By Name">
</div>
<div class="col-md-5">
<input id="letterSearch" maxlength="1" class="form-control mt-4" type="text" placeholder="Search By Letter">
</div>`)
    closeNav()
    $('#nameSearch').keyup(function () {
        x = $('#nameSearch').val()
        meals()
    })
    $('#letterSearch').keyup(function () {
        x = $('#letterSearch').val()
        mealsSearchByLetter()
    })
})

function showMealPage(meal) {
    $('#homePage').html('')
    $('#searchBox').html('')
    $('#mealPage').html(`<div class="col-md-4">
    <img class="w-100 rounded-4" src="${meal.strMealThumb}" alt="">
    <h2 class="text-white">${meal.strMeal}</h2>
</div>
<div class="col-md-8">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    <h3>Area : ${meal.strArea}</h3>
    <h3>Category : ${meal.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul>

    ${(meal.strIngredient1 != "") ? `<li>${meal.strMeasure1} ${meal.strIngredient1}</li>` : ''}
    ${(meal.strIngredient2 != "") ? `<li>${meal.strMeasure2} ${meal.strIngredient2}</li>` : ''}
    ${(meal.strIngredient3 != "") ? `<li>${meal.strMeasure3} ${meal.strIngredient3}</li>` : ''}
    ${(meal.strIngredient4 != "") ? `<li>${meal.strMeasure4} ${meal.strIngredient4}</li>` : ''}
    ${(meal.strIngredient5 != "") ? `<li>${meal.strMeasure5} ${meal.strIngredient5}</li>` : ''}
    ${(meal.strIngredient6 != "") ? `<li>${meal.strMeasure6} ${meal.strIngredient6}</li>` : ''}
    ${(meal.strIngredient7 != "") ? `<li>${meal.strMeasure7} ${meal.strIngredient7}</li>` : ''}
    ${(meal.strIngredient9 != "") ? `<li>${meal.strMeasure9} ${meal.strIngredient9}</li>` : ''}       
    ${(meal.strIngredient10 != "") ? `<li>${meal.strMeasure10} ${meal.strIngredient10}</li>` : ''}       
    ${(meal.strIngredient11 != "") ? `<li>${meal.strMeasure11} ${meal.strIngredient11}</li>` : ''}       
    ${(meal.strIngredient12 != "") ? `<li>${meal.strMeasure12} ${meal.strIngredient12}</li>` : ''}       
    ${(meal.strIngredient13 != "") ? `<li>${meal.strMeasure13} ${meal.strIngredient13}</li>` : ''}       
    ${(meal.strIngredient14 != "") ? `<li>${meal.strMeasure14} ${meal.strIngredient14}</li>` : ''}       
    ${(meal.strIngredient15 != "") ? `<li>${meal.strMeasure15} ${meal.strIngredient15}</li>` : ''}       
    ${(meal.strIngredient16 != "") ? `<li>${meal.strMeasure16} ${meal.strIngredient16}</li>` : ''}       
    ${(meal.strIngredient17 != "") ? `<li>${meal.strMeasure17} ${meal.strIngredient17}</li>` : ''}       
    ${(meal.strIngredient18 != "") ? `<li>${meal.strMeasure18} ${meal.strIngredient18}</li>` : ''}       
    ${(meal.strIngredient19 != "") ? `<li>${meal.strMeasure19} ${meal.strIngredient19}</li>` : ''}       
    ${(meal.strIngredient20 != "") ? `<li>${meal.strMeasure20} ${meal.strIngredient20}</li>` : ''}       
        
    </ul>
    <h3>Tags :</h3>
    <ul class="tagList">
    ${(meal.strTags != null) ? `<li>${meal.strTags}</li>` : ''}
    </ul>
    <div class="outLinks">
        <a class="btn btn-success" href="${meal.strSource}">Source</a>
        <a class="btn btn-danger" href="${meal.strYoutube}">Youtube</a>
    </div>
</div>`)
}

function showCategoriesData(categories) {
    let htmlCont = ''
    for (let i = 0; i < categories.length; i++) {
        htmlCont += (` <div class="col-md-3 g-3 Card position-relative" >
            <div id="mealData" class="rounded-4 overflow-hidden position-relative">
                <img src="${categories[i].strCategoryThumb}" alt="">
                    <div class="w-100 overlay d-flex flex-column p-3 justify-content-start">
                        <div>
                        <h2 id="${categories[i].strCategory}" class="categoryName">${categories[i].strCategory}</h2>
                        </div>
                        <div>
                        <p class="text-dark">${categories[i].strCategoryDescription}</p></div>
                        </div>
            </div>
    </div> `)
    }
    $('#homePage').html(htmlCont)
    $('.categoryName').click(function (event) {
        mealCategoryWithId(event.target.id);
    })
}

function showMealsDataWithId(meals) {
    clearData()
    let htmlCont = ''
    for (let i = 0; i < meals.length; i++) {
        htmlCont += (` <div div class="col-md-3 g-3 Card position-relative" >
            <div id="mealData" class="rounded-4 overflow-hidden position-relative">
                <img src="${meals[i].strMealThumb}" alt="">
                    <div class="w-100 overlay">
                        <h2 id="${meals[i].idMeal}" class="ps-3 mealName">${meals[i].strMeal}</h2>
                    </div>
            </div>
    </div> `)
    }
    $('#homePage').html(htmlCont)
    $('.mealName').click(function (event) {
        mealPageWithId(event.target.id);
    })
}

$('#categories').click(function () {
    clearData()
    mealCategories()
    closeNav()
})

$('#area').click(function () {
    clearData()
    mealArea()
    closeNav()
})

$('#ingredient').click(function () {
    clearData()
    mealIngredient()
    closeNav()
})

function showAreasData(areas) {
    let htmlCont = ''
    for (let i = 0; i < areas.length; i++) {
        htmlCont += `
        <div  class="col-md-3 g-3 Card position-relative text-center">
                    <i class="fa-solid fa-house-laptop fs-1"></i>
                    <h3 id="${areas[i].strArea}" class="areaName">${areas[i].strArea}</h3>
                </div>
        `
    }
    $('#homePage').html(htmlCont)
    $('.areaName').click(function (event) {
        mealAreaWithId(event.target.id)
    })
}
function showIngredientData(ingredient) {
    let htmlCont = ''
    for (let i = 0; i < ingredient.length; i++) {
        htmlCont += `
        <div  class="col-md-3 g-3 Card position-relative text-center">
        <i class="fa-solid fa-drumstick-bite fs-1"></i>
                    <h3 id="${ingredient[i].strIngredient}" class="ingredientName">${ingredient[i].strIngredient}</h3>
                </div>
        `
    }
    $('#homePage').html(htmlCont)
    $('.ingredientName').click(function (event) {
        mealIngredientWithId(event.target.id)
    })
}

function clearData() {
    $('#searchBox').html('')
    $('#homePage').html('')
    $('#mealPage').html('')
    $('#contactPage').html('')

}

// --------------------------------------------------------------------------------------------------------
// ---------------------------------------Contacts-----------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var passRegex = /^(?=.*\d)(?=.*[a-z]).{8,}$/;
var phoneRegex = /^01[0125][0-9]{8}$/;

$('#contact').click(function () {
    clearData()
    closeNav()
    $('#contactPage').html(`<div class="col-md-5 offset-1 mx-auto my-3">
    <input class=" contInput form-control nameInput" type="text" placeholder="Enter Your Name">
    <p class="inputRequird displayP nameInputP">Special characters and numbers not allowed</p>
</div>
<div class="col-md-5 offset-1 mx-auto my-3">
    <input class=" contInput form-control emailInput" type="email" placeholder="Enter Your Email">
    <p class="inputRequird displayP emailInputP">Email not valid *exemple@yyy.zzz</p>
</div>
<div class="col-md-5 offset-1 mx-auto my-3">
    <input class=" contInput form-control phoneInput" type="tel" placeholder="Enter Your Phone">
    <p class="inputRequird displayP phoneInputP">Enter valid Phone Number</p>
</div>
<div class="col-md-5 offset-1 mx-auto my-3">
    <input class=" contInput form-control ageInput" type="number" placeholder="Enter Your Age">
    <p class="inputRequird displayP ageInputP">Enter valid age</p>
</div>
<div class="col-md-5 offset-1 mx-auto my-3">
    <input class=" contInput form-control passInput" type="password" placeholder="Enter Your Password">
    <p class="inputRequird displayP passInputP">Enter valid password *Minimum eight characters, at least one letter and one
        number:*</p>
</div>
<div class="col-md-5 offset-1 mx-auto my-3">
    <input class=" contInput form-control repassInput" type="password" placeholder="Confirm Password">
    <p class="inputRequird displayP repassInputP">Enter valid repassword</p>
</div>
<button id="submitBtn" class="col-2 offset-5 btn btn-outline-danger disabled ">Submit</button>`)
    $('.nameInput').keyup(function () {
        if (nameRegex.test($('.nameInput').val())) {
            $('.nameInputP').addClass("displayP")
        } else {
            $('.nameInputP').removeClass("displayP")
        }
        submitValidation()
    })
    $('.emailInput').keyup(function () {
        if (emailRegex.test($('.emailInput').val())) {
            $('.emailInputP').addClass("displayP")
        } else {
            $('.emailInputP').removeClass("displayP")
        }
        submitValidation()
    })
    $('.phoneInput').keyup(function () {
        if (phoneRegex.test($('.phoneInput').val())) {
            $('.phoneInputP').addClass("displayP")
        } else {
            $('.phoneInputP').removeClass("displayP")
        }
        submitValidation()
    })
    $('.ageInput').keyup(function () {
        if (($('.ageInput').val().length) < 1) {
            $('.ageInputP').removeClass("displayP")
        }
        else if (($('.ageInput').val().length) > 1) {
            $('.ageInputP').addClass("displayP")
        }
        submitValidation()
    })
    $('.passInput').keyup(function () {
        if (passRegex.test($('.passInput').val())) {
            $('.passInputP').addClass("displayP")
        } else {
            $('.passInputP').removeClass("displayP")
        }
        submitValidation()
    })
    $('.repassInput').keyup(function () {
        if ($('.repassInputP').val() == $('.passInputP').val()) {
            $('.repassInputP').addClass("displayP")
        } else {
            $('.repassInputP').removeClass("displayP")
        }
        submitValidation()
    })
})


function submitValidation() {
    if (nameRegex.test($('.nameInput').val()) && emailRegex.test($('.emailInput').val()) && phoneRegex.test($('.phoneInput').val()) && (($('.ageInput').val().length) > 1) && passRegex.test($('.passInput').val()) && (($('.repassInput').val()) === ($('.passInput').val()))) {
        $('#submitBtn').removeClass('disabled')
    } else {
        $('#submitBtn').addClass('disabled')
    }
}