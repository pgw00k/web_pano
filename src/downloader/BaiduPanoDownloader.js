const fs = require("fs");
const path = require("path");
const request = require("request");
const async = require('async');
const URL = require('url').URL;

const DefaultOptions = {

}

class BaiduPanoDownloader {
	constructor(baseUrl = "https://mapsv1.bdimg.com", pid = "0900190012170915145246000IN", saveDirectory = "./",
		options = DefaultOptions) {
		this.baseUrl = baseUrl;
		this.pid = pid;
		this.saveDirectory = saveDirectory;
		this.options = options;
		this.isGenerated = false;
	}

	GenerateUrls() {
		this.imgList = [];
		let z = 5;
		
		let imgUrl = new URL(this.baseUrl);
		imgUrl.search = new URLSearchParams({
			qt: "pdata",
			sid: this.pid,
			pos: `0_0`,
			z: 5,
			udt: "20200825",
			from: "pc"
		});

		for (let x = 0; x < 16; x++) {
			for (let y = 0; y < 8; y++) {
				imgUrl.searchParams.set('pos', `${y}_${x}`);
				let imgData = {};
				imgData.fileName = path.join(this.saveDirectory, `${x.toString().padStart(2, "0")}_${y.toString().padStart(2, "0")}_${z}.jpg`);
				imgData.url = imgUrl.href.toString();
				this.imgList.push(imgData);
			}
		}

		this.isGenerated = true;

		// console.log(this.imgList);
	}

	DownloadAll(callback) {
		if (!this.isGenerated) {
			this.GenerateUrls();
		}
		
		try
		{
			fs.mkdirSync(this.saveDirectory,{recursive:true});
		}catch{
			
		}
		
		async.map(this.imgList, this.DownloadOneImage,callback);
	}

	DownloadOneImage(imgData, callback) {
		request(imgData.url).pipe(fs.createWriteStream(imgData.fileName)).on('close', function() {
			callback(null,imgData.fileName);
		});
	}
}
module.exports = {
	BaiduPanoDownloader
}
