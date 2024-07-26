/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");



class ThreeJSContainer {
    scene;
    light;
    cloud;
    particleNum = 1000;
    particles;
    positions;
    camera;
    materials;
    materialIndex = 0;
    constructor() { }
    // 画面部分の作成(表示する枠ごとに)
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_2__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_2__.Color(0x000000));
        renderer.shadowMap.enabled = true; // シャドウマップを有効にする
        // カメラの設定
        this.camera = new three__WEBPACK_IMPORTED_MODULE_2__.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.copy(cameraPos);
        this.camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(this.camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        const render = (time) => {
            orbitControls.update();
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.update();
            renderer.render(this.scene, this.camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_2__.Scene();
        // パーティクルの初期位置を設定
        this.particles = new three__WEBPACK_IMPORTED_MODULE_2__.BufferGeometry();
        this.positions = new Float32Array(this.particleNum * 3);
        let radius = 5.0;
        for (let i = 0; i < this.particleNum; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            this.positions[i * 3] = x;
            this.positions[i * 3 + 1] = y;
            this.positions[i * 3 + 2] = z;
        }
        this.particles.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_2__.BufferAttribute(this.positions, 3));
        let generateSprite = (arg0, arg1, arg2, arg3) => {
            let canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;
            let context = canvas.getContext('2d');
            let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(0, arg0);
            gradient.addColorStop(0.2, arg1);
            gradient.addColorStop(0.4, arg2);
            gradient.addColorStop(1.0, arg3);
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            let texture = new three__WEBPACK_IMPORTED_MODULE_2__.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        };
        // 複数のテクスチャを生成
        this.materials = [
            new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
                map: generateSprite('rgba(255,255,255,1)', 'rgba(255,0,255,1)', 'rgba(64,0,64,1)', 'rgba(0,0,0,1)'),
                color: 0xffffff,
                size: 0.5,
                transparent: true,
                blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending,
                depthWrite: false
            }),
            new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
                map: generateSprite('rgba(255,255,255,1)', 'rgba(255,255,0,1)', 'rgba(64,64,0,1)', 'rgba(0,0,0,1)'),
                color: 0xffffff,
                size: 0.5,
                transparent: true,
                blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending,
                depthWrite: false
            }),
            new three__WEBPACK_IMPORTED_MODULE_2__.PointsMaterial({
                map: generateSprite('rgba(255,255,255,1)', 'rgba(0,255,255,1)', 'rgba(0,64,64,1)', 'rgba(0,0,0,1)'),
                color: 0xffffff,
                size: 0.5,
                transparent: true,
                blending: three__WEBPACK_IMPORTED_MODULE_2__.AdditiveBlending,
                depthWrite: false
            })
        ];
        this.cloud = new three__WEBPACK_IMPORTED_MODULE_2__.Points(this.particles, this.materials[this.materialIndex]);
        this.scene.add(this.cloud);
        // マテリアルを切り替える関数
        const switchMaterial = () => {
            this.materialIndex = (this.materialIndex + 1) % this.materials.length;
            this.cloud.material = this.materials[this.materialIndex];
        };
        // Tweenでコントロールする変数の定義
        let sphereTweeninfo = { radius: 3.0 };
        let cubeTweeninfo = { size: 7.0 };
        let coneTweeninfo = { height: 7.0, radius: 3.0 };
        let cylinderTweeninfo = { height: 7.0, radius: 3.0 };
        let torusTweeninfo = { radius: 3.0, tubeRadius: 1.0 };
        let updateParticlesToSphere = () => {
            radius = sphereTweeninfo.radius;
            for (let i = 0; i < this.particleNum; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                const x = radius * Math.sin(phi) * Math.cos(theta);
                const y = radius * Math.sin(phi) * Math.sin(theta);
                const z = radius * Math.cos(phi);
                this.positions[i * 3] = x;
                this.positions[i * 3 + 1] = y;
                this.positions[i * 3 + 2] = z;
            }
            this.particles.attributes.position.needsUpdate = true;
        };
        let updateParticlesToCone = () => {
            let height = coneTweeninfo.height;
            let radius = coneTweeninfo.radius;
            for (let i = 0; i < this.particleNum; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                const size = Math.random();
                const BOTTOMorSIDE = Math.floor(Math.random() * 3);
                let x, y, z;
                if (BOTTOMorSIDE == 0) {
                    x = radius * Math.sin(phi) * Math.cos(theta) * (1 - size);
                    y = (size - 1 / 2) * height;
                    z = radius * Math.sin(phi) * Math.sin(theta) * (1 - size);
                }
                else if (BOTTOMorSIDE == 1) {
                    x = radius * Math.sin(phi) * Math.cos(theta);
                    y = -height / 2;
                    z = radius * Math.sin(phi) * Math.sin(theta);
                }
                this.positions[i * 3] = x;
                this.positions[i * 3 + 1] = y;
                this.positions[i * 3 + 2] = z;
            }
            this.particles.attributes.position.needsUpdate = true;
        };
        let updateParticlesToCylinder = () => {
            let height = cylinderTweeninfo.height;
            let radius = cylinderTweeninfo.radius;
            for (let i = 0; i < this.particleNum; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                const size = Math.random();
                const BOTTOMorSIDE = Math.floor(Math.random() * 3);
                let x, y, z;
                if (BOTTOMorSIDE == 0) {
                    x = radius * Math.sin(phi) * Math.cos(theta);
                    y = (size - 1 / 2) * height;
                    z = radius * Math.sin(phi) * Math.sin(theta);
                }
                else if (BOTTOMorSIDE == 1) {
                    x = radius * Math.sin(phi) * Math.cos(theta);
                    y = (Math.floor(Math.random() * 2) - 0.5) * height;
                    z = radius * Math.sin(phi) * Math.sin(theta);
                }
                this.positions[i * 3] = x;
                this.positions[i * 3 + 1] = y;
                this.positions[i * 3 + 2] = z;
            }
            this.particles.attributes.position.needsUpdate = true;
        };
        let updateParticlesToCube = () => {
            let size = cubeTweeninfo.size;
            for (let i = 0; i < this.particleNum; i++) {
                const XorYorZ = Math.floor(Math.random() * 4);
                let x, y, z;
                if (XorYorZ == 0) {
                    x = (Math.floor(Math.random() * 2) - 0.5) * size;
                    y = (Math.random() - 0.5) * size;
                    z = (Math.random() - 0.5) * size;
                }
                else if (XorYorZ == 1) {
                    x = (Math.random() - 0.5) * size;
                    y = (Math.floor(Math.random() * 2) - 0.5) * size;
                    z = (Math.random() - 0.5) * size;
                }
                else if (XorYorZ == 2) {
                    x = (Math.random() - 0.5) * size;
                    y = (Math.random() - 0.5) * size;
                    z = (Math.floor(Math.random() * 2) - 0.5) * size;
                }
                this.positions[i * 3] = x;
                this.positions[i * 3 + 1] = y;
                this.positions[i * 3 + 2] = z;
            }
            this.particles.attributes.position.needsUpdate = true;
        };
        let updateParticlesToTorus = () => {
            let radius = torusTweeninfo.radius;
            let tubeRadius = torusTweeninfo.tubeRadius;
            for (let i = 0; i < this.particleNum; i++) {
                const u = Math.random() * Math.PI * 2;
                const v = Math.random() * Math.PI * 2;
                const x = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
                const y = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
                const z = tubeRadius * Math.sin(v);
                this.positions[i * 3] = x;
                this.positions[i * 3 + 1] = y;
                this.positions[i * 3 + 2] = z;
            }
            this.particles.attributes.position.needsUpdate = true;
        };
        // Tweenの作成
        const sphereToCubeTween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(sphereTweeninfo)
            .to({ radius: 0.0 }, 1000)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Elastic.Out)
            .onUpdate(updateParticlesToSphere)
            .chain(new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(cubeTweeninfo)
            .to({ size: 10.0 }, 2000)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Elastic.Out)
            .onUpdate(updateParticlesToCube)
            .onComplete(() => { cubeToConeTween.start(), switchMaterial(); }));
        const cubeToConeTween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(cubeTweeninfo)
            .to({ size: 0.0 }, 1000)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Elastic.Out)
            .onUpdate(updateParticlesToCube)
            .chain(new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(coneTweeninfo)
            .to({ height: 10.0, radius: 5.0 }, 2000)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Elastic.Out)
            .onUpdate(updateParticlesToCone)
            .onComplete(() => { coneToCylinderTween.start(), switchMaterial(); }));
        const coneToCylinderTween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(coneTweeninfo)
            .to({ height: 0.0, radius: 0.0 }, 1000)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Elastic.Out)
            .onUpdate(updateParticlesToCone)
            .chain(new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(cylinderTweeninfo)
            .to({ height: 10.0, radius: 5.0 }, 2000)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Elastic.Out)
            .onUpdate(updateParticlesToCylinder)
            .onComplete(() => { cylinderTotorusTween.start(), switchMaterial(); }));
        const cylinderTotorusTween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(cylinderTweeninfo)
            .to({ height: 0.0, radius: 0.0 }, 1000)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Elastic.Out)
            .onUpdate(updateParticlesToCylinder)
            .chain(new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(torusTweeninfo)
            .to({ radius: 5.0, tubeRadius: 2.0 }, 2000)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Elastic.Out)
            .onUpdate(updateParticlesToTorus)
            .onComplete(() => { torusToSphereTween.start(), switchMaterial(); }));
        const torusToSphereTween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(torusTweeninfo)
            .to({ radius: 0.0, tubeRadius: 0.0 }, 1000)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Elastic.Out)
            .onUpdate(updateParticlesToTorus)
            .chain(new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(sphereTweeninfo)
            .to({ radius: 5.0 }, 2000)
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Easing.Elastic.Out)
            .onUpdate(updateParticlesToSphere)
            .onComplete(() => { sphereToCubeTween.start(), switchMaterial(); }));
        // アニメーションの開始
        sphereToCubeTween.start();
        // ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_2__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        // カメラの回転
        let cameraRotationInfo = { angle: 0 };
        let updateCamera = () => {
            let angle = cameraRotationInfo.angle;
            this.camera.position.set(10 * Math.cos(angle), 5, 10 * Math.sin(angle));
            this.camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(0, 0, 0));
        };
        const cameraTween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.Tween(cameraRotationInfo)
            .to({ angle: Math.PI }, 1000)
            .onUpdate(updateCamera)
            .repeat(Infinity);
        cameraTween.start();
        // 毎フレームのupdateを呼んで，更新
        // reqestAnimationFrame により次フレームを呼ぶ
        let update = (time) => {
            requestAnimationFrame(update);
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_0__.update();
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_2__.Vector3(5, 8, 8));
    document.body.appendChild(viewport);
}


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-78d392"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Li9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVFdFRU4gZnJvbSBcIkB0d2VlbmpzL3R3ZWVuLmpzXCI7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG4gICAgcHJpdmF0ZSBjbG91ZDogVEhSRUUuUG9pbnRzO1xuICAgIHByaXZhdGUgcGFydGljbGVOdW0gPSAxMDAwO1xuICAgIHByaXZhdGUgcGFydGljbGVzOiBUSFJFRS5CdWZmZXJHZW9tZXRyeTtcbiAgICBwcml2YXRlIHBvc2l0aW9uczogRmxvYXQzMkFycmF5O1xuICAgIHByaXZhdGUgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbiAgICBwcml2YXRlIG1hdGVyaWFsczogVEhSRUUuUG9pbnRzTWF0ZXJpYWxbXTtcbiAgICBwcml2YXRlIG1hdGVyaWFsSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgLy8g55S76Z2i6YOo5YiG44Gu5L2c5oiQKOihqOekuuOBmeOCi+aeoOOBlOOBqOOBqylcbiAgICBwdWJsaWMgY3JlYXRlUmVuZGVyZXJET00gPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNhbWVyYVBvczogVEhSRUUuVmVjdG9yMykgPT4ge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4MDAwMDAwKSk7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZTsgLy8g44K344Oj44OJ44Km44Oe44OD44OX44KS5pyJ5Yq544Gr44GZ44KLXG5cbiAgICAgICAgLy8g44Kr44Oh44Op44Gu6Kit5a6aXG4gICAgICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aWR0aCAvIGhlaWdodCwgMC4xLCAxMDAwKTtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICB0aGlzLmNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gICAgICAgIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyh0aGlzLmNhbWVyYSwgcmVuZGVyZXIuZG9tRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVTY2VuZSgpO1xuXG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jHJlbmRlclxuICAgICAgICBjb25zdCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XG4gICAgICAgICAgICBUV0VFTi51cGRhdGUoKTtcbiAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIH1cblxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICAgICAgICAvLyDjg5Hjg7zjg4bjgqPjgq/jg6vjga7liJ3mnJ/kvY3nva7jgpLoqK3lrppcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMucGFydGljbGVOdW0gKiAzKTtcbiAgICAgICAgbGV0IHJhZGl1cyA9IDUuMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFydGljbGVOdW07IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdGhldGEgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XG4gICAgICAgICAgICBjb25zdCBwaGkgPSBNYXRoLmFjb3MoKE1hdGgucmFuZG9tKCkgKiAyKSAtIDEpO1xuICAgICAgICAgICAgY29uc3QgeCA9IHJhZGl1cyAqIE1hdGguc2luKHBoaSkgKiBNYXRoLmNvcyh0aGV0YSk7XG4gICAgICAgICAgICBjb25zdCB5ID0gcmFkaXVzICogTWF0aC5zaW4ocGhpKSAqIE1hdGguc2luKHRoZXRhKTtcbiAgICAgICAgICAgIGNvbnN0IHogPSByYWRpdXMgKiBNYXRoLmNvcyhwaGkpO1xuXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpICogM10gPSB4O1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaSAqIDMgKyAxXSA9IHk7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpICogMyArIDJdID0gejtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGFydGljbGVzLnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHRoaXMucG9zaXRpb25zLCAzKSk7XG5cbiAgICAgICAgbGV0IGdlbmVyYXRlU3ByaXRlID0gKGFyZzA6IHN0cmluZywgYXJnMTogc3RyaW5nLCBhcmcyOiBzdHJpbmcsIGFyZzM6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gMTY7XG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMTY7XG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgbGV0IGdyYWRpZW50ID0gY29udGV4dC5jcmVhdGVSYWRpYWxHcmFkaWVudChjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgMCwgY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIsIGNhbnZhcy53aWR0aCAvIDIpO1xuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIGFyZzApO1xuICAgICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMiwgYXJnMSk7XG4gICAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC40LCBhcmcyKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLjAsIGFyZzMpO1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoY2FudmFzKTtcbiAgICAgICAgICAgIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRleHR1cmU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDopIfmlbDjga7jg4bjgq/jgrnjg4Hjg6PjgpLnlJ/miJBcbiAgICAgICAgdGhpcy5tYXRlcmlhbHMgPSBbXG4gICAgICAgICAgICBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgICAgIG1hcDogZ2VuZXJhdGVTcHJpdGUoJ3JnYmEoMjU1LDI1NSwyNTUsMSknLCAncmdiYSgyNTUsMCwyNTUsMSknLCAncmdiYSg2NCwwLDY0LDEpJywgJ3JnYmEoMCwwLDAsMSknKSxcbiAgICAgICAgICAgICAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgICAgICAgICAgICAgc2l6ZTogMC41LFxuICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICAgICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgICAgICAgICAgbWFwOiBnZW5lcmF0ZVNwcml0ZSgncmdiYSgyNTUsMjU1LDI1NSwxKScsICdyZ2JhKDI1NSwyNTUsMCwxKScsICdyZ2JhKDY0LDY0LDAsMSknLCAncmdiYSgwLDAsMCwxKScpLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICAgICAgICAgICAgICBzaXplOiAwLjUsXG4gICAgICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICAgICAgICAgICAgZGVwdGhXcml0ZTogZmFsc2VcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgICAgICAgICAgICBtYXA6IGdlbmVyYXRlU3ByaXRlKCdyZ2JhKDI1NSwyNTUsMjU1LDEpJywgJ3JnYmEoMCwyNTUsMjU1LDEpJywgJ3JnYmEoMCw2NCw2NCwxKScsICdyZ2JhKDAsMCwwLDEpJyksXG4gICAgICAgICAgICAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgICAgICAgICAgICAgIHNpemU6IDAuNSxcbiAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICAgICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLmNsb3VkID0gbmV3IFRIUkVFLlBvaW50cyh0aGlzLnBhcnRpY2xlcywgdGhpcy5tYXRlcmlhbHNbdGhpcy5tYXRlcmlhbEluZGV4XSk7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuY2xvdWQpO1xuXG4gICAgICAgIC8vIOODnuODhuODquOCouODq+OCkuWIh+OCiuabv+OBiOOCi+mWouaVsFxuICAgICAgICBjb25zdCBzd2l0Y2hNYXRlcmlhbCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxJbmRleCA9ICh0aGlzLm1hdGVyaWFsSW5kZXggKyAxKSAlIHRoaXMubWF0ZXJpYWxzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuY2xvdWQubWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsc1t0aGlzLm1hdGVyaWFsSW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVHdlZW7jgafjgrPjg7Pjg4jjg63jg7zjg6vjgZnjgovlpInmlbDjga7lrprnvqlcbiAgICAgICAgbGV0IHNwaGVyZVR3ZWVuaW5mbyA9IHtyYWRpdXM6My4wfTtcbiAgICAgICAgbGV0IGN1YmVUd2VlbmluZm8gPSB7IHNpemU6IDcuMCB9O1xuICAgICAgICBsZXQgY29uZVR3ZWVuaW5mbyA9IHsgaGVpZ2h0OiA3LjAsIHJhZGl1czogMy4wIH07XG4gICAgICAgIGxldCBjeWxpbmRlclR3ZWVuaW5mbyA9IHsgaGVpZ2h0OiA3LjAsIHJhZGl1czogMy4wIH07XG4gICAgICAgIGxldCB0b3J1c1R3ZWVuaW5mbyA9IHsgcmFkaXVzOiAzLjAsIHR1YmVSYWRpdXM6IDEuMCB9O1xuXG4gICAgICAgIGxldCB1cGRhdGVQYXJ0aWNsZXNUb1NwaGVyZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJhZGl1cyA9IHNwaGVyZVR3ZWVuaW5mby5yYWRpdXM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFydGljbGVOdW07IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRoZXRhID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBoaSA9IE1hdGguYWNvcygoTWF0aC5yYW5kb20oKSAqIDIpIC0gMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IHJhZGl1cyAqIE1hdGguc2luKHBoaSkgKiBNYXRoLmNvcyh0aGV0YSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IHJhZGl1cyAqIE1hdGguc2luKHBoaSkgKiBNYXRoLnNpbih0aGV0YSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeiA9IHJhZGl1cyAqIE1hdGguY29zKHBoaSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpICogM10gPSB4O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2kgKiAzICsgMV0gPSB5O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2kgKiAzICsgMl0gPSB6O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXMuYXR0cmlidXRlcy5wb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdXBkYXRlUGFydGljbGVzVG9Db25lID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IGNvbmVUd2VlbmluZm8uaGVpZ2h0O1xuICAgICAgICAgICAgbGV0IHJhZGl1cyA9IGNvbmVUd2VlbmluZm8ucmFkaXVzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlTnVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGV0YSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgICAgICBjb25zdCBwaGkgPSBNYXRoLmFjb3MoKE1hdGgucmFuZG9tKCkgKiAyKSAtIDEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpemU9TWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBCT1RUT01vclNJREU9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyk7XG4gICAgICAgICAgICAgICAgbGV0IHgseSx6O1xuICAgICAgICAgICAgICAgIGlmKEJPVFRPTW9yU0lERT09MCl7XG4gICAgICAgICAgICAgICAgICAgIHggPSByYWRpdXMgKiBNYXRoLnNpbihwaGkpICogTWF0aC5jb3ModGhldGEpKigxLXNpemUpO1xuICAgICAgICAgICAgICAgICAgICB5ID0gKHNpemUtMS8yKSpoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHogPSByYWRpdXMgKiBNYXRoLnNpbihwaGkpICogTWF0aC5zaW4odGhldGEpKigxLXNpemUpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKEJPVFRPTW9yU0lERT09MSl7XG4gICAgICAgICAgICAgICAgICAgIHggPSByYWRpdXMgKiBNYXRoLnNpbihwaGkpICogTWF0aC5jb3ModGhldGEpO1xuICAgICAgICAgICAgICAgICAgICB5ID0gLWhlaWdodC8yO1xuICAgICAgICAgICAgICAgICAgICB6ID0gcmFkaXVzICogTWF0aC5zaW4ocGhpKSAqIE1hdGguc2luKHRoZXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpICogM10gPSB4O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2kgKiAzICsgMV0gPSB5O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2kgKiAzICsgMl0gPSB6O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXMuYXR0cmlidXRlcy5wb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdXBkYXRlUGFydGljbGVzVG9DeWxpbmRlciA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSBjeWxpbmRlclR3ZWVuaW5mby5oZWlnaHQ7XG4gICAgICAgICAgICBsZXQgcmFkaXVzID0gY3lsaW5kZXJUd2VlbmluZm8ucmFkaXVzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlTnVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGV0YSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgICAgICBjb25zdCBwaGkgPSBNYXRoLmFjb3MoKE1hdGgucmFuZG9tKCkgKiAyKSAtIDEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpemU9TWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBCT1RUT01vclNJREU9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyk7XG4gICAgICAgICAgICAgICAgbGV0IHgseSx6O1xuICAgICAgICAgICAgICAgIGlmKEJPVFRPTW9yU0lERT09MCl7XG4gICAgICAgICAgICAgICAgICAgIHggPSByYWRpdXMgKiBNYXRoLnNpbihwaGkpICogTWF0aC5jb3ModGhldGEpO1xuICAgICAgICAgICAgICAgICAgICB5ID0gKHNpemUtMS8yKSpoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHogPSByYWRpdXMgKiBNYXRoLnNpbihwaGkpICogTWF0aC5zaW4odGhldGEpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKEJPVFRPTW9yU0lERT09MSl7XG4gICAgICAgICAgICAgICAgICAgIHggPSByYWRpdXMgKiBNYXRoLnNpbihwaGkpICogTWF0aC5jb3ModGhldGEpO1xuICAgICAgICAgICAgICAgICAgICB5ID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpLTAuNSkgKmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgeiA9IHJhZGl1cyAqIE1hdGguc2luKHBoaSkgKiBNYXRoLnNpbih0aGV0YSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaSAqIDNdID0geDtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpICogMyArIDFdID0geTtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpICogMyArIDJdID0gejtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXMuYXR0cmlidXRlcy5wb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdXBkYXRlUGFydGljbGVzVG9DdWJlID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNpemUgPSBjdWJlVHdlZW5pbmZvLnNpemU7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFydGljbGVOdW07IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IFhvcllvclo9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCk7XG4gICAgICAgICAgICAgICAgbGV0IHgseSx6O1xuICAgICAgICAgICAgICAgIGlmKFhvcllvclo9PTApe1xuICAgICAgICAgICAgICAgICAgICB4ID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpIC0gMC41KSAqIHNpemU7XG4gICAgICAgICAgICAgICAgICAgIHkgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICB6ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogc2l6ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihYb3JZb3JaPT0xKXtcbiAgICAgICAgICAgICAgICAgICAgeCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIHNpemU7XG4gICAgICAgICAgICAgICAgICAgIHkgPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMikgLSAwLjUpICogc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgeiA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIHNpemU7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoWG9yWW9yWj09Mil7XG4gICAgICAgICAgICAgICAgICAgIHggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBzaXplO1xuICAgICAgICAgICAgICAgICAgICB5ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgeiA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSAtIDAuNSkgKiBzaXplO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2kgKiAzXSA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaSAqIDMgKyAxXSA9IHk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbnNbaSAqIDMgKyAyXSA9IHo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBhcnRpY2xlcy5hdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB1cGRhdGVQYXJ0aWNsZXNUb1RvcnVzID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHJhZGl1cyA9IHRvcnVzVHdlZW5pbmZvLnJhZGl1cztcbiAgICAgICAgICAgIGxldCB0dWJlUmFkaXVzID0gdG9ydXNUd2VlbmluZm8udHViZVJhZGl1cztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYXJ0aWNsZU51bTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgICAgICAgICBjb25zdCB2ID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSAocmFkaXVzICsgdHViZVJhZGl1cyAqIE1hdGguY29zKHYpKSAqIE1hdGguY29zKHUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSAocmFkaXVzICsgdHViZVJhZGl1cyAqIE1hdGguY29zKHYpKSAqIE1hdGguc2luKHUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHogPSB0dWJlUmFkaXVzICogTWF0aC5zaW4odik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uc1tpICogM10gPSB4O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2kgKiAzICsgMV0gPSB5O1xuICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25zW2kgKiAzICsgMl0gPSB6O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZXMuYXR0cmlidXRlcy5wb3NpdGlvbi5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUd2VlbuOBruS9nOaIkFxuICAgICAgICBjb25zdCBzcGhlcmVUb0N1YmVUd2VlbiA9IG5ldyBUV0VFTi5Ud2VlbihzcGhlcmVUd2VlbmluZm8pXG4gICAgICAgICAgICAudG8oeyByYWRpdXM6IDAuMCB9LCAxMDAwKVxuICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuRWxhc3RpYy5PdXQpXG4gICAgICAgICAgICAub25VcGRhdGUodXBkYXRlUGFydGljbGVzVG9TcGhlcmUpXG4gICAgICAgICAgICAuY2hhaW4obmV3IFRXRUVOLlR3ZWVuKGN1YmVUd2VlbmluZm8pXG4gICAgICAgICAgICAgICAgLnRvKHsgc2l6ZTogMTAuMCB9LCAyMDAwKVxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLkVsYXN0aWMuT3V0KVxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh1cGRhdGVQYXJ0aWNsZXNUb0N1YmUpXG4gICAgICAgICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4ge2N1YmVUb0NvbmVUd2Vlbi5zdGFydCgpLHN3aXRjaE1hdGVyaWFsKCl9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBjdWJlVG9Db25lVHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oY3ViZVR3ZWVuaW5mbylcbiAgICAgICAgICAgIC50byh7IHNpemU6IDAuMCB9LCAxMDAwKVxuICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuRWxhc3RpYy5PdXQpXG4gICAgICAgICAgICAub25VcGRhdGUodXBkYXRlUGFydGljbGVzVG9DdWJlKVxuICAgICAgICAgICAgLmNoYWluKG5ldyBUV0VFTi5Ud2Vlbihjb25lVHdlZW5pbmZvKVxuICAgICAgICAgICAgICAgIC50byh7IGhlaWdodDogMTAuMCwgcmFkaXVzOiA1LjAgfSwgMjAwMClcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLk91dClcbiAgICAgICAgICAgICAgICAub25VcGRhdGUodXBkYXRlUGFydGljbGVzVG9Db25lKVxuICAgICAgICAgICAgICAgIC5vbkNvbXBsZXRlKCgpID0+IHtjb25lVG9DeWxpbmRlclR3ZWVuLnN0YXJ0KCksc3dpdGNoTWF0ZXJpYWwoKX0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IGNvbmVUb0N5bGluZGVyVHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oY29uZVR3ZWVuaW5mbylcbiAgICAgICAgICAgIC50byh7IGhlaWdodDogMC4wLCByYWRpdXM6IDAuMCB9LCAxMDAwKVxuICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuRWxhc3RpYy5PdXQpXG4gICAgICAgICAgICAub25VcGRhdGUodXBkYXRlUGFydGljbGVzVG9Db25lKVxuICAgICAgICAgICAgLmNoYWluKG5ldyBUV0VFTi5Ud2VlbihjeWxpbmRlclR3ZWVuaW5mbylcbiAgICAgICAgICAgICAgICAudG8oeyBoZWlnaHQ6IDEwLjAsIHJhZGl1czogNS4wIH0sIDIwMDApXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuRWxhc3RpYy5PdXQpXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKHVwZGF0ZVBhcnRpY2xlc1RvQ3lsaW5kZXIpXG4gICAgICAgICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4ge2N5bGluZGVyVG90b3J1c1R3ZWVuLnN0YXJ0KCksc3dpdGNoTWF0ZXJpYWwoKX0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IGN5bGluZGVyVG90b3J1c1R3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKGN5bGluZGVyVHdlZW5pbmZvKVxuICAgICAgICAgICAgLnRvKHsgaGVpZ2h0OiAwLjAsIHJhZGl1czogMC4wIH0sIDEwMDApXG4gICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLk91dClcbiAgICAgICAgICAgIC5vblVwZGF0ZSh1cGRhdGVQYXJ0aWNsZXNUb0N5bGluZGVyKVxuICAgICAgICAgICAgLmNoYWluKG5ldyBUV0VFTi5Ud2Vlbih0b3J1c1R3ZWVuaW5mbylcbiAgICAgICAgICAgICAgICAudG8oeyByYWRpdXM6IDUuMCwgdHViZVJhZGl1czogMi4wIH0sIDIwMDApXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuRWxhc3RpYy5PdXQpXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKHVwZGF0ZVBhcnRpY2xlc1RvVG9ydXMpXG4gICAgICAgICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4ge3RvcnVzVG9TcGhlcmVUd2Vlbi5zdGFydCgpLHN3aXRjaE1hdGVyaWFsKCl9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBjb25zdCB0b3J1c1RvU3BoZXJlVHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4odG9ydXNUd2VlbmluZm8pXG4gICAgICAgICAgICAudG8oeyByYWRpdXM6IDAuMCwgdHViZVJhZGl1czogMC4wIH0sIDEwMDApXG4gICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLk91dClcbiAgICAgICAgICAgIC5vblVwZGF0ZSh1cGRhdGVQYXJ0aWNsZXNUb1RvcnVzKVxuICAgICAgICAgICAgLmNoYWluKG5ldyBUV0VFTi5Ud2VlbihzcGhlcmVUd2VlbmluZm8pXG4gICAgICAgICAgICAgICAgLnRvKHsgcmFkaXVzOiA1LjAgfSwgMjAwMClcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLk91dClcbiAgICAgICAgICAgICAgICAub25VcGRhdGUodXBkYXRlUGFydGljbGVzVG9TcGhlcmUpXG4gICAgICAgICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4ge3NwaGVyZVRvQ3ViZVR3ZWVuLnN0YXJ0KCksc3dpdGNoTWF0ZXJpYWwoKX0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIOOCouODi+ODoeODvOOCt+ODp+ODs+OBrumWi+Wni1xuICAgICAgICBzcGhlcmVUb0N1YmVUd2Vlbi5zdGFydCgpO1xuXG4gICAgICAgIC8vIOODqeOCpOODiOOBruioreWumlxuICAgICAgICB0aGlzLmxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYpO1xuICAgICAgICBjb25zdCBsdmVjID0gbmV3IFRIUkVFLlZlY3RvcjMoMSwgMSwgMSkubm9ybWFsaXplKCk7XG4gICAgICAgIHRoaXMubGlnaHQucG9zaXRpb24uc2V0KGx2ZWMueCwgbHZlYy55LCBsdmVjLnopO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0KTtcblxuICAgICAgICAvLyDjgqvjg6Hjg6njga7lm57ou6JcbiAgICAgICAgbGV0IGNhbWVyYVJvdGF0aW9uSW5mbyA9IHsgYW5nbGU6IDAgfTtcbiAgICAgICAgbGV0IHVwZGF0ZUNhbWVyYSA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IGNhbWVyYVJvdGF0aW9uSW5mby5hbmdsZTtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnNldCgxMCAqIE1hdGguY29zKGFuZ2xlKSwgNSwgMTAgKiBNYXRoLnNpbihhbmdsZSkpO1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNhbWVyYVR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKGNhbWVyYVJvdGF0aW9uSW5mbylcbiAgICAgICAgICAgIC50byh7IGFuZ2xlOiBNYXRoLlBJIH0sIDEwMDApXG4gICAgICAgICAgICAub25VcGRhdGUodXBkYXRlQ2FtZXJhKVxuICAgICAgICAgICAgLnJlcGVhdChJbmZpbml0eSk7XG5cbiAgICAgICAgY2FtZXJhVHdlZW4uc3RhcnQoKTtcblxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIzmm7TmlrBcbiAgICAgICAgLy8gcmVxZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICAgIGxldCB1cGRhdGU6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgICAgICAgICAgVFdFRU4udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IG5ldyBUaHJlZUpTQ29udGFpbmVyKCk7XG4gICAgbGV0IHZpZXdwb3J0ID0gY29udGFpbmVyLmNyZWF0ZVJlbmRlcmVyRE9NKDY0MCwgNDgwLCBuZXcgVEhSRUUuVmVjdG9yMyg1LCA4LCA4KSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX3R3ZWVuanNfdHdlZW5fanNfZGlzdF90d2Vlbl9lc21fanMtbm9kZV9tb2R1bGVzX3RocmVlX2V4YW1wbGVzX2pzbV9jb250ci03OGQzOTJcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=