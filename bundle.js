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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', function() {\r\n    // DOMContentLoaded 이벤트가 발생하면 함수를 실행하여 필요한 요소를 로드한 후 기능을 작동하게 함\r\n\r\n    const searchButton = document.getElementById('search-button'); // 검색 버튼 요소를 가져옴\r\n    const searchInput = document.getElementById('store-search'); // 검색 입력 필드 요소를 가져옴\r\n    const mapContainer = document.querySelector('.map-area'); // 지도 영역을 감싸는 컨테이너 요소를 가져옴\r\n    const rowContainer = document.querySelector('.row-container'); // 레이아웃을 담당하는 행 컨테이너 요소를 가져옴\r\n    const mapElement = document.getElementById('map'); // 네이버 지도 요소를 가져옴\r\n    const autocompleteContainer = document.getElementById('autocomplete-list'); // 자동완성 리스트 요소를 가져옴 (현재는 사용하지 않음)\r\n    let activeMarker = null; // 현재 선택된 마커를 저장할 변수 초기화\r\n\r\n    // 검색 버튼이나 지도 요소가 없으면 오류 메시지를 출력하고 함수 종료\r\n    if (!searchButton || !mapElement) {\r\n        console.error('Required DOM elements not found');\r\n        return;\r\n    }\r\n\r\n    // 네이버 지도 API가 로드되었는지 확인\r\n    if (window.naver && naver.maps) {\r\n        // 지도 초기 중심 좌표 (서울 시청 위치) 설정\r\n        const cityhall = new naver.maps.LatLng(37.5666805, 126.9784147);\r\n        const map = new naver.maps.Map('map', {\r\n            center: cityhall, // 초기 지도 중심 설정\r\n            zoom: 6.5 // 초기 줌 레벨 설정\r\n        });\r\n\r\n        // 빨간색 마커 아이콘 설정\r\n        const redMarkerIcon = {\r\n            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // 아이콘 URL\r\n            size: new naver.maps.Size(32, 32), // 아이콘 크기\r\n            origin: new naver.maps.Point(0, 0), // 아이콘의 원점\r\n            anchor: new naver.maps.Point(16, 32) // 마커를 기준으로 아이콘을 배치하는 기준점\r\n        };\r\n\r\n        // 노란색 마커 아이콘 설정\r\n        const yellowMarkerIcon = {\r\n            url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png', // 아이콘 URL\r\n            size: new naver.maps.Size(32, 32), // 아이콘 크기\r\n            origin: new naver.maps.Point(0, 0), // 아이콘의 원점\r\n            anchor: new naver.maps.Point(16, 32) // 마커를 기준으로 아이콘을 배치하는 기준점\r\n        };\r\n\r\n        let storeData = []; // 떡볶이 가게 데이터를 저장할 배열\r\n        let markers = []; // 마커 객체를 저장할 배열\r\n        let infoWindows = []; // 정보 창 객체를 저장할 배열\r\n\r\n        // dduck.json 파일에서 떡볶이집 데이터를 불러옴\r\n        fetch('https://tera04162.github.io/dduck/dduck.json')\r\n            .then(response => response.json()) // JSON 형식으로 응답을 변환\r\n            .then(data => {\r\n                storeData = data; // 데이터를 storeData에 저장\r\n\r\n                // 각 떡볶이집 데이터를 기반으로 마커 및 정보 창 생성\r\n                data.forEach((store, index) => {\r\n                    const position = new naver.maps.LatLng(store.latitude, store.longitude); // 가게 위치 좌표 설정\r\n                    const marker = new naver.maps.Marker({\r\n                        map: map, // 마커가 표시될 지도\r\n                        position: position, // 마커의 위치\r\n                        icon: redMarkerIcon // 마커 아이콘 (기본 빨간색)\r\n                    });\r\n\r\n                    markers.push(marker); // 생성된 마커를 배열에 저장\r\n\r\n                    // 각 가게의 정보 창 HTML 내용 설정\r\n                    const contentString = `\r\n                        <div class=\"iw_inner\" style=\"font-size:13px; font-weight: 500;\">\r\n                            <h3 style=\"font-size:14px; font-weight: 600;\">\r\n                                ${store.name}\r\n                            </h3>\r\n                            <p>\r\n                                주소: ${store.address}<br />\r\n                                전화번호: ${store.phone}<br />\r\n                                메뉴: ${store.menu} <br />\r\n                                가격: ${store.price}<br />\r\n                                방송: ${store.broadcast || '정보 없음'}<br />\r\n                                평점: ${store.rating} (${store.reviews} 리뷰)\r\n                            </p>\r\n                        </div>\r\n                    `;\r\n\r\n                    const infowindow = new naver.maps.InfoWindow({\r\n                        content: contentString, // 정보 창에 표시될 HTML 내용\r\n                        minWidth: 200, // 최소 너비\r\n                        backgroundColor: \"#eee\", // 배경색\r\n                        borderColor: \"#b40057\", // 테두리 색상\r\n                        borderWidth: 5, // 테두리 두께\r\n                    });\r\n\r\n                    infoWindows.push(infowindow); // 생성된 정보 창을 배열에 저장\r\n\r\n                    // 마커 클릭 시 이벤트 처리\r\n                    naver.maps.Event.addListener(marker, \"click\", function () {\r\n                        markers.forEach(m => m.setIcon(redMarkerIcon)); // 모든 마커의 아이콘을 빨간색으로 설정\r\n                        marker.setIcon(yellowMarkerIcon); // 클릭된 마커는 노란색으로 변경\r\n\r\n                        // 지도 크기를 1/3로 줄이고, 텍스트 패널을 2/3로 확장\r\n                        rowContainer.classList.add('expanded');\r\n\r\n                        // 지도 크기 변경 후 재렌더링을 위해 resize 이벤트를 호출\r\n                        setTimeout(() => {\r\n                            naver.maps.Event.trigger(map, 'resize'); // 지도 리사이즈 트리거\r\n\r\n                            const markerPosition = activeMarker.getPosition(); // 현재 마커의 위치를 가져옴\r\n                            const mapSize = map.getSize(); // 현재 지도의 크기를 가져옴\r\n\r\n                            // 마커 위치를 기준으로 추가 이동\r\n                            const panX = 0; // X 좌표는 변경하지 않음 (중앙 유지)\r\n                            const panY = -(mapSize.height * 0.25); // Y 좌표를 지도 높이의 25%만큼 위로 이동\r\n\r\n                            // 지도 중심을 마커 위치로 설정 후 추가로 Y 좌표를 이동\r\n                            map.setCenter(markerPosition); // 마커를 지도 중심으로 설정\r\n                            setTimeout(() => {\r\n                                map.panBy(panX, panY);  // 설정한 좌표로 추가 이동\r\n                            }, 300); // 센터 설정 후 0.3초 후 추가 이동\r\n                        }, 300);\r\n\r\n                        // 모든 정보 창을 닫고, 선택한 마커에 대한 정보 창만 열기\r\n                        infoWindows.forEach(iw => iw.close());\r\n                        infowindow.open(map, marker); // 선택한 마커의 정보 창을 엶\r\n\r\n                        // 유튜브 창과 버튼 업데이트\r\n                        const storeName = store.name;\r\n                        if (storeData[storeName]) {\r\n                            const store = storeData[storeName];\r\n                            updateVideoAndButtons(store); // 가게에 맞는 유튜브 비디오와 버튼을 업데이트\r\n                        }\r\n                    });\r\n                });\r\n            })\r\n            .catch(error => console.log('Error loading store data:', error)); // 데이터 불러오기 실패 시 오류 메시지 출력\r\n\r\n        // 검색 버튼 클릭 시 이벤트 처리\r\n        searchButton.addEventListener('click', function() {\r\n            const searchQuery = searchInput.value.trim().toLowerCase(); // 입력된 검색어를 소문자로 변환\r\n\r\n            // 검색어가 있으면\r\n            if (searchQuery) {\r\n                const foundStore = storeData.find(store => store.name.toLowerCase().includes(searchQuery)); // 검색어와 일치하는 가게 찾기\r\n\r\n                // 검색된 가게가 있으면\r\n                if (foundStore) {\r\n                    const position = new naver.maps.LatLng(foundStore.latitude, foundStore.longitude); // 검색된 가게의 위치 좌표 설정\r\n                    map.setCenter(position); // 검색된 위치로 지도의 중심을 이동\r\n                    map.setZoom(12);  // 검색 후 지도를 확대\r\n\r\n                    const foundIndex = storeData.indexOf(foundStore); // 검색된 가게의 인덱스 찾기\r\n                    if (foundIndex !== -1) {\r\n                        markers.forEach(marker => marker.setIcon(redMarkerIcon));  // 모든 마커를 빨간색으로 변경\r\n                        markers[foundIndex].setIcon(yellowMarkerIcon);  // 검색된 마커를 노란색으로 변경\r\n\r\n                        // 검색된 가게에 대한 정보 창 열기\r\n                        infoWindows.forEach(iw => iw.close()); // 모든 정보 창을 닫음\r\n                        infoWindows[foundIndex].open(map, markers[foundIndex]); // 해당 가게의 정보 창을 엶\r\n\r\n                        // 유튜브 창과 버튼 업데이트\r\n                        const storeName = foundStore.name;\r\n                        if (storeData[storeName]) {\r\n                            const store = storeData[storeName];\r\n                            updateVideoAndButtons(store); // 가게에 맞는 유튜브 비디오와 버튼을 업데이트\r\n                        }\r\n                    }\r\n                } else {\r\n                    alert('해당 가게를 찾을 수 없습니다.'); // 가게를 찾지 못했을 때 경고 메시지 출력\r\n                }\r\n            } else {\r\n                alert('가게 이름을 입력해주세요.'); // 검색어가 없을 때 경고 메시지 출력\r\n            }\r\n        });\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://dduck/./src/index.js?");

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
