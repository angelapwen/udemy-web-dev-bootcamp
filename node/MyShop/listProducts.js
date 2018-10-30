let faker = require("faker");
console.log("******************");
console.log("WELCOME TO MY SHOP");
console.log("******************");
for (let i = 0; i < 10; i ++) {
	let adj = faker.commerce.productAdjective();
	let adj2 = faker.commerce.productAdjective();
	let prod = faker.commerce.product();
	let price = faker.commerce.price();

	console.log(adj + " " + adj2 + " " + prod + " - $" + price);
}
