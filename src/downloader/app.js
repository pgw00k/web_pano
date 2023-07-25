// 百度全景图下载工具,需要先获取到PID
// https://mapsv1.bdimg.com/?qt=pdata&sid=0900190012170915145246000IN&pos=7_14&z=5&udt=20200825&from=PC
// pos=y_x
// 目前可知,在 z=5,pos.y:0~7,pos.x:0~15

const fs = require("fs");
const path = require("path");
const request = require("request");
const stools = require("I:\\CSharp_Project\\adia_lib\\web_server\\utils\\tools.js");
const BaiduPanoDownloader = require("./BaiduPanoDownloader.js").BaiduPanoDownloader;
const picc = require('../pic_combinder/pic_combinder.js');

function test(url="https://mapsv1.bdimg.com/?qt=pdata&sid=0900190012170915145246000IN&pos=7_14&z=5&udt=20200825&from=PC",filePath="test.jpg")
{
	let writeStream = fs.createWriteStream(filePath);
	let readStream = request(url);
	readStream.pipe(writeStream);
	readStream.on("end", function() {    
		console.log("文件下载成功");
	});
	readStream.on("error", function() {    
		console.log("错误信息:" + err)
	})
	writeStream.on("finish", function() {    
		console.log("文件写入成功");
	    writeStream.end();
	});
}

function combindpics(imgList,data)
{
	let op = {
		Output: `./static/images/${data.Info}.jpg`,
		Width: 8192,
		Height: 4096,
		imgList:imgList
	}
	picc.ListCombinder(op);
}

function downloadAll()
{
	let setting = stools.readConfig('./static/main.json');
	let count = setting.content.length;
	console.log(`Get ${count} content data.`);
	for(let i =1;i<count;++i)
	{
		let data = setting.content[i];
		let saveDirectory = `./static/images_raw/${data.Info}`;
		
		let bddl = new BaiduPanoDownloader("https://mapsv1.bdimg.com",data.PID,saveDirectory);
		bddl.GenerateUrls();
		bddl.DownloadAll( function(err,results){
			combindpics(results,data);
		} );
	}
}

function main()
{
	downloadAll();
}

module.exports = {
	test,
	main
}