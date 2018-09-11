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
      if (!data[i].storyLink.includes("www")){
        storyLink = "http://www.cricinfo.com"+data[i].storyLink
        console.log(storyLink);
        readMore = "...ReadMore"
      } else {
           storyLink = data[i].storyLink;
           readMore = "...ReadMore"
      }
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

      if (data[i].title.length > 100){
        console.log("high")
        truncClass = "truncate"
      } else truncClass = "none";
      if (data[i].storyLink != undefined){
                 if (!data[i].storyLink.includes("www")){
                   storyLink = "http://www.cricinfo.com"+data[i].storyLink
                   console.log(storyLink);
                   readMore = "...ReadMore"
                 } else {
                      storyLink = data[i].storyLink;
                      readMore = "...ReadMore"
                 }
                }        
       else 
        {storyLink = "#"
        readMore = ""   };



      $("#saved-articles").append(`<div class="card">
    
  
    <div class="card-image waves-effect waves-block waves-light">
    <img class="activator" src="${data[i].link}">
    </div>
    
     <div class="card-content">
     <span class="card-title activator grey-text text-darken-4 ${truncClass}">${data[i].title}<i class="material-icons right">more_vert</i></span>
     </div>
    
     <div class="card-reveal">
     <span class="card-title grey-text text-darken-4 ${truncClass}">${data[i].title}<i class="material-icons right">close</i></span>
    <p>${data[i].description}</p>
    <p><a href="${storyLink}" target="_blank">${readMore}</p>
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



$(document).on("click", "#scrape-now", function(){

  $.ajax({
    method: "GET",
    url: "/scrape" 
  })
  // .then(function(){
  //   window.location.reload();
  //   console.log("page reloaded!")
  // })
  
})

$(document).on("click", "#refresh-page", function() {
  window.location.reload();
  console.log("page reloaded")
})






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
      window.location.reload();
    
    });

});


$(document).on("click", "#delete-article", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("article-id");
  

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/unsave/" + thisId,
    data: {
      saved: false
    }
  })
   
    .then(function(data) {
      // Log the response
      console.log(data);
      window.location.reload();
    
    });

});





});
