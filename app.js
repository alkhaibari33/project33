// $(document).ready(function(){

let gnimgbtn = $('.order') //select button with class Afterglow

let db = firebase.firestore().collection('drinkdb')
// $('.viewOrders').hide()

//urls for request
let nonAlcoholicDrinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
let allDrinksUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" 


// 1. Get NonAlcoholic Drink List from API
$.ajax({
    url : nonAlcoholicDrinkUrl,
    type: "GET",
    success: function(result){
        let drinks = result.drinks
        console.log(drinks)
        //append these drinks to the page 
        //in select field
        drinks.forEach(function(drink){
            $("#drinkList").append(`<option value="${drink.strDrink}">${drink.strDrink}</option>`)
        })     
    }
})

 //get url
gnimgbtn.on("click",function(e){ //click event listener
    e.preventDefault() //stop page from reloading

    let selValue = $('#drinkList').val() //get value of select option

        $.ajax({
            url:allDrinksUrl+selValue, // add value of select option to url
            type:"GET",
            success: function(result){ 
                console.log(result.drinks);
                let drinks = result.drinks
              
                    $("img").attr("src", drinks[0].strDrinkThumb)//change source of image
                    $("#dname").val(drinks[0].strDrink)
                    
            }
        })
})

$('.addOrder').on('click', function(e){
    e.preventDefault()

    db.add({
        firstname: $('#fname').val(),
        lastname: $('#lname').val(),
        drinkname : $('#dname').val(),
        country : $('#country').val()
    })
    .then(function(){
        let msg = "Order Accepted"
        $('.alert').html(msg)
    })
    .catch(function(error){
        console.log(error)
    })
})

// $('#addOrders').on('click', function(e){
//     e.preventDefault()
//     $('.createOrder').show()
//     $('.viewOrders').hide()

// })

// $('#viewOrders').on('click', function(e){
//     e.preventDefault()
    // $('.createOrder').hide()
    // $('.viewOrders').show()

    db.get()
    .then(function(results){
        let orders = results.docChanges()
        let html
        orders.forEach(function(order){
            $('.orderList').empty()
            console.log(order)
            html = `<tr id="${order.doc.id}"> 
                            <td>${order.doc.data().firstname}</td>
                            <td>${order.doc.data().lastname}</td>
                            <td>${order.doc.data().drinkname}</td>
                            <td>${order.doc.data().country}</td>
                        </tr>`

            $('.orderList').append(html)
        })    
    })
    .catch(function(error){
        console.log(error)
    })
// })