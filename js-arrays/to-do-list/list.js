// Delcare in global scope for developer console access 
var todos = [];

// Give HTML half second to load before running JS
window.setTimeout(function() {
	// Prompt user for input
	var input = prompt("What would you like to do?");

	// Run app while user does not choose to quit 
	while (input !== "quit") {
		if (input === "new") {
			var newItem = prompt("Enter new to-do-item:");
			todos.push(newItem);
		}
		else if (input === "list") {
			console.log(todos);
		}
		// Prompt user for input
		var input = prompt("What would you like to do?");
	}
	console.log("Successfully quit the app.");


}, 500);
