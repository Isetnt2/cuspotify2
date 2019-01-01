
$(document).ready(function(){
  if ( $.cookie('theme') == 'light'){
const toggleBody = document.querySelector('.toggle-body');
const toggleBtn = document.querySelector('.toggle-btn');
          $("link.darkTheme").attr("href", "/light-theme.css");
  toggleBody.classList.toggle('toggle-body--on');
  toggleBtn.classList.toggle('toggle-btn--on');
  }
  else {
          $("link.darkTheme").attr("href", "/dark-theme.css");
  }
  var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
$(".settings").click(function() {
    modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
const toggleBody = document.querySelector('.toggle-body');
const toggleBtn = document.querySelector('.toggle-btn');

  toggleBtn.addEventListener('click', () => {
  toggleBody.classList.toggle('toggle-body--on');
  toggleBtn.classList.toggle('toggle-btn--on');
  toggleBtn.classList.toggle('toggle-btn--scale');
    var href = $("link.darkTheme").attr("href");
      if (href == "/dark-theme.css"){
        $("link.darkTheme").attr("href", "/light-theme.css")
        $.cookie('theme', 'light', { expires: 100, path: '/' });

      }
    else {
    $("link.darkTheme").attr("href", "/dark-theme.css")
      $.cookie('theme', 'dark', { expires: 100, path: '/' });

    }
      });
});