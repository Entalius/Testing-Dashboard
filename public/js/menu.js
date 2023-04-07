$(document).ready(function() {
  function slideMenu() {
    var activeState = $("#menu-container .menu-list").hasClass("active");
    $("#menu-container .menu-list").animate({left: activeState ? "0%" : "-100%"}, 400);
  }
  $("#menu-wrapper").click(function(event) {
    event.stopPropagation();
    $("#hamburger-menu").toggleClass("open");
    $("#menu-container .menu-list").toggleClass("active");
    slideMenu();
    $("body").toggleClass("overflow-hidden");
  });

  $(".menu-list").find(".accordion-toggle").click(function() {
    $(this).next().toggleClass("open").slideToggle("fast");
    $(this).toggleClass("active-tab").find(".menu-link").toggleClass("active");

    $(".menu-list .accordion-content").not($(this).next()).slideUp("fast").removeClass("open");
    $(".menu-list .accordion-toggle").not(jQuery(this)).removeClass("active-tab").find(".menu-link").removeClass("active");
  });

  // Event listener for click events on the document
  $(document).click(function(event) {
    closeMenuOnClickOutside(event);
  });
});

function closeMenuOnClickOutside(event) {
  var menuContainer = $("#menu-container");
  var menuWrapper = $("#menu-wrapper");

  // Check if the click is outside of the menu-container and menu-wrapper
  if (!menuContainer.is(event.target) && menuContainer.has(event.target).length === 0
      && !menuWrapper.is(event.target) && menuWrapper.has(event.target).length === 0) {

    // Close the menu if it's currently open
    if ($("#menu-container .menu-list").hasClass("active")) {
      $("#hamburger-menu").toggleClass("open");
      $("#menu-container .menu-list").toggleClass("active");
      $("#menu-container .menu-list").animate({left: "-100%"}, 400); // Updated line
      $("body").toggleClass("overflow-hidden");
    }
  }
}

// Show Scheduler Overview
document.getElementById("nav3").addEventListener("click", () => {
  document.getElementById("chart-container").style.display = "none";
  document.getElementById("table-container").style.display = "block";
});