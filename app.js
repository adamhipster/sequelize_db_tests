const express = require('express')
const app = express()
let db = require(__dirname + '/database')

//needed or else db is not initialized
setTimeout(dbTest, 500)

function dbTest(){
	db.HFAsk.findOne({
		include: [db.User],
	})
	.then( (asker) => {
		return db.HFGive.findOne({
			include: [db.User],
			where: {
				id: asker.hfgiveId,
			}
		})
		.then( (giver) => {
			return {asker: asker, giver: giver}
		});
	})
	.then( (hfPair) => {
		console.log('\n')
		console.log(hfPair.asker.user.name + ' from ' + hfPair.asker.location
			+ ' gives a high five to ' + 
					hfPair.giver.user.name + ' from ' + hfPair.giver.location + '!')
	})
}

app.listen(8000)