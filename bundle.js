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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n\r\n\r\n// 가게 데이터\r\nlet storeData = [];\r\n\r\n// 현재 선택된 가게 저장\r\nlet currentStore = null;\r\n\r\n// DOM 요소 선언\r\nconst searchButton = document.getElementById('search-button');\r\nconst searchInput = document.getElementById('store-search');\r\nconst videoButtonsWrapper = document.querySelector('.video-buttons-wrapper');\r\nconst videoContainer = document.getElementById('video');\r\nconst buttons = document.querySelectorAll(\".buttons-container button\");\r\n\r\n// 유튜브 비디오 및 버튼 업데이트 함수\r\nfunction updateVideoAndButtons(store) {\r\n    videoButtonsWrapper.style.borderColor = store.color;\r\n    videoContainer.style.borderColor = store.color;\r\n    searchInput.style.borderColor = store.color;\r\n    searchButton.style.backgroundColor = store.color;\r\n    searchButton.style.borderColor = store.color;\r\n\r\n    buttons.forEach((button) => {\r\n        const buttonId = button.id;\r\n        if (store.buttons[buttonId]) {  // 버튼 ID가 store에 존재하는지 확인\r\n            button.textContent = store.buttons[buttonId];\r\n            button.onclick = () => {\r\n                video.src = store.videos[buttonId];\r\n            };\r\n        } else {\r\n            console.error(`Store에 해당 버튼 ID(${buttonId})가 없습니다.`);\r\n        }\r\n    });\r\n}\r\n\r\n// 탭 기능 추가\r\nconst tabs = document.querySelectorAll(\".tab-button\");\r\nconst tabContent = document.getElementById(\"tab-content\");\r\n\r\nfunction activateTab(tabId, content) {\r\n    tabs.forEach(tab => {\r\n        tab.classList.remove('active');\r\n        if (tab.id === tabId) {\r\n            tab.classList.add('active');\r\n        }\r\n    });\r\n    tabContent.innerHTML = content || '내용이 없습니다.';\r\n}\r\n\r\n// 기본으로 상세정보 탭 활성화\r\nactivateTab('detail-tab', '가게 상세 정보가 여기에 표시됩니다.');\r\n\r\n// 탭 클릭 이벤트\r\ntabs.forEach(tab => {\r\n    tab.addEventListener('click', () => {\r\n        const tabId = tab.id;\r\n        const content = tab.dataset.content || '내용이 없습니다.';\r\n        activateTab(tabId, content);\r\n    });\r\n});\r\n\r\n// 인스타그램 임베드 업데이트 함수\r\nfunction updateInstagramEmbed(instaUrl) {\r\n    const instagramPostContainer = document.getElementById('tab-content');  // 탭 내용 컨테이너\r\n    if (instagramPostContainer) {\r\n        instagramPostContainer.innerHTML = `<iframe src=\"${instaUrl}\" width=\"100%\" height=\"400\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\"></iframe>`;\r\n    } else {\r\n        console.error(\"instagram-post 요소를 찾을 수 없습니다.\");\r\n    }\r\n}\r\n\r\n// 탭 클릭 시 인스타그램 게시물 업데이트\r\ndocument.getElementById('popular1-tab').addEventListener('click', function() {\r\n    const store = getCurrentStore();\r\n    if (store && store.popularInsta1) {\r\n        updateInstagramEmbed(store.popularInsta1);\r\n    }\r\n});\r\n\r\ndocument.getElementById('popular2-tab').addEventListener('click', function() {\r\n    const store = getCurrentStore();\r\n    if (store && store.popularInsta2) {\r\n        updateInstagramEmbed(store.popularInsta2);\r\n    }\r\n});\r\n\r\ndocument.getElementById('latest1-tab').addEventListener('click', function() {\r\n    const store = getCurrentStore();\r\n    if (store && store.latestInsta1) {\r\n        updateInstagramEmbed(store.latestInsta1);\r\n    }\r\n});\r\n\r\ndocument.getElementById('latest2-tab').addEventListener('click', function() {\r\n    const store = getCurrentStore();\r\n    if (store && store.latestInsta2) {\r\n        updateInstagramEmbed(store.latestInsta2);\r\n    }\r\n});\r\n\r\n// 현재 선택된 가게 반환 함수\r\nfunction getCurrentStore() {\r\n    return currentStore;\r\n}\r\n\r\n// 가게 정보 업데이트 함수 (마커 클릭 및 검색 시)\r\nfunction updateStoreInfo(store) {\r\n    currentStore = store; // 현재 선택된 가게를 저장\r\n    if (!store) return; // store가 없는 경우 함수 종료\r\n    \r\n    const detailContent = `\r\n        가게명: ${store.name}<br>\r\n        주소: ${store.address}<br>\r\n        평점: ${store.rating}<br>\r\n        방송: ${store.broadcast}<br>\r\n        전화번호: ${store.phone}<br>\r\n        메뉴: ${store.menu.join(\", \")}<br>\r\n        가격: ${store.price}\r\n    `;\r\n    activateTab('detail-tab', detailContent);\r\n\r\n    // 각 탭에 대한 Instagram 임베드 URL 업데이트\r\n    document.getElementById('popular1-tab').dataset.content = store.popularInsta1 \r\n        ? `<iframe src=\"${store.popularInsta1}\" width=\"100%\" height=\"400\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\"></iframe>`\r\n        : '해당 게시물을 가져올 수 없습니다.';\r\n\r\n    document.getElementById('popular2-tab').dataset.content = store.popularInsta2 \r\n        ? `<iframe src=\"${store.popularInsta2}\" width=\"100%\" height=\"400\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\"></iframe>`\r\n        : '해당 게시물을 가져올 수 없습니다.';\r\n\r\n    document.getElementById('latest1-tab').dataset.content = store.latestInsta1 \r\n        ? `<iframe src=\"${store.latestInsta1}\" width=\"100%\" height=\"400\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\"></iframe>`\r\n        : '해당 게시물을 가져올 수 없습니다.';\r\n\r\n    document.getElementById('latest2-tab').dataset.content = store.latestInsta2 \r\n        ? `<iframe src=\"${store.latestInsta2}\" width=\"100%\" height=\"400\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\"></iframe>`\r\n        : '해당 게시물을 가져올 수 없습니다.';\r\n\r\n    // 유튜브 비디오 및 버튼 업데이트\r\n    updateVideoAndButtons(store);\r\n}\r\n\r\n// 마커 및 검색에서 가게 데이터 업데이트 처리\r\nfunction handleStoreUpdate(store) {\r\n    updateStoreInfo(store); // 탭 및 유튜브 업데이트\r\n}\r\n\r\n// 지도 및 마커 설정\r\ndocument.addEventListener('DOMContentLoaded', function() {\r\n    const mapElement = document.getElementById('map');\r\n\r\n    if (!searchButton || !mapElement) {\r\n        console.error('Required DOM elements not found');\r\n        return;\r\n    }\r\n\r\n    if (window.naver && naver.maps) {\r\n        const cityhall = new naver.maps.LatLng(37.5666805, 126.9784147);\r\n        const map = new naver.maps.Map('map', {\r\n            center: cityhall,\r\n            zoom: 6.5\r\n        });\r\n\r\n        const redMarkerIcon = {\r\n            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',\r\n            size: new naver.maps.Size(32, 32),\r\n            origin: new naver.maps.Point(0, 0),\r\n            anchor: new naver.maps.Point(16, 32)\r\n        };\r\n\r\n        const yellowMarkerIcon = {\r\n            url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',\r\n            size: new naver.maps.Size(32, 32),\r\n            origin: new naver.maps.Point(0, 0),\r\n            anchor: new naver.maps.Point(16, 32)\r\n        };\r\n\r\n        let markers = [];\r\n        let infoWindows = [];\r\n\r\n        fetch('https://tera04162.github.io/dduck/dduck.json')\r\n            .then(response => response.json())\r\n            .then(data => {\r\n                storeData = data;\r\n\r\n                data.forEach((store, index) => {\r\n                    const position = new naver.maps.LatLng(store.latitude, store.longitude);\r\n                    const marker = new naver.maps.Marker({\r\n                        map: map,\r\n                        position: position,\r\n                        icon: redMarkerIcon\r\n                    });\r\n\r\n                    markers.push(marker);\r\n\r\n                    const contentString = `\r\n                        <div class=\"iw_inner\" style=\"font-size:13px; font-weight: 500;\">\r\n                            <h3 style=\"font-size:14px; font-weight: 600;\">\r\n                                ${store.name}\r\n                            </h3>\r\n                            <p>\r\n                                주소: ${store.address}<br />\r\n                                전화번호: ${store.phone}<br />\r\n                            </p>\r\n                        </div>\r\n                    `;\r\n\r\n                    const infowindow = new naver.maps.InfoWindow({\r\n                        content: contentString,\r\n                        minWidth: 200,\r\n                        backgroundColor: \"#eee\",\r\n                        borderColor: \"#b40057\",\r\n                        borderWidth: 5,\r\n                    });\r\n\r\n                    infoWindows.push(infowindow);\r\n\r\n                    naver.maps.Event.addListener(marker, \"click\", function () {\r\n                        markers.forEach(m => m.setIcon(redMarkerIcon));\r\n                        marker.setIcon(yellowMarkerIcon);\r\n\r\n                        setTimeout(() => {\r\n                            naver.maps.Event.trigger(map, 'resize');\r\n                            const markerPosition = marker.getPosition();\r\n                            const mapSize = map.getSize();\r\nconst panX = 0;\r\n                            const panY = -(mapSize.height * 0.25);\r\n\r\n                            map.setCenter(markerPosition);\r\n                            setTimeout(() => {\r\n                                map.panBy(panX, panY);\r\n                            }, 300);\r\n                        }, 300);\r\n\r\n                        infoWindows.forEach(iw => iw.close());\r\n                        infowindow.open(map, marker);\r\n\r\n                        handleStoreUpdate(store); // 마커 클릭 시 정보 업데이트\r\n                    });\r\n                });\r\n            })\r\n            .catch(error => console.log('Error loading store data:', error));\r\n\r\n        // 검색 버튼 클릭 시\r\n        searchButton.addEventListener('click', function() {\r\n            const searchQuery = searchInput.value.trim().toLowerCase();\r\n            if (searchQuery) {\r\n                const foundStore = storeData.find(store => store.name.toLowerCase().includes(searchQuery));\r\n                if (foundStore) {\r\n                    const position = new naver.maps.LatLng(foundStore.latitude, foundStore.longitude);\r\n                    map.setCenter(position);\r\n                    map.setZoom(12);\r\n\r\n                    const foundIndex = storeData.indexOf(foundStore);\r\n                    if (foundIndex !== -1) {\r\n                        markers.forEach(marker => marker.setIcon(redMarkerIcon));\r\n                        markers[foundIndex].setIcon(yellowMarkerIcon);\r\n\r\n                        infoWindows.forEach(iw => iw.close());\r\n                        infoWindows[foundIndex].open(map, markers[foundIndex]);\r\n\r\n                        handleStoreUpdate(foundStore); // 검색 후 정보 업데이트\r\n                    }\r\n                } else {\r\n                    alert('해당 가게를 찾을 수 없습니다.');\r\n                }\r\n            } else {\r\n                alert('가게 이름을 입력해주세요.');\r\n            }\r\n        });\r\n    }\r\n});\r\n\r\n\n\n//# sourceURL=webpack://dduck/./src/index.js?");

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