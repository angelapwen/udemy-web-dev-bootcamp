var body = document.querySelector("body");
var button = document.querySelector("button");

button.addEventListener("click",function(){
	if (body.style.background === "white") {
		body.style.background = "purple";
	}
	else {
		body.style.background = "white";
	}
});
