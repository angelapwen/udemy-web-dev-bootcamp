// Check off specific to-dos by clicking
$("ul").on('click', "li", function() {
	$(this).toggleClass("completed");
});  

// Click on X to delete to-do
$("ul").on('click', "span", function(event) {
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
	event.stopPropagation();
});

// Add listener to input to fire when we hit enter
$("input[type='text']").keypress(function(event) {
	if(event.which === 13) {
		// Extract value that was input 
		var todoText = $(this).val();
		// Clear input box
		$(this).val("");
		// Create a new li and add to ul
		$("ul").append("<li><span><i class ='far fa-trash-alt'></i></span> " + todoText + "</li>");
	}
});

$("#toggle-form").click(function() {
	$("input[type='text']").fadeToggle();
});