var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

var products = [
  {
    id: '0',
    picture_url: "https://upload.wikimedia.org/wikipedia/en/4/4e/US_cover_of_Go_Set_a_Watchman.jpg",
    name: "Go Set a Watchman",
    category: "Books",
    selling_points: "Incredibly miseleading title and cover, not for Train-lovers or Watchman enthusiast.",
    price: 24.99,
    expandedDesc: lorem
    
  },
  {
    id: '1',
    picture_url: "http://image.slidesharecdn.com/book-1-twilight-1231022548425199-1/95/book-1-twilight-1-728.jpg",
    name: "Twilight",
    category: "Books",
    selling_points: "A super original piece thats totally original and has like, vampires and werewolves.",
    price: 9.99,
    expandedDesc: lorem
  },
  {
    id: '2',
    picture_url: "https://images-na.ssl-images-amazon.com/images/I/51RWA6BmIWL._SX320_BO1,204,203,200_.jpg",
    name: "How to Win Friends & Influence People",
    category: "Books",
    selling_points: "Good for robots and programmers learning how to go outside.",
    price: 7.99,
    expandedDesc: lorem
  },
  {
    id: '3',
    picture_url: "http://i.kinja-img.com/gawker-media/image/upload/s--9N1Ijk1t--/c_fit,fl_progressive,q_80,w_636/1940ob66cyu2ljpg.jpg",
    name: "Dark Side of the Moon",
    category: "Music",
    selling_points: "I bet its cold over there, bring a jacket for this one!",
    price: 99.99,
    expandedDesc: lorem
  },
  {
    id: '4',
    picture_url: "http://cps-static.rovicorp.com/3/JPG_400/MI0000/677/MI0000677650.jpg",
    name: "Thriller",
    category: "Music",
    selling_points: "Good ole MJ! This album is both, literally and figurtively a thriller.",
    price: 19.00,
    expandedDesc: lorem
  },
  {
    id: '5',
    picture_url: "http://ecx.images-amazon.com/images/I/51713fx1VdL._SY300_.jpg",
    name: "Ella & Louis",
    category: "Music",
    selling_points: "They are smiling because its good, so good they didnt need to think of a real title.",
    price: 110.00,
    expandedDesc: lorem
  },
];

$('document').ready( function() {

  
var uniqueList = null;
var uniqueListC = null;
var filterAppend = null;
var randoArray = _.shuffle(products);
var nameArray = [];
var priceArray = [];
var qtyArray = [];
var cartTotalGlobal = 0;



function qtyFiller(arrayOfQty){
  for(var i = 0; i < products.length; i++) {
    arrayOfQty[i] = 0;
  }
}

//add to cart click handler
function addClick(target, idUse, quanityInput, modalMethod) { 
  $(target + idUse).click( function() {
    if ($('#tr' + idUse).val() === undefined) {
      $('#cartBody').append('<tr class="itemsClear" id="tr'+ idUse +'"></tr>');
    }
    if ($('#cartName' + idUse ).val() === undefined) {
      $('#tr' + idUse).append('<td class="itemsClear" id="cartName' + idUse + '">' + nameArray[idUse] + '</td>');
      $('#tr' + idUse).append('<td class="quantityClear" id="cartqty' + idUse + '"></td>');
      $('#tr' + idUse).append('<td class="totalClear" id="cartPrice' + idUse + '"></td>');
      $('#cartPrice' + idUse).append()
    }
    qtyArray[idUse] = (qtyArray[idUse] + parseInt($(quanityInput + idUse).val()));

    $('#cartqty' + idUse).html(qtyArray[idUse]);

    $('#cartPrice' + idUse).html(('$' + (qtyArray[idUse] * priceArray[idUse]).toFixed(2)) + ' ' +'<button id="removeItemHere' + idUse + '" type="button" class="btn btn-default btn-danger btn-xs"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button> <span id="removeItem">Remove Item');


    var qtyReduced = _.reduce(qtyArray, function(memo, value, key){
    
      return memo + value
    
    }, 0);

    cartTotalGlobal += (parseInt($(quanityInput + idUse).val()) * priceArray[idUse])

    $('#numInCart').html(qtyReduced + ' Items in Cart');

       //removeButton
    $('#removeItemHere' + idUse).click(function(){
      cartTotalGlobal -= (qtyArray[idUse] * priceArray[idUse])
      qtyArray[idUse] = 0;
      qtyReduced = _.reduce(qtyArray, 
        function(memo, value, key){
    
          return memo + value
    
        }, 0);
      $('#numInCart').html(qtyReduced + ' Items in Cart')
      $('#qtyC').html('Total Items: ' + qtyReduced);
      $('#cartTotalC').html('$' + cartTotalGlobal.toFixed(2));
      $('#tr' + idUse).remove();
      if(cartTotalGlobal <= 0){
        $('#cartTotal').remove();
      }
    })

    $('#cartTotal').remove();
    $('#cartBody').append('<tr class="itemsClear" id="cartTotal"></tr>');
    $('#cartTotal').append('<td> Total </td>');
    $('#cartTotal').append('<td id="qtyC"> Total Items: ' + qtyReduced + '</td>');
    $('#cartTotal').append('<td id="cartTotalC">$' + cartTotalGlobal.toFixed(2) + '</td>')

    if(qtyArray[idUse] === 0) {
      $('#cartName' + idUse).remove();
      $('#cartqty' +idUse).remove();
      $('#cartPrice' + idUse).remove();
    }
    $('.qty').val('1');
    $(modalMethod + idUse).modal("toggle")
  })
}

//Cart Button
$('#cartButton').click(function() {
  $('#featureTag').hide();
  $('#featureBar').hide();
  $('#heyNow').hide();
  $('#catTag').hide();
  $('#displayList').empty();
  $('#inputBox').val('');
  $('#cart').show();
})

//ClearCart Button
$('#clearButton').click(function(){
  $('.itemsClear').remove();
  $('.quantityClear').remove();
  $('.totalClear').remove();
  $('#numInCart').html('0 Items in Cart');
})







//Keydown search function
$('#inputBox').on("input",function() {
  $('#featureTag').hide();
  $('#featureBar').hide();
  $('#heyNow').hide();
  $('#catTag').hide();
  var inputValue = this.value;

  //textBox watcher, resets to home page when nothing in input box
  if(inputValue.length === 0) {
    $(featureBar).show();
    $(featureTag).show();
  };
  //Search feature
  filterAppend = _.filter(products, function(value5, key5){


    nameUpper = value5.name.toUpperCase();
    sellingUpper = value5.selling_points.toUpperCase();
    inputUpper = inputValue.toUpperCase();
    
    return nameUpper.indexOf(inputUpper) != '-1' || sellingUpper.indexOf(inputUpper) != '-1'
  
  });
  appendToPage(filterAppend);
});

//Home Button
$('#homeButton').click(function(){
  $('#featureTag').show();
  $('#featureBar').show();
  $('#heyNow').show();
  $('#catTag').hide();
  $('#displayList').empty();
  $('#inputBox').val('');
  appendToPage(products);
})
//Makes a list for category drop down
function addCategory(productsList) {
  uniqueListC = _.uniq(_.pluck(productsList, 'category'));
};
//Dropdown button factory
function clickDropMenuFactory(uniqueList) {
  _.each(uniqueListC, function(value4, key4){
    $('.' + value4).click(function() {
      $('#featureTag').hide();
      $('#featureBar').hide();
      $('#heyNow').hide();
      $('#displayList').empty();
      $('#catTag').html(value4);
      $('#catTag').show();
      $('#inputBox').val('');
      var uniqAppend = _.filter(products, function(value, key){
      return value.category === value4
    });
    appendToPage(uniqAppend);
  })
 })
};

//Modal Append
function modalAppend(productsList) {
  _.each(productsList, function(value, key){
    var idUse = value.id;
    $('#myModalProp' + idUse).append('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">' + value.name + '</h4></div>');
    $('#myModalProp' + idUse).append('<div class="modal-body"><img class="img-responsive" id="imageModal" src="'+ value.picture_url + '" alt="..." />');
    $('#myModalProp' + idUse).append('<p>Category: ' + value.category +'</p>');
    $('#myModalProp' + idUse).append('<p>Price: $' + value.price.toFixed(2) + '</p>' );
    $('#myModalProp' + idUse).append('<p> <u>Expanded Description:</u> ' + value.expandedDesc + '</p></div>');
    $('#myModalProp' + idUse).append('<div class="modal-footer"><div id="qtyStyleModal"><h11>Qty:</h11><input type="number" class="qty" id="qtyModal' + idUse + '"></div><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><a href="#" class="btn btn-primary" role="button" id="cartIdModal' + idUse + '">Add to Cart</a></div>');
    addClick('#cartIdModal', idUse, '#qtyModal', '#myModal');
  });
}

//Appends any list of product objects passed through it
function appendToPage(productsList) {
  $('#displayList').empty();
_.each(productsList, function(value, key){
    var idUse = value.id

    //fill name and price array
    nameArray.push(value.name);
    priceArray.push(value.price.toFixed(2));

  _.each(value, function(value2, key2){
    if (key2 === 'id') {
    $('#displayList').append('<div class="col-md-4"><div class="thumbnail" id="ident' + idUse + '" style="background-color:#ecf0f1;"></div></div>' )
    $('#container').append('<div class="modal fade" id="myModal' + idUse + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content" id="myModalProp' + idUse + '"></div></div></div>')

    }
    //Thumbnail Builder
    if (key2 === 'picture_url'){
      $('#ident' + idUse).append('<img id="imageTime" src="'+ value2 + '" alt="...">')
    }
    if (key2 === 'name') {
      if (value2.length > 38) {
        var sliceOut = value2.slice(0,39);
        $('#ident' + idUse).append('<div class="caption"> <p id="nameTag">' + sliceOut + '</p></div>')
      }
      else {
        $('#ident' + idUse).append('<div class="caption"> <p id="nameTag">' + value2 + '</p></div>')
      };
    }
    if (key2 === 'category') {
      $('#ident' + idUse).append('<p id="category"> Category: ' + value2 + '</p>')
    }
    if (key2 === 'selling_points') {
      $('#ident' + idUse).append('<p>' + value2 + '</p>')
    }
    if (key2 === 'price') {
      $('#ident' + idUse).append('<div id="priceTag"> $' + value2.toFixed(2) + '</div>');
    }

  })
  //Append input box
  $('#ident' + idUse).append('<div id="qtyStyle"><h11>Qty:</h11><input type="number" class="qty" id="qty' + idUse + '"></div>');

  //Appened Modal Button
  $('#ident' + idUse).append('<div class="paddedBot"><button type="button" class="btn btn-primary modalTime" data-toggle="modal" data-target="#myModal' + idUse +'"> More Info </button></div>')

  //Append Add Button
  $('#ident' + idUse).append('<div class="paddedLeft"><a href="#" class="btn btn-primary" role="button" id="cartId' + idUse + '">Add to Cart</a></div>')
  //Add to cart click handler
  addClick('#cartId',idUse, '#qty');
  $('.qty').val('1');
  $('#cart').hide();
})
};

//Takes a unique list of categories and adds it to dropdown
function appendCategory (uniqueProductList) {
  _.each(uniqueProductList, function(value3, key3){
    $('#dropMenu').append('<li><a href="#" class="' + value3 + '">' + value3 + "</a></li>");
  })
};

//Features Modal
_.each(randoArray, function(value, key){
  var idUse = value.id;
  $('#myModalSpace').append('<div class="modal fade" id="myModalDiv' + idUse + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content" id="myModalPropSpace' + idUse + '"></div></div></div>')
  $('#myModalPropSpace' + idUse).append('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">' + value.name + '</h4></div>');
  $('#myModalPropSpace' + idUse).append('<div class="modal-body"><img class="img-responsive" id="imageModal" src="'+ value.picture_url + '" alt="..." />');
  $('#myModalPropSpace' + idUse).append('<p>Category: ' + value.category +'</p>');
  $('#myModalPropSpace' + idUse).append('<p>Price: $' + value.price.toFixed(2) + '</p>' );
  $('#myModalPropSpace' + idUse).append('<p> <u>Expanded Description:</u> ' + value.expandedDesc + '</p></div>');
  $('#myModalPropSpace' + idUse).append('<div class="modal-footer"><div id="qtyStyleModalSpace"><h11>Qty:</h11><input type="number" class="qty" id="qtyModalSpace' + idUse + '"></div><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><a href="#" class="btn btn-primary" role="button" id="cartIdModalSpace' + idUse + '">Add to Cart</a></div>');
  addClick('#cartIdModalSpace', idUse, '#qtyModalSpace', '#myModalDiv');
})



//Features List
function appendFeatureList(randomizedArray) {
  var currentIndex = 0;
  setInterval(function() {
    $('#featureBar').html('<div class="image-container"><div class="animated fadeIn" id="animateThis"><h4>' + randomizedArray[currentIndex].name + '<div style="color:#e67e22"> Just $' + randomizedArray[currentIndex].price.toFixed(2) + '!!!</div></h4><img class="center-block" src="' + randomizedArray[currentIndex].picture_url +'" alt="..." id="pictureNails"><div id="modalButton"></div></div></div>')
    $('#modalButton').html('<div class="paddedBot"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalDiv' + randomizedArray[currentIndex].id +'"> More Info </button></div>')
    currentIndex += 1;
    if (currentIndex === randomizedArray.length) {
      currentIndex = 0;
    }
    setTimeout(function() {
      $('#animateThis').attr('class','animated fadeOut')
    }, 7000)
  }, 8000)
}

$('#featureBar').html('<div class="image-container"><h2 class="animated fadeIn" id="titleSplash">WELCOME TO THINGSNSTUFF </h2><h6>Click on a product in the feature slide or choose from the list below.</h6></div>')

appendToPage(products);
addCategory(products);
appendCategory(uniqueListC);
clickDropMenuFactory(uniqueListC);
appendFeatureList(randoArray);
modalAppend(products);
qtyFiller(qtyArray);

$('.qty').val('1');

})

