var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

var toggleAllBtn = document.getElementById("toggleAll");
var isAllOpen = false; // State tracker

// Toggle All button behavior
toggleAllBtn.addEventListener("click", function () {
  isAllOpen = !isAllOpen; // Flip state
  if (isAllOpen) {
      toggleAllBtn.textContent = "CLOSE ALL EXPERIENCES";
  }
  else {
    toggleAllBtn.textContent = "OPEN ALL EXPERIENCES";
  }
  for (i = 0; i < coll.length; i++) {
    var content = coll[i].nextElementSibling;
    if (isAllOpen) {
      coll[i].classList.add("active");
      content.style.display = "block";
    } else {
      coll[i].classList.remove("active");
      content.style.display = "none";
    }
  }
}
)
