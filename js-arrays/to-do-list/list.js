// Delcare in global scope for developer console access 
var todos = [];

// Give HTML half second to load before running JS
window.setTimeout(function() {
	// Prompt user for input
	var input = prompt("What would you like to do?");

	// Run app while user does not choose to quit 
	while (input !== "quit") {
		if (input === "new") {
			addTodo();	
		}
		else if (input === "list") {
			listTodos();
		}
		else if (input === "delete") {
			deleteTodo();
		}
		// Prompt user for input
		input = prompt("What would you like to do?");
	}

	console.log("Successfully quit the app.");

	function listTodos() {
		console.log("***********");
		// Print each element individually with array element
		todos.forEach(function(todo, index) {
			console.log(index + ": " + todo);
		});
		console.log("***********");
	}

	function addTodo() {
		var newItem = prompt("Enter new to-do-item:");
		todos.push(newItem);
		console.log(newItem + "  added to-do");
	}	

	function deleteTodo() {
		var index = prompt("Which index to delete?");
		// Use splice() method to delete 1 element after a specific point
		todos.splice(index,1);
		console.log("Item at index " + index + " deleted");
	}

}, 500);

