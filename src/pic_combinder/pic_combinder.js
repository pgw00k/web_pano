const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const stools = require('I:/CSharp_Project/adia_lib/web_server/utils/tools.js');

const fileExt = "(\.png)|(\.jpg)";
const SearchOption = {
	withFileTypes: true,
	recursive: true
};

function get_all_file(root, op, key, result) {
	let rs = fs.readdirSync(root, op);
	let reg = new RegExp(key)

	for (let i = 0; i < rs.length; i++) {
		let r = rs[i];
		let fp = path.join(root, r.name);
		if (r.isFile() && reg.test(r.name)) {
			result.push(fp);
		} else if (r.isDirectory()) {
			get_all_file(fp, op, key, result);
		}
	}
}

const DefaultOptions = {
	Root: './static/images_raw/test',
	Output: './static/test.jpg',
	Width: 8192,
	Height: 4096,
	imgList:[]
}

function DirectoryCombinder(options = DefaultOptions) {
	get_all_file(options.Root, SearchOption, fileExt, options.imgList);
	ListCombinder(options);
}

function ListCombinder(options = DefaultOptions) {
	let	cpList = [];
	let x = 0,
		y = 0;
	for (let i = 0, count = options.imgList.length; i < count; ++i) {
		let cp = {
			input: options.imgList[i],
			top: y * 512,
			left: x * 512,
		}

		y++;
		if (y > 7) {
			y = 0;
			x++;
		}

		if (x > 15) {
			x = 0;
		}
		
		cpList.push(cp);
	}

	sharp({
			create: {
				width: options.Width,
				height: options.Height,
				channels: 3,
				background: { r: 0, g: 0, b: 0, alpha: 1 }
			}
		}).composite(cpList)
		// .jpeg({
		// 	quality: 100
		// }).toFile(options.Output);
		.webp({
			quality:100
		}).toFile('./static/test.webp');
}


module.exports = {
	DirectoryCombinder,
	ListCombinder,
	DefaultOptions
}
