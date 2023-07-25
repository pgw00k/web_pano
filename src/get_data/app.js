const fs = require("fs");
const path = require("path");
const stools = require("I:\\CSharp_Project\\adia_lib\\web_server\\utils\\tools.js");

function main()
{
	let setting = stools.readConfig('./static/main.json');
	let count = setting.content.length;
	console.log(`Get ${count} content data.`);
	let srcObj = {};
	for(let i =1;i<count;++i)
	{
		let data = setting.content[i];
		srcObj[data.Info]=`./images/${data.Info}.jpg`
	}
	
	stools.saveConfig('./static/srcObj.json',srcObj);
}

module.exports = {
	main
}