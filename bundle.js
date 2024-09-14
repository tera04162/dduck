/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://dduck/./src/styles.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n\r\n\r\nconst searchBtn = document.getElementById(\"search-button\");\r\nconst searchInput = document.getElementById(\"store-search\");\r\nconst video = document.getElementById(\"youtubeVideo\");\r\nconst buttons = document.querySelectorAll(\".buttons-container button\");\r\nconst videoContainer = document.getElementById(\"video\");\r\nconst videoButtonsWrapper = document.querySelector(\".video-buttons-wrapper\");\r\n\r\nlet map, markers = [], infoWindows = [];\r\n\r\n// 유튜브 및 버튼 업데이트 함수\r\nfunction updateVideoAndButtons(store) {\r\n    videoButtonsWrapper.style.borderColor = store.color;\r\n    videoContainer.style.borderColor = store.color;\r\n    searchInput.style.borderColor = store.color;\r\n    searchBtn.style.backgroundColor = store.color;\r\n    searchBtn.style.borderColor = store.color;\r\n\r\n    buttons.forEach((button, index) => {\r\n        const buttonId = button.id;\r\n        button.textContent = store.buttons[buttonId];\r\n        button.onclick = () => {\r\n            video.src = store.videos[buttonId];\r\n        };\r\n    });\r\n\r\n    updateTabContent(store);\r\n}\r\n\r\n// 탭 업데이트 함수\r\nfunction updateTabContent(store) {\r\n    document.getElementById('details').innerHTML = `\r\n        <h3>${store.name}</h3>\r\n        <p>주소: ${store.address}</p>\r\n        <p>전화번호: ${store.phone}</p>\r\n        <p>영업시간: ${store.hours}</p>\r\n        <p>메뉴: ${store.menu.join(', ')}</p>\r\n        <p>가격: ${store.price}</p>\r\n        <p>방송: ${store.broadcast}</p>\r\n        <p>평점: ${store.rating}</p>\r\n        <p>리뷰: ${store.reviews}</p>\r\n    `;\r\n    document.getElementById('popular1').innerHTML = `<iframe src=\"${store.popularInsta1}\" frameborder=\"0\"></iframe>`;\r\n    document.getElementById('popular2').innerHTML = `<iframe src=\"${store.popularInsta2}\" frameborder=\"0\"></iframe>`;\r\n    document.getElementById('latest1').innerHTML = `<iframe src=\"${store.latestInsta1}\" frameborder=\"0\"></iframe>`;\r\n    document.getElementById('latest2').innerHTML = `<iframe src=\"${store.latestInsta2}\" frameborder=\"0\"></iframe>`;\r\n}\r\n\r\n// 지도 및 마커 초기화 함수\r\nfunction initializeMap(storeData) {\r\n    const cityhall = new naver.maps.LatLng(37.5666805, 126.9784147);\r\n    map = new naver.maps.Map('map', {\r\n        center: cityhall,\r\n        zoom: 6.5\r\n    });\r\n\r\n    const redMarkerIcon = {\r\n        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',\r\n        size: new naver.maps.Size(32, 32),\r\n        origin: new naver.maps.Point(0, 0),\r\n        anchor: new naver.maps.Point(16, 32)\r\n    };\r\n\r\n    const yellowMarkerIcon = {\r\n        url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',\r\n        size: new naver.maps.Size(32, 32),\r\n        origin: new naver.maps.Point(0, 0),\r\n        anchor: new naver.maps.Point(16, 32)\r\n    };\r\n\r\n    storeData.forEach((store, index) => {\r\n        const position = new naver.maps.LatLng(store.latitude, store.longitude);\r\n        const marker = new naver.maps.Marker({\r\n            map: map,\r\n            position: position,\r\n            icon: redMarkerIcon\r\n        });\r\n\r\n        const infowindow = new naver.maps.InfoWindow({\r\n            content: `\r\n                <div class=\"iw_inner\" style=\"font-size:13px; font-weight: 500;\">\r\n                    <h3 style=\"font-size:14px; font-weight: 600;\">${store.name}</h3>\r\n                    <p>주소: ${store.address}<br />전화번호: ${store.phone}</p>\r\n                </div>\r\n            `,\r\n            minWidth: 200,\r\n            backgroundColor: \"#eee\",\r\n            borderColor: \"#b40057\",\r\n            borderWidth: 5\r\n        });\r\n\r\n        markers.push(marker);\r\n        infoWindows.push(infowindow);\r\n\r\n        naver.maps.Event.addListener(marker, 'click', () => {\r\n            markers.forEach(m => m.setIcon(redMarkerIcon));\r\n            marker.setIcon(yellowMarkerIcon);\r\n            infoWindows.forEach(iw => iw.close());\r\n            infowindow.open(map, marker);\r\n\r\n            updateVideoAndButtons(store);\r\n            updateTabContent(store);\r\n        });\r\n    });\r\n}\r\n\r\n// 가게 이름 검색 함수\r\nsearchBtn.addEventListener(\"click\", () => {\r\n    const searchQuery = searchInput.value.trim().toLowerCase();\r\n    const foundStore = storeData.find(store => store.name.toLowerCase().includes(searchQuery));\r\n\r\n    if (foundStore) {\r\n        const position = new naver.maps.LatLng(foundStore.latitude, foundStore.longitude);\r\n        map.setCenter(position);\r\n        map.setZoom(12);\r\n\r\n        markers.forEach(marker => marker.setIcon(null));\r\n        const foundMarker = markers.find(marker => marker.getPosition().equals(position));\r\n        if (foundMarker) {\r\n            foundMarker.setIcon(yellowMarkerIcon);\r\n            updateVideoAndButtons(foundStore);\r\n        }\r\n    } else {\r\n        alert('해당 가게를 찾을 수 없습니다.');\r\n    }\r\n});\r\n\r\n// dduck.json 파일에서 가게 데이터를 불러와 지도에 마커 추가\r\nfetch('https://tera04162.github.io/dduck/dduck.json')\r\n    .then(response => response.json())\r\n    .then(data => {\r\n        initializeMap(data);\r\n    })\r\n    .catch(error => console.log('Error loading store data:', error));\r\n\n\n//# sourceURL=webpack://dduck/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;