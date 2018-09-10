// Grab the articles as a json

$(function() {

// $(document).on("click", "#get-scraped", function() {
  $(document).ready(function(){
  $.getJSON("/articles", function(data) {
  // For each one
  let truncClass = "ok";
  let storyLink ;
  let readMore;
  for (var i = data.length-1; i >= 0; i--) {
    // Display the apropos information on the page
    if (data[i].title.length > 100){
      console.log("high")
      truncClass = "truncate"
    } else truncClass = "none";
    if (data[i].storyLink != undefined){
      storyLink = data[i].storyLink;
      readMore = "...ReadMore"
    } else 
      {storyLink = "#"
      readMore = ""   };
    if (data[i].saved === false){
        $("#articles").append(`<div class="card">
        <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${data[i].link}">
        </div>
         <div class="card-content">
         <span class="card-title activator grey-text text-darken-4 ${truncClass}">${data[i].title}<i class="material-icons right">more_vert</i></span>
         </div>
         <div class="card-reveal">
         <span class="card-title grey-text text-darken-4">${data[i].title}<i class="material-icons right">close</i></span>
        <p>${data[i].description}</p>
        <p><a href="${storyLink}" target="_blank">${readMore}</p>
        <a class="waves-effect waves-light btn" article-id="${data[i]._id}" id="save-article">Save Article</a>
        </div>
        </div>`);

        // console.log(data[i].title.length);
    }
  
  }
});
});



$(document).ready(function(){

  $.getJSON("/articles/saved", function(data) {

    for (var i = 0; i < data.length ; i++) {
      $("#saved-articles").append(`<div class="card">
    
  
    <div class="card-image waves-effect waves-block waves-light">
    <img class="activator" src="${data[i].link}">
    </div>
    
     <div class="card-content">
     <span class="card-title activator grey-text text-darken-4">${data[i].title}<i class="material-icons right">more_vert</i></span>
     </div>
    
     <div class="card-reveal">
     <span class="card-title grey-text text-darken-4">${data[i].title}<i class="material-icons right">close</i></span>
    <p>${data[i].description}</p>
    <p><a href="${data[i].storyLink}" target="_blank">...Read More</p>
    <a class="waves-effect waves-light btn " article-id="${data[i]._id}" id="delete-article"  >Unsave Article</a>
    </div>
    <a class="btn-floating halfway-fab waves-effect waves-light blue darken-1 modal-trigger "href="#modal${i}"><i class="material-icons" >note_add</i></a> 
    <div id="modal${i}" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
  </div>
    </div>


    
    `);
    }

  });






});








$(document).on("click", "#scrape-clear", function() {

  $("#articles").empty();

});


$(document).on("click", "#scrape-now", function(){

  $.ajax({
    method: "GET",
    url: "/scrape" 
  })
  
})




// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});



// When you click the savenote button
$(document).on("click", "#save-article", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("article-id");
  

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/save/" + thisId,
    data: {
      saved: true
    }
  })
   
    .then(function(data) {
      // Log the response
      console.log(data);
    
    });

});

});



