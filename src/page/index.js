import '@photo-sphere-viewer/core/index.scss';
import {EquirectangularTilesAdapter} from '@photo-sphere-viewer/equirectangular-tiles-adapter';
import {
	Viewer
} from '@photo-sphere-viewer/core';

const ImageData = {
	"北门": "./images/北门.jpg",
	"东门": "./images/东门.jpg",
	"西林门": "./images/西林门.jpg",
	"西林门售票处": "./images/西林门售票处.jpg",
	"西林门检票处": "./images/西林门检票处.jpg",
	"售票处1": "./images/售票处1.jpg",
	"售票处2": "./images/售票处2.jpg",
	"检票处": "./images/检票处.jpg",
	"弥陀殿": "./images/弥陀殿.jpg",
	"大雄殿": "./images/大雄殿.jpg",
	"钟楼": "./images/钟楼.jpg",
	"纪念园": "./images/纪念园.jpg",
	"弘一大师纪念园": "./images/弘一大师纪念园.jpg",
	"与日争光": "./images/与日争光.jpg",
	"壹摄光": "./images/壹摄光.jpg",
	"水操台遗址": "./images/水操台遗址.jpg",
	"鼓浪洞天": "./images/鼓浪洞天.jpg",
	"顶峰": "./images/顶峰.jpg",
	"古避暑洞": "./images/古避暑洞.jpg",
	"闽海雄风": "./images/闽海雄风.jpg",
	"摩崖石刻": "./images/摩崖石刻.jpg",
	"曲径通幽": "./images/曲径通幽.jpg",
	"古炮台": "./images/古炮台.jpg",
	"光复台": "./images/光复台.jpg",
	"龙头山寨遗址1": "./images/龙头山寨遗址1.jpg",
	"龙头山塞遗址2": "./images/龙头山塞遗址2.jpg",
	"龙头山寨遗址3": "./images/龙头山寨遗址3.jpg",
	"金绳觉路": "./images/金绳觉路.jpg",
	"中秋博饼雕像": "./images/中秋博饼雕像.jpg",
	"弘一大师雕像": "./images/弘一大师雕像.jpg",
	"观海亭": "./images/观海亭.jpg",
	"凉亭1": "./images/凉亭1.jpg",
	"凉亭2": "./images/凉亭2.jpg",
	"远而亭": "./images/远而亭.jpg",
	"休息长廊": "./images/休息长廊.jpg",
	"观景台1": "./images/观景台1.jpg",
	"观景台2": "./images/观景台2.jpg",
	"观景台3": "./images/观景台3.jpg",
	"观景台4": "./images/观景台4.jpg",
	"观景台5": "./images/观景台5.jpg",
	"观景台6": "./images/观景台6.jpg",
	"观景台7": "./images/观景台7.jpg",
	"绿化带": "./images/绿化带.jpg",
	"树": "./images/树.jpg",
	"游览区售票处": "./images/游览区售票处.jpg",
	"台阶": "./images/台阶.jpg"
};
var keys = Object.keys(ImageData);
var CurrentKey = keys[0];
var ImgData = {};

// const viewer = new Viewer({
// 	container: document.querySelector('#viewer'),
// 	panorama: './images/大门.jpg',
// });

const viewer = new Viewer({
	container: document.querySelector('#viewer'),
	adapter: EquirectangularTilesAdapter,
	panorama: {
		width: 8192,
		cols: 16,
		rows: 8,
		baseUrl: `images_small/${CurrentKey}.webp`,
		tileUrl: (col, row) => {
			const num = row * 16 + col + 1;
			return `images_raw/${CurrentKey}/${col.toString().padStart(2, "0")}_${row.toString().padStart(2, "0")}_5.jpg`;
		},
	}
});

function createButtons(data) {
	let source = document.querySelector("#btn0");
	for (var i = 0; i < keys.length; i++) {
		let key = keys[i];
		let value = ImageData[key];
		let item = source.cloneNode(true);
		item.setAttribute("id", "btn" + i);
		item.setAttribute("src", key);
		item.innerHTML = key;
		ImgData[key] = {
				width: 8192,
				cols: 16,
				rows: 8,
				baseUrl: `images_small/${key}.webp`,
				tileUrl: (col, row) => {
					return `images_raw/${key}/${col.toString().padStart(2, "0")}_${row.toString().padStart(2, "0")}_5.jpg`;
				}
		}

		item.addEventListener("click", function(e) {
			let k = this.getAttribute("src");
			viewer.setPanorama(ImgData[k]);
		});


		source.parentElement.appendChild(item);
	}
	source.parentElement.removeChild(source);
}

createButtons(ImageData);
