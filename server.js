const db = require('./db');

db.sync().then(async () => {
	console.log('We have a Database!');
	const authors = await db.readAuthors();
	console.log(await db.readAuthors());
	console.log(await db.readAuthor(authors[0].id));
});
