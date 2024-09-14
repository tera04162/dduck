/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', function () {\r\n    const searchButton = document.getElementById('search-button');\r\n    const searchInput = document.getElementById('store-search');\r\n    const mapElement = document.getElementById('map');\r\n    const video = document.getElementById('youtubeVideo');\r\n    const buttons = document.querySelectorAll(\".buttons-container button\");\r\n    const videoContainer = document.getElementById(\"video\");\r\n    const videoButtonsWrapper = document.querySelector(\".video-buttons-wrapper\");\r\n    const tabContents = document.getElementById('tab-contents');\r\n    const tabs = document.querySelectorAll('.tabs button');\r\n    \r\n    let markers = [];\r\n    let infoWindows = [];\r\n\r\n    if (!searchButton || !mapElement) {\r\n        console.error('Required DOM elements not found');\r\n        return;\r\n    }\r\n\r\n    if (window.naver && naver.maps) {\r\n        const cityhall = new naver.maps.LatLng(37.5666805, 126.9784147);\r\n        const map = new naver.maps.Map('map', {\r\n            center: cityhall,\r\n            zoom: 6.5\r\n        });\r\n\r\n        const redMarkerIcon = {\r\n            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',\r\n            size: new naver.maps.Size(32, 32),\r\n            origin: new naver.maps.Point(0, 0),\r\n            anchor: new naver.maps.Point(16, 32)\r\n        };\r\n\r\n        const yellowMarkerIcon = {\r\n            url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',\r\n            size: new naver.maps.Size(32, 32),\r\n            origin: new naver.maps.Point(0, 0),\r\n            anchor: new naver.maps.Point(16, 32)\r\n        };\r\n\r\n        let storeData = [];\r\n\r\n        fetch('https://tera04162.github.io/dduck/dduck.json')\r\n            .then(response => response.json())\r\n            .then(data => {\r\n                storeData = data;\r\n\r\n                data.forEach((store, index) => {\r\n                    const position = new naver.maps.LatLng(store.latitude, store.longitude);\r\n                    const marker = new naver.maps.Marker({\r\n                        map: map,\r\n                        position: position,\r\n                        icon: redMarkerIcon\r\n                    });\r\n\r\n                    markers.push(marker);\r\n\r\n                    const contentString = `\r\n                        <div class=\"iw_inner\" style=\"font-size:13px; font-weight: 500;\">\r\n                            <h3 style=\"font-size:12px; font-weight: 600;\">${store.name}</h3>\r\n                            <p>주소: ${store.address}</p>\r\n                        </div>\r\n                    `;\r\n\r\n                    const infowindow = new naver.maps.InfoWindow({\r\n                        content: contentString,\r\n                        minWidth: 200,\r\n                        backgroundColor: \"#eee\",\r\n                        borderColor: \"#b40057\",\r\n                        borderWidth: 5,\r\n                    });\r\n\r\n                    infoWindows.push(infowindow);\r\n\r\n                    naver.maps.Event.addListener(marker, \"click\", function () {\r\n                        markers.forEach(m => m.setIcon(redMarkerIcon));\r\n                        marker.setIcon(yellowMarkerIcon);\r\n\r\n                        infoWindows.forEach(iw => iw.close());\r\n                        infowindow.open(map, marker);\r\n\r\n                        const storeName = store.name;\r\n                        if (storeData[storeName]) {\r\n                            const store = storeData[storeName];\r\n                            updateVideoAndButtons(store);\r\n                        }\r\n                    });\r\n                });\r\n            })\r\n            .catch(error => console.log('Error loading store data:', error));\r\n\r\n        searchButton.addEventListener('click', function () {\r\n            const searchQuery = searchInput.value.trim().toLowerCase();\r\n\r\n            if (searchQuery) {\r\n                const foundStore = storeData.find(store => store.name.toLowerCase().includes(searchQuery));\r\n\r\n                if (foundStore) {\r\n                    const position = new naver.maps.LatLng(foundStore.latitude, foundStore.longitude);\r\n                    map.setCenter(position);\r\n                    map.setZoom(12);\r\n\r\n                    const foundIndex = storeData.indexOf(foundStore);\r\n                    if (foundIndex !== -1) {\r\n                        markers.forEach(marker => marker.setIcon(redMarkerIcon));\r\n                        markers[foundIndex].setIcon(yellowMarkerIcon);\r\n\r\n                        infoWindows.forEach(iw => iw.close());\r\n                        infoWindows[foundIndex].open(map, markers[foundIndex]);\r\n\r\n                        const storeName = foundStore.name;\r\n                        if (storeData[storeName]) {\r\n                            const store = storeData[storeName];\r\n                            updateVideoAndButtons(store);\r\n                        }\r\n                    }\r\n                } else {\r\n                    alert('해당 가게를 찾을 수 없습니다.');\r\n                }\r\n            } else {\r\n                alert('가게 이름을 입력해주세요.');\r\n            }\r\n        });\r\n\r\n        function updateVideoAndButtons(store) {\r\n            videoButtonsWrapper.style.borderColor = store.color;\r\n            videoContainer.style.borderColor = store.color;\r\n            searchInput.style.borderColor = store.color;\r\n            searchButton.style.backgroundColor = store.color;\r\n            searchButton.style.borderColor = store.color;\r\n\r\n            buttons.forEach(button => {\r\n                const buttonId = button.id;\r\n                button.textContent = store.buttons[buttonId];\r\n                button.onclick = () => {\r\n                    video.src = store.videos[buttonId];\r\n                };\r\n            });\r\n\r\n            tabs.forEach((tab, index) => {\r\n                tab.onclick = () => {\r\n                    switch (index) {\r\n                        case 0:\r\n                            tabContents.innerHTML = `\r\n                                <h3>${store.name}</h3>\r\n                                <p>주소: ${store.address}</p>\r\n                                <p>운영 시간: ${store.hours}</p>\r\n                                <p>전화번호: ${store.phone}</p>\r\n                                <p>메뉴: ${store.menu.join(\", \")}</p>\r\n                                <p>가격: ${store.price}</p>\r\n                                <p>방송: ${store.broadcast}</p>\r\n                                <p>평점: ${store.rating} (${store.reviews} 리뷰)</p>`;\r\n                            break;\r\n                        case 1:\r\n                            tabContents.innerHTML = `\r\n                                <blockquote class=\"instagram-media\" data-instgrm-permalink=\"${store.popularInsta1}\" data-instgrm-version=\"14\" style=\" background:#FFF; border:0;\">\r\n                                    <a href=\"${store.popularInsta1}\" target=\"_blank\">Instagram에서 보기</a>\r\n                                </blockquote>\r\n                                <script async src=\"//www.instagram.com/embed.js\"></script>`;\r\n                            break;\r\n                        case 2:\r\n                            tabContents.innerHTML = `\r\n                                <blockquote class=\"instagram-media\" data-instgrm-permalink=\"${store.popularInsta2}\" data-instgrm-version=\"14\" style=\" background:#FFF; border:0;\">\r\n                                    <a href=\"${store.popularInsta2}\" target=\"_blank\">Instagram에서 보기</a>\r\n                                </blockquote>\r\n                                <script async src=\"//www.instagram.com/embed.js\"></script>`;\r\n                            break;\r\n                        case 3:\r\n                            tabContents.innerHTML = `\r\n                                <blockquote class=\"instagram-media\" data-instgrm-permalink=\"${store.latestInsta1}\" data-instgrm-version=\"14\" style=\" background:#FFF; border:0;\">\r\n                                    <a href=\"${store.latestInsta1}\" target=\"_blank\">Instagram에서 보기</a>\r\n                                </blockquote>\r\n                                <script async src=\"//www.instagram.com/embed.js\"></script>`;\r\n                            break;\r\n                        case 4:\r\n                            tabContents.innerHTML = `\r\n                                <blockquote class=\"instagram-media\" data-instgrm-permalink=\"${store.latestInsta2}\" data-instgrm-version=\"14\" style=\" background:#FFF; border:0;\">\r\n                                    <a href=\"${store.latestInsta2}\" target=\"_blank\">Instagram에서 보기</a>\r\n                                </blockquote>\r\n                                <script async src=\"//www.instagram.com/embed.js\"></script>`;\r\n                            break;\r\n                    }\r\n                };\r\n            });\r\n        }\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://dduck/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;