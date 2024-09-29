/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");


// 전역 변수
var storeData = [];
var regionData = [];
var currentStore = null;
var map;
var markers = [];
var infoWindows = [];
var redMarkerIcon;
var yellowMarkerIcon;
// 새로운 전역 변수
var currentSearchMode = 'store'; // 기본값은 상호 검색
// 20240931-2300-추가 시작
var currentInfoWindow = null;
var isStreetViewVisible = false;
// 20240931-2300-추가 끝
// 전역 변수 추가
var currentStreetViewStore = null;

// DOM 요소
var searchButton = document.getElementById('search-button');
var searchInput = document.getElementById('store-search');
var videoButtonsWrapper = document.querySelector('.video-buttons-wrapper');
var videoContainer = document.getElementById('video');
var buttons = document.querySelectorAll(".buttons-container button");
var tabs = document.querySelectorAll(".tab-button");
var tabContent = document.getElementById("tab-content");
// DOM 요소 추가
var regionSearchModeButton = document.getElementById('region-search-mode');
var storeSearchModeButton = document.getElementById('store-search-mode');
var currentModeDisplay = document.getElementById('current-mode');

// 검색 모드 변경 함수
function changeSearchMode(mode) {
  currentSearchMode = mode;
  currentModeDisplay.textContent = "\uD604\uC7AC \uAC80\uC0C9 \uBAA8\uB4DC: ".concat(mode === 'region' ? '지역 검색' : '상호 검색');
  regionSearchModeButton.classList.toggle('active', mode === 'region');
  storeSearchModeButton.classList.toggle('active', mode === 'store');
}

// 검색 모드 버튼 이벤트 리스너
regionSearchModeButton.addEventListener('click', function () {
  return changeSearchMode('region');
});
storeSearchModeButton.addEventListener('click', function () {
  return changeSearchMode('store');
});

// 지역 검색 함수
function searchByRegion(query) {
  if (!regionData) {
    console.log('지역 데이터가 로드되지 않았습니다.');
    alert('지역 데이터를 로드하는 데 문제가 발생했습니다.');
    return;
  }

  // 시도와 시군구를 분리하여 검색
  var matchedRegions = regionData.filter(function (region) {
    return region.시도 && region.시도.toLowerCase().includes(query.toLowerCase()) || region.시군구 && region.시군구.toLowerCase().includes(query.toLowerCase());
  });

  // 시군구가 없는 경우를 우선적으로 처리
  var matchedRegion = matchedRegions.find(function (region) {
    return region.시군구 === null;
  }) || matchedRegions[0];
  if (matchedRegion) {
    console.log(matchedRegion); // 선택된 지역 정보 출력
    var position = new naver.maps.LatLng(matchedRegion.위도, matchedRegion.경도);
    map.setCenter(position);
    map.setZoom(matchedRegion.시군구 ? 11 : 9);
    var regionStores = storeData.filter(function (store) {
      return store.address.includes(matchedRegion.시도) || matchedRegion.시군구 && store.address.includes(matchedRegion.시군구) || store.address.includes(query);
    });
    console.log(regionStores); // 필터링된 가게 정보 출력
    updateMarkers(regionStores);
    if (regionStores.length > 0) {
      updateStoreInfo(regionStores[0]);
    } else {
      alert('해당 지역에 등록된 가게가 없습니다.');
    }
  } else {
    alert('해당 지역을 찾을 수 없습니다.');
  }
}

// 유튜브 비디오 및 버튼 업데이트 함수
function updateVideoAndButtons(store) {
  var videoFrame = document.getElementById('youtubeVideo');
  buttons.forEach(function (button) {
    var buttonId = button.id;
    if (store.youtubeVideos && store.youtubeVideos[buttonId]) {
      button.onclick = function () {
        var videoId = extractVideoId(store.youtubeVideos[buttonId]);
        if (videoId) {
          videoFrame.src = "https://www.youtube.com/embed/".concat(videoId);
        }
      };
    } else {
      console.error("\uD574\uB2F9 \uAC00\uAC8C\uC5D0 \uB300\uD55C \uC720\uD29C\uBE0C \uC601\uC0C1 ID(".concat(buttonId, ")\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."));
    }
  });
}

// 탭 활성화 함수
function activateTab(tabId, content) {
  tabs.forEach(function (tab) {
    tab.classList.remove('active');
    if (tab.id === tabId) {
      tab.classList.add('active');
    }
  });
  tabContent.innerHTML = content || '내용이 없습니다.';
}

// 탭 클릭 이벤트 설정
function setupTabListeners() {
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var tabId = tab.id;
      if (tabId === 'detail-tab' && currentStore) {
        var detailContent = "\n                    \uAC00\uAC8C\uBA85: ".concat(currentStore.name, "<br>\n                    \uC8FC\uC18C: ").concat(currentStore.address, "<br>\n                    \uD3C9\uC810: ").concat(currentStore.rating, "<br>\n                    \uD569\uC0B0\uB9AC\uBDF0: ").concat(currentStore.reviews, "<br> \n                    \uBC29\uC1A1: ").concat(currentStore.broadcast, "<br>\n                    \uC804\uD654\uBC88\uD638: ").concat(currentStore.phone, "<br>\n                    \uBA54\uB274: ").concat(currentStore.menu.join(", "), "<br>\n                    \uAC00\uACA9: ").concat(currentStore.price, "\n                ");
        activateTab('detail-tab', detailContent);
      } else {
        var content = tab.dataset.content || '내용이 없습니다.';
        activateTab(tabId, content);
      }
    });
  });
}

// 인스타그램 임베드 업데이트 함수
function updateInstagramEmbed(instaEmbedCode) {
  var instagramPostContainer = document.getElementById('instagram-post');
  if (tabContent && instagramPostContainer) {
    tabContent.innerHTML = '';
    instagramPostContainer.innerHTML = '';
    tabContent.innerHTML = instaEmbedCode;
    if (window.instgrm) {
      setTimeout(function () {
        window.instgrm.Embeds.process();
      }, 500);
    } else {
      var script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(script);
    }
  } else {
    console.error("tab-content 또는 instagram-post 요소를 찾을 수 없습니다.");
  }
}

// 인스타그램 탭 핸들러
function setupInstagramTabHandlers() {
  document.getElementById('popular1-tab').addEventListener('click', function () {
    if (currentStore && currentStore.popularInsta1) {
      updateInstagramEmbed(currentStore.popularInsta1);
    }
  });
  document.getElementById('popular2-tab').addEventListener('click', function () {
    if (currentStore && currentStore.popularInsta2) {
      updateInstagramEmbed(currentStore.popularInsta2);
    }
  });
  document.getElementById('latest1-tab').addEventListener('click', function () {
    if (currentStore && currentStore.latestInsta1) {
      updateInstagramEmbed(currentStore.latestInsta1);
    }
  });
  document.getElementById('latest2-tab').addEventListener('click', function () {
    if (currentStore && currentStore.latestInsta2) {
      updateInstagramEmbed(currentStore.latestInsta2);
    }
  });
}

// 가게 정보 업데이트 함수
function updateStoreInfo(store) {
  currentStore = store;
  if (!store) return;
  var detailContent = "\n        \uAC00\uAC8C\uBA85: ".concat(store.name, "<br>\n        \uC8FC\uC18C: ").concat(store.address, "<br>\n        \uD3C9\uC810: ").concat(store.rating, "<br>\n        \uD569\uC0B0\uB9AC\uBDF0: ").concat(store.reviews, "<br>\n        \uBC29\uC1A1: ").concat(store.broadcast, "<br>\n        \uC804\uD654\uBC88\uD638: ").concat(store.phone, "<br>\n        \uBA54\uB274: ").concat(store.menu.join(", "), "<br>\n        \uAC00\uACA9: ").concat(store.price, "\n    ");
  activateTab('detail-tab', detailContent);
  document.getElementById('popular1-tab').dataset.content = store.popularInsta1 || '해당 게시물을 가져올 수 없습니다.';
  document.getElementById('popular2-tab').dataset.content = store.popularInsta2 || '해당 게시물을 가져올 수 없습니다.';
  document.getElementById('latest1-tab').dataset.content = store.latestInsta1 || '해당 게시물을 가져올 수 없습니다.';
  document.getElementById('latest2-tab').dataset.content = store.latestInsta2 || '해당 게시물을 가져올 수 없습니다.';
  updateVideoAndButtons(store);
  // 새로운 코드: 유튜브 미리보기 업데이트
  updateYoutubePreview(store);
}

// 새로운 함수: 유튜브 미리보기 업데이트
function updateYoutubePreview(store) {
  var videoFrame = document.getElementById('youtubeVideo');
  if (videoFrame && store.youtubeVideos && store.youtubeVideos.childhood) {
    var videoId = extractVideoId(store.youtubeVideos.childhood);
    if (videoId) {
      videoFrame.src = "https://www.youtube.com/embed/".concat(videoId);
    }
  }
}

// 유틸리티 함수: YouTube URL에서 비디오 ID 추출
function extractVideoId(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// 상호 검색 함수 (기존의 searchStoresAndRegions 함수를 수정)
function searchByStoreName(query) {
  var matchedStores = storeData.filter(function (store) {
    return store.name.toLowerCase().includes(query.toLowerCase());
  });
  if (matchedStores.length > 0) {
    var store = matchedStores[0];
    var position = new naver.maps.LatLng(store.latitude, store.longitude);
    map.setCenter(position);
    map.setZoom(15);
    updateMarkers([store], true);
    updateStoreInfo(store);
  } else {
    alert('검색 결과가 없습니다.');
  }
}

// toggleStreetView 함수 수정
function toggleStreetView(store) {
  console.log('toggleStreetView called', store); // 디버깅용
  var streetViewArea = document.getElementById('street-view');
  var mapArea = document.getElementById('map');
  if (!isStreetViewVisible && store && store.streetViewUrl) {
    console.log('Opening street view:', store.streetViewUrl); // 디버깅용
    streetViewArea.style.display = 'block';
    streetViewArea.innerHTML = "<iframe src=\"".concat(store.streetViewUrl, "\" width=\"100%\" height=\"100%\" frameborder=\"0\" style=\"border:0;\" allowfullscreen=\"\" aria-hidden=\"false\" tabindex=\"0\"></iframe>");
    mapArea.style.width = '50%';
    isStreetViewVisible = true;
    currentStreetViewStore = store;
  } else {
    console.log('Closing street view'); // 디버깅용
    streetViewArea.style.display = 'none';
    streetViewArea.innerHTML = '';
    mapArea.style.width = '100%';
    isStreetViewVisible = false;
    currentStreetViewStore = null;
  }
  if (map) {
    naver.maps.Event.trigger(map, 'resize');
  }
}

// 마커 업데이트 함수
function updateMarkers(stores) {
  var openInfoWindow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 기존 마커 제거
  markers.forEach(function (marker) {
    return marker.setMap(null);
  });
  markers = [];
  infoWindows = [];

  // 새 마커 생성
  stores.forEach(function (store, index) {
    var position = new naver.maps.LatLng(store.latitude, store.longitude);
    var marker = new naver.maps.Marker({
      map: map,
      position: position,
      icon: index === 0 ? yellowMarkerIcon : redMarkerIcon
    });
    markers.push(marker);
    var contentString = "\n            <div class=\"iw_inner\" style=\"font-size:13px; font-weight: 500; cursor: pointer;\">\n                <h3 style=\"font-size:14px; font-weight: 600;\">\n                    ".concat(store.name, "\n                </h3>\n                <p>\n                    \uC8FC\uC18C: ").concat(store.address, "<br />\n                    \uC804\uD654\uBC88\uD638: ").concat(store.phone, "<br />\n                </p>\n                <small>\uD074\uB9AD\uD558\uC5EC \uAC70\uB9AC\uBDF0 \uBCF4\uAE30</small>\n            </div>\n        ");
    var infowindow = new naver.maps.InfoWindow({
      content: contentString,
      minWidth: 200,
      backgroundColor: "#eee",
      borderColor: "#b40057",
      borderWidth: 5,
      disableAnchor: true,
      pixelOffset: new naver.maps.Point(0, -10)
    });
    infoWindows.push(infowindow);
    naver.maps.Event.addListener(marker, "click", function () {
      markers.forEach(function (m) {
        return m.setIcon(redMarkerIcon);
      });
      marker.setIcon(yellowMarkerIcon);
      infoWindows.forEach(function (iw) {
        return iw.close();
      });
      infowindow.open(map, marker);
      currentInfoWindow = infowindow;
      updateStoreInfo(store);
    });
    naver.maps.Event.addListener(infowindow, "domready", function () {
      var iwInner = infowindow.getContent().querySelector('.iw_inner');
      if (iwInner) {
        iwInner.addEventListener('click', function (e) {
          e.preventDefault();
          toggleStreetView(store);
        });
      }
    });
    if (index === 0 && openInfoWindow) {
      infowindow.open(map, marker);
    }
  });
}

// 지도 초기화 함수
function initializeMap() {
  var mapElement = document.getElementById('map');
  if (!searchButton || !mapElement) {
    console.error('Required DOM elements not found');
    return;
  }
  if (window.naver && naver.maps) {
    var cityhall = new naver.maps.LatLng(37.5666805, 126.9784147);
    map = new naver.maps.Map('map', {
      center: cityhall,
      zoom: 6.5
    });
    redMarkerIcon = {
      url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
      size: new naver.maps.Size(32, 32),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(16, 32)
    };
    yellowMarkerIcon = {
      url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      size: new naver.maps.Size(32, 32),
      origin: new naver.maps.Point(0, 0),
      anchor: new naver.maps.Point(16, 32)
    };
    loadStoreData();
    loadRegionData();
    setupEventListeners();

    // 초기 탭 활성화
    activateTab('detail-tab', '가게를 선택하면 상세 정보가 표시됩니다.');
    changeSearchMode('store'); // 초기 검색 모드를 '상호 검색'으로 설정
    console.log('맛집 지도 애플리케이션이 초기화되었습니다.');

    // 지도 빈 곳 클릭 시 정보창 닫기
    naver.maps.Event.addListener(map, 'click', function () {
      if (currentInfoWindow) {
        currentInfoWindow.close();
        currentInfoWindow = null;
      }
      if (isStreetViewVisible) {
        toggleStreetView(null);
      }
    });

    // 탭 클릭 이벤트 리스너 추가
    document.querySelectorAll('.tab-button').forEach(function (tab) {
      tab.addEventListener('click', function () {
        // 지도의 크기를 조정
        naver.maps.Event.trigger(map, 'resize');

        // 지도의 중심을 조정하여 빈 공간을 없앰
        var mapCenter = map.getCenter();
        var mapSize = map.getSize();
        var panX = 0;
        var panY = -(mapSize.height * 0.25); // 지도의 중심을 위로 이동

        map.setCenter(mapCenter);
        setTimeout(function () {
          map.panBy(panX, panY);
        }, 300);
      });
    });
  }
}

// 가게 데이터 로드 함수
// loadStoreData 함수에 디버깅 로그 추가
function loadStoreData() {
  fetch('https://tera04162.github.io/dduck/dduck.json').then(function (response) {
    return response.json();
  }).then(function (data) {
    storeData = data;
    console.log('Loaded store data:', storeData); // 디버깅용
    if (!storeData.streetViewUrl) {
      console.error('streetViewUrl is missing in store data');
    }
    createInitialMarkers();
    setupSearchListeners();
    setupTabListeners();
    setupInstagramTabHandlers();
  })["catch"](function (error) {
    return console.log('Error loading store data:', error);
  });
}

// 지역 데이터 로드 함수
function loadRegionData() {
  fetch('https://tera04162.github.io/dduck/region.json').then(function (response) {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  }).then(function (data) {
    regionData = data;
    console.log('지역 데이터 로드 완료:', regionData);
  })["catch"](function (error) {
    return console.log('Error loading region data:', error);
  });
}

// 초기 마커 생성 함수
function createInitialMarkers() {
  storeData.forEach(function (store, index) {
    var position = new naver.maps.LatLng(store.latitude, store.longitude);
    var marker = new naver.maps.Marker({
      map: map,
      position: position,
      icon: redMarkerIcon
    });
    markers.push(marker);
    var contentString = "\n            <div class=\"iw_inner\" style=\"font-size:13px; font-weight: 500;\">\n                <h3 style=\"font-size:14px; font-weight: 600;\">\n                    ".concat(store.name, "\n                </h3>\n                <p>\n                    \uC8FC\uC18C: ").concat(store.address, "<br />\n                    \uC804\uD654\uBC88\uD638: ").concat(store.phone, "<br />\n                </p>\n                <small>\uD074\uB9AD\uD558\uC5EC \uAC70\uB9AC\uBDF0 \uBCF4\uAE30</small>\n            </div>\n        ");
    var infowindow = new naver.maps.InfoWindow({
      content: contentString,
      minWidth: 200,
      backgroundColor: "#eee",
      borderColor: "#b40057",
      borderWidth: 5,
      disableAnchor: true,
      pixelOffset: new naver.maps.Point(0, -10)
    });
    infoWindows.push(infowindow);
    naver.maps.Event.addListener(marker, "click", function () {
      markers.forEach(function (m) {
        return m.setIcon(redMarkerIcon);
      });
      marker.setIcon(yellowMarkerIcon);
      infoWindows.forEach(function (iw) {
        return iw.close();
      });
      infowindow.open(map, marker);
      currentInfoWindow = infowindow;
      updateStoreInfo(store);
    });
    naver.maps.Event.addListener(infowindow, "domready", function () {
      var iwInner = document.querySelector('.iw_inner');
      if (iwInner) {
        iwInner.addEventListener('click', function (e) {
          e.preventDefault();
          toggleStreetView(store);
        });
      }
    });
    console.log("Marker for ".concat(store.name, " created at (").concat(store.latitude, ", ").concat(store.longitude, ")"));
  });
  console.log("Total markers created: ".concat(markers.length));
}

// 검색 리스너 설정 함수
function setupSearchListeners() {
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}
function performSearch() {
  var searchQuery = searchInput.value.trim();
  if (searchQuery.length >= 2) {
    if (currentSearchMode === 'region') {
      searchByRegion(searchQuery);
    } else {
      searchByStoreName(searchQuery);
    }
  } else {
    alert('검색어를 2글자 이상 입력해주세요.');
  }
}

// 이벤트 리스너 설정 함수
function setupEventListeners() {
  setupSearchListeners();
  setupTabListeners();
  setupInstagramTabHandlers();
  window.addEventListener('resize', function () {
    if (map) {
      naver.maps.Event.trigger(map, 'resize');
    }
  });
}
// 검색 입력 필드 엔터 키 이벤트 수정
searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    var searchQuery = searchInput.value.trim();
    if (searchQuery.length >= 2) {
      if (currentSearchMode === 'region') {
        searchByRegion(searchQuery);
      } else {
        searchByStoreName(searchQuery);
      }
    } else {
      alert('검색어를 2글자 이상 입력해주세요.');
    }
  }
});

// 윈도우 리사이즈 이벤트 처리
window.addEventListener('resize', function () {
  if (map) {
    naver.maps.Event.trigger(map, 'resize');
  }
});

// 지도 초기화
document.addEventListener('DOMContentLoaded', initializeMap);
console.log('맛집 지도 애플리케이션 스크립트가 로드되었습니다.');
/******/ })()
;
//# sourceMappingURL=bundle.js.map