<template>
  <div class="secondmap">
    <div id="map">
    </div>
    <div class="back"
         @click='goGis'>
      <i class="iconfont icon-ditu backfont"></i>
    </div>
    <div class="mapInfo betweenbox">
      <div class="startbox">
        <div class="infoInner quyu">
          <div class="centerbox">
            <i class="iconfont icon-chengshi quyuicon"></i>
          </div>
          <div class="centerbox quyutitle">
            <span>{{headData.name}}</span>
          </div>
        </div>
        <div class="border1">

        </div>
      </div>
      <div>
 <div class="betweenbox">

        <div class="infoInner color1">
          <div class="startbox">
            <!-- <div class="icon-box centerbox">
              <i class="iconfont icon-ziyuan2 iconsize"></i>
            </div> -->
            <div class="title">
              常住人口数
            </div>

          </div>
          <div class="endbox">
            <div class="number">
              <countTo :startVal='0'
                       :decimals='1'
                       :endVal='headData.rk'
                       :duration='3000'></countTo>
            </div>
            <div class="danwei">万人</div>
          </div>
        </div>
        <div class="border">

        </div>
        <div class="infoInner color2">
          <div class="startbox">
            <!-- <div class="icon-box centerbox">
              <i class="iconfont icon-guzhang iconsize"></i>
            </div> -->
            <div class="title">
              每万户报修工单
            </div>

          </div>
          <div class="endbox">
            <div class="number">
              <countTo :startVal='0'
                       :endVal=' headData.bxgd'
                       :duration='3000'></countTo>
            </div>
            <div class="danwei">个</div>
          </div>
        </div>
      </div>
      <div class="hr">

      </div>
      <div class="betweenbox">
        <div class="infoInner color3">
          <div class="startbox">
            <!-- <div class="icon-box centerbox">
              <i class="iconfont icon-consult iconsize"></i>
            </div> -->
            <div class="title">
              12345热线工单
            </div>

          </div>
          <div class="endbox">
            <div class="number">
              <countTo :startVal='0'
                       :endVal=' headData.rx12345'
                       :duration='3000'></countTo>
            </div>
            <div class="danwei">个</div>
          </div>
        </div>
        <div class="border">

        </div>
        <!-- <div class="infoInner color4">
          <div class="startbox"> -->
            <!-- <div class="icon-box centerbox">
              <i class="iconfont icon-kuorong iconsize"></i>
            </div> -->
            <!-- <div class="title">
              业扩工单
            </div>

          </div>
          <div class="endbox">
            <div class="number">
              <countTo :startVal='0'
                       :endVal=' headData.ykgd'
                       :duration='3000'></countTo>
            </div>
            <div class="danwei">个</div>
          </div>
        </div>
        <div class="border">

        </div> -->
        <div class="infoInner color5">
          <div class="startbox">

            <!-- <div class="icon-box centerbox">
              <i class="iconfont icon-mei iconsize"></i>
            </div> -->
            <div class="title">
              车联网工单
            </div>

          </div>
          <div class="endbox">
            <div class="number">
              <countTo :startVal='0'
                       :endVal=' headData.clw'
                       :duration='3000'></countTo>
            </div>
            <div class="danwei">个</div>
          </div>
        </div>
      </div>
      </div>

    </div>
  </div>

</template>

<script>
/* eslint-disable */
import { mapState, mapActions, mapMutations } from "vuex";
import * as maptalks from "maptalks";
import * as THREE from "three";
import * as echarts from "echarts";
import * as maptalksTHREE from "maptalks.three";
import * as maptalksE3 from "maptalks.e3";
import * as api from "@/api/axios.js";
import * as OBJLoader from "three-obj-loader";
import qd from "./370200.js";
import area from "./areaData.js";
import Point from "./point.js";
import Dom from "./dom.js";
import Bar from "./bar.js";
import Radar from "./radar.js";
import { Group } from "three";
let STLLoader = require("three-stl-loader")(THREE);
let martkerIcon = require("../../assets/marker.png");
export default {
  data() {
    return {
      headData: {
        rk: 138.05,
        bxgd: 4,
        rx12345: 0,
        ykgd: 0,
        clw: 18,
        name: "市南区"
      },
      diqu: {
        城阳区: "370214",
        市南区: "370202",
        市北区: "370203",
        崂山区: "370212",
        李沧区: "370213",
        胶州市: "3740220",
        即墨市: "3740221",
        平度市: "3740222",
        黄岛市: "3740223",
        莱西市: "3740224"
      },

      map: null,
      threeLayer: null //三维区域图层
    };
  },
  computed: {
    ...mapState("Map", ["options", "tsOptions", "areaId", "xxkxx"])
  },
  watch: {
    areaId(val) {
      if (val) {
        let that = this;
        if (this.threeLayer) {
          let diqu = {};
          for (let i in this.diqu) {
            diqu[this.diqu[i]] = i;
          }
          if (this.threeLayer.getScene()) {
            this.threeLayer.getScene().traverse(function(obj) {
              if (obj.type === "Mesh" && obj.name === diqu[val]) {
                that.scaleArea(obj);
              }
            });
          }
        }
      }
    }
  },
  mounted() {
    this.init();
    let time = setTimeout(() => {
      this.AddThreeLayer();
      this.threeClickEvent();
      clearTimeout(time);
    }, 1000);
  },
  methods: {
    ...mapMutations("Map", [
      "setOptions",
      "setTsOptions",
      "setShowMap",
      "setArea"
    ]),
    init() {
      let map = (this.map = new maptalks.Map("map", {
        center: [120.395966, 36.070892],
        zoom: 12,
        maxZoom: 17,
        // minZoom: 7,
        pitch: 0,
        bearing: 180,
        overviewControl: true,
        centerCross: true,
        baseLayer: new maptalks.TileLayer("tile", {
          // urlTemplate: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          urlTemplate: window.VUE_APP_mapURL + "/alllayers/{z}/{y}/{x}.png",
          subdomains: ["a", "b", "c"]
          // cssFilter: "sepia(100%) invert(70%)"
          // cssFilter : 'sepia(100%) invert(0%) grayscale(0%) hue-rotate(0%) opacity(0%) saturate(0%)'
        })
      }));
      let extent = new maptalks.Extent(119.5, 37.2, 121.6, 35.5);
      map.setMaxExtent(extent);
      map.animateTo(
        {
          center: [120.395966, 36.070892],
          zoom: 14,
          pitch: 0,
          pitch: 30,
          bearing: 50
          // bearing: 0
        },
        {
          duration: 3000
        }
      );
      let time = setTimeout(() => {
        map.animateTo(
          {
            center: [120.345966, 36.080892],
            zoom: 15,
            pitch: 50,
            bearing: 0
            // pitch: 0
          },
          {
            duration: 3000
          }
        );
        clearTimeout(time);
      }, 3000);
    },
    // 添加three图层
    AddBuilding(gl, scene, camera) {
      let color1 = "#fff";
      let color2 = "#f33";
      let scale = 1 / 123;
      // let scale = 1 / 125;
      let rotation = Math.PI;
      let mat1 = new THREE.MeshPhongMaterial({
        color: color1,
        transparent: true,
        side: THREE.DoubleSide, //两面可见
        opacity: 0.3
      });
      let mat2 = new THREE.MeshPhongMaterial({
        color: color2,
        transparent: true,
        side: THREE.DoubleSide, //两面可见
        opacity: 0.3
      });
      let Coordinate = this.threeLayer.coordinateToVector3(
        new maptalks.Coordinate(120.3188148523, 36.0738378339)
        //  new maptalks.Coordinate(120.3178148523, 36.0735378339)
      );
      let position = [Coordinate.x, Coordinate.y, 0.1];
      let groupNan = (this.groupNan = new THREE.Group());
      groupNan.name = "市南区建筑";
      let groupBei = (this.groupBei = new THREE.Group());
      groupBei.name = "市北区建筑";

      let loader = new STLLoader();
      loader.load(window.VUE_APP_mapURL + "/stl/nanqu.stl", function(geo) {
        let mesh = new THREE.Mesh(geo, mat1);
        mesh.name = "南区";
        mesh.rotation.set(0, rotation, 0);
        mesh.scale.set(scale, scale, scale * 2);
        mesh.position.set(...position);
        mesh.castShadow = true;
        groupNan.add(mesh);
        scene.add(groupNan);
      });
      loader.load(window.VUE_APP_mapURL + "/stl/beiqu.stl", function(geo) {
        let mesh = new THREE.Mesh(geo, mat1);
        mesh.name = "北区";
        mesh.rotation.set(0, rotation, 0);
        mesh.scale.set(scale, scale, scale * 2);
        mesh.position.set(...position);
        mesh.castShadow = true;
        groupBei.add(mesh);
        scene.add(groupBei);
      });
      loader.load(
        window.VUE_APP_mapURL + "/stl/aofangzhongxin_aoyunwuhuan.stl",
        function(geo) {
          let mesh = new THREE.Mesh(geo, mat2);
          mesh.name = "奥运五环";
          // mesh.rotation.set(0, rotation, 0);
          mesh.scale.set(scale, scale, scale);
          mesh.position.set(...position);
          groupNan.add(mesh);
          scene.add(groupNan);
        }
      );
      loader.load(
        window.VUE_APP_mapURL + "/stl/aofangzhongxin_huiyizhongxin.stl",
        function(geo) {
          let mesh = new THREE.Mesh(geo, mat2);
          mesh.name = "会议中心";
          // mesh.rotation.set(0, rotation, 0);
          mesh.scale.set(scale, scale, scale);
          mesh.position.set(...position);
          groupNan.add(mesh);
          scene.add(groupNan);
        }
      );
      loader.load(
        window.VUE_APP_mapURL + "/stl/aofangzhongxin_huoju.stl",
        function(geo) {
          let mesh = new THREE.Mesh(geo, mat2);
          mesh.name = "火炬";
          // mesh.rotation.set(0, rotation, 0);
          mesh.scale.set(scale, scale, scale);
          mesh.position.set(...position);
          groupNan.add(mesh);
          scene.add(groupNan);
        }
      );
      loader.load(
        window.VUE_APP_mapURL + "/stl/xiaoqingdao_dengta.stl",
        function(geo) {
          let mesh = new THREE.Mesh(geo, mat2);
          mesh.name = "灯塔";
          // mesh.rotation.set(0, rotation, 0);
          mesh.scale.set(scale, scale, scale);
          mesh.position.set(...position);
          groupNan.add(mesh);
          scene.add(groupNan);
        }
      );
      loader.load(window.VUE_APP_mapURL + "/stl/qinnv.stl", function(geo) {
        let mesh = new THREE.Mesh(geo, mat2);
        mesh.name = "";
        // mesh.rotation.set(0, rotation, 0);
        mesh.scale.set(scale, scale, scale);
        mesh.position.set(...position);
        groupNan.add(mesh);
        scene.add(groupNan);
      });
      loader.load(window.VUE_APP_mapURL + "/stl/wusiguangchang.stl", function(
        geo
      ) {
        let mesh = new THREE.Mesh(geo, mat2);
        mesh.name = "五四广场";
        // mesh.rotation.set(0, rotation, 0);
        mesh.scale.set(scale, scale, scale);
        mesh.position.set(...position);
        groupNan.add(mesh);
        scene.add(groupNan);
      });
      loader.load(window.VUE_APP_mapURL + "/stl/zhanqiao.stl", function(geo) {
        let mesh = new THREE.Mesh(geo, mat2);
        mesh.name = "展桥";
        // mesh.rotation.set(0, rotation, 0);
        mesh.scale.set(scale, scale, scale);
        mesh.position.set(...position);
        groupNan.add(mesh);
        mesh.castShadow = true;
        scene.add(groupNan);
      });
    },
    // 添加three图层
    AddThreeLayer() {
      let that = this;
      if (this.threeLayer) {
        this.threeLayer.remove();
        this.threeLayer = null;
        return false;
      } else {
        var threeLayer = (this.threeLayer = new maptalksTHREE.ThreeLayer(
          "three",
          {
            forceRenderOnMoving: true,
            forceRenderOnRotating: true,
            animation: true
          }
        ).addTo(this.map));
        threeLayer.prepareToDraw = (gl, scene, camera) => {
          /**
           * 创建网格模型
           */
          // var geometry = new THREE.BoxGeometry(40, 40, 40); //创建一个立方体几何对象Geometry
          // var material = new THREE.MeshLambertMaterial({
          //     side: THREE.DoubleSide, //两面可见
          //   color: 0x0000ff
          // }); //材质对象Material
          // var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
          // scene.add(mesh); //网格模型添加到场景中
          // // 设置产生投影的网格模型
          // mesh.castShadow = true;
          // mesh.position.set(0,0,0)

          // //创建一个平面几何体作为投影面
          // var planeGeometry = new THREE.PlaneGeometry(300, 200);
          // var planeMaterial = new THREE.MeshLambertMaterial({
          //   color: 0x990000
          // }); //材质对象Material

          // // 平面网格模型作为投影面
          // var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial); //网格模型对象Mesh
          // scene.add(planeMesh); //网格模型添加到场景中
          // planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
          // // planeMesh.position.y = -50; //设置网格模型y坐标
          // // 设置接收阴影的投影面
          // planeMesh.receiveShadow = true;

          // let otherArr = [
          // new THREE.Vector2(-150, 150),
          // new THREE.Vector2(150, 150),
          // new THREE.Vector2(150, -150),
          // new THREE.Vector2(-150, -150),
          // new THREE.Vector2(-150, 150),
          //   ]
          //   let otherShape = new THREE.Shape(otherArr);
          //   let otherGeometry = new THREE.ExtrudeGeometry(otherShape, {
          //     //拉伸造型
          //     amount: 10, //拉伸长度
          //             bevelEnabled: false, //无倒角
          //   });
          //   let otherMaterial = new THREE.MeshLambertMaterial({
          //     color: "#666",
          //     // color: "#fff",
          //     side: THREE.DoubleSide, //两面可见
          //     transparent: true,
          //     opacity: 0.5
          //   });
          //   let planeMesh = new THREE.Mesh(otherGeometry, otherMaterial);

          // scene.add(planeMesh); //网格模型添加到场景中
          // // planeMesh.position.y = -50; //设置网格模型y坐标
          // // 设置接收阴影的投影面
          // planeMesh.receiveShadow = true;

          // console.log(planeMesh)

          this.scene = scene;
          this.camera = camera;
          let group = this.addQdArea(gl, scene, camera);
          let other = this.addOtherArea(gl, scene, camera);
          this.AddBuilding(gl, scene, camera);
          // 添加光源
          let light = new THREE.DirectionalLight(0xffffff, 1);
          light.position.set(-800, -800, -1000).normalize();
          // light.position.set(-8000, 2000, -1000).normalize();
          light.castShadow = true;
          light.shadow.camera.near = 1;
          light.shadow.camera.far = 2000;
          light.shadow.camera.left = 50;
          light.shadow.camera.right = -50;
          light.shadow.camera.top = -50;
          light.shadow.camera.bottom = 50;

          scene.add(light);
          gl.shadowMap.enabled = true;
          // 光源辅助显示
          var spotLightHelper = new THREE.DirectionalLightHelper(light);
          scene.add(spotLightHelper);
          //环境光
          var ambient = new THREE.AmbientLight("#999");
          scene.add(ambient);
          var axisHelper = new THREE.AxesHelper(25000);
          scene.add(axisHelper);
        };
      }
    },
    // three鼠标点击事件
    threeClickEvent() {
      let dom = document.getElementById("map");
      let that = this;
      dom.addEventListener("click", function(event) {
        event.preventDefault();
        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2();
        mouse.x = (event.offsetX / dom.offsetWidth) * 2 - 1;
        mouse.y = -(event.offsetY / dom.offsetHeight) * 2 + 1;
        let objects = [];
        let MeshArr = [];
        that.threeLayer.getScene().traverse(function(obj) {
          if (obj.type === "Mesh") {
            MeshArr.push(obj);
          }
        });

        MeshArr.forEach(child => {
          if (child instanceof THREE.Mesh) {
            objects.push(child);
          }
        });
        raycaster.setFromCamera(mouse, that.threeLayer.getCamera());
        var intersects = raycaster.intersectObjects(objects);
        if (intersects.length > 0) {
          let object = intersects[0].object;
          that.AddClickThree(object);
        }
      });
    },
    reset() {
      if (this.obj) {
        this.obj.Mesh.scale.set(1, 1, 1);
        this.obj.Mesh.material[0].color = this.obj.color0;
        this.obj.Mesh.material[1].color = this.obj.color1;
        this.obj.Mesh.material[0].opacity = this.obj.opacity0;
        this.obj.Mesh.material[1].opacity = this.obj.opacity1;
        this.obj = null;
      }
      if (this.groupNan) {
        this.groupNan.position.set(0, 0, -5);
      }
      if (this.groupBei) {
        this.groupBei.position.set(0, 0, -5);
      }
      if (this.echartsUI) {
        this.echartsUI.remove();
        this.echartsUI = null;
      }
      if (this.lineLayer1) {
        this.lineLayer1.remove();
        this.lineLayer1 = null;
      }
      if (this.echartsUILine) {
        this.echartsUILine.remove();
        this.echartsUILine = null;
      }
      if (this.lineLayer2) {
        this.lineLayer2.remove();
        this.lineLayer2 = null;
      }
    },
    AddClickThree(object) {
      let diqu = [];
      for (let i in this.diqu) {
        diqu.push(i);
      }
      if (diqu.indexOf(object.name) !== -1) {
        // this.scaleArea(object);
        this.setArea(this.diqu[object.name]);
      }
    },
    // 区域提升
    scaleArea(Mesh) {
      if (this.xxkxx && this.xxkxx.length > 0) {
        this.xxkxx.forEach(item => {
          if (item.ORG_NAME === Mesh.name) {
            let headData = {};
            headData.name = item.ORG_NAME;
            headData.rk = item.RKSL;
            headData.bxgd = item.MWHBXGDSL;
            headData.rx12345 = item.RXGDSL;
            headData.ykgd = item.YKGDSL;
            headData.clw = item.CLWGDSL;
            this.headData = headData;
          }
        });
      }
      this.reset();
      let areaData = {};
      window.area.forEach(item => {
        areaData[item.name] = item;
      });
      let name = Mesh.name;
      let position = areaData[name].position;
      this.map.animateTo(
        {
          center: [position[0] + 0.01, position[1] + 0.01],
          zoom: 14,
          // pitch: 0,
          pitch: 45,
          bearing: 0
        },
        {
          duration: 1000
        },
        frame => {
          if (frame.state.playState === "finished") {
            let color0 = Mesh.material[0].color;
            let color1 = Mesh.material[1].color;
            let opacity0 = Mesh.material[0].opacity;
            let opacity1 = Mesh.material[1].opacity;
            let scale = [1, 1, 20];
            let opstion = [0, 0, 20 * 0.1];
            Mesh.scale.set(...scale);
            Mesh.material[0].color = {
              r: 0.1,
              g: 0.1,
              b: 0.1
            };
            Mesh.material[0].opacity = 0.1;
            Mesh.material[1].color = {
              r: 0.3,
              g: 0.3,
              b: 0.3
            };
            Mesh.material[1].opacity = 0.9;
            this.obj = {
              Mesh,
              scale: scale[2],
              color0,
              color1,
              opacity0,
              opacity1
            };
            let mixerPosition = null;

            if (Mesh.name === "市南区" || Mesh.name === "市北区") {
              let group;
              if (Mesh.name === "市南区") {
                group = this.groupNan;
              }
              if (Mesh.name === "市北区") {
                group = this.groupBei;
              }

              group.position.set(...opstion);
              // 动画
              // let positionTrack = new THREE.KeyframeTrack(
              //   ".position",
              //   [0, 10],
              //   [0, 0, 0, ...opstion]
              // );
              // let clipPosition = new THREE.AnimationClip("position", 10, [
              //   positionTrack
              // ]);
              // mixerPosition = new THREE.AnimationMixer(group);
              // let AnimationPosition = mixerPosition.clipAction(clipPosition);
              // // 通过操作Action设置播放方式
              // AnimationPosition.timeScale = 10000; //默认1，可以调节播放速度
              // AnimationPosition.loop = THREE.LoopOnce; //不循环播放
              // AnimationPosition.play(); //开始播放
            }
            // 动画
            let scaleTrack = new THREE.KeyframeTrack(
              ".scale",
              [0, 2],
              [1, 1, 1, ...scale]
            );
            let clip = new THREE.AnimationClip("default", 2, [scaleTrack]);
            let mixer = new THREE.AnimationMixer(Mesh);
            // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
            let AnimationAction = mixer.clipAction(clip);
            // 通过操作Action设置播放方式
            AnimationAction.timeScale = 1; //默认1，可以调节播放速度
            AnimationAction.loop = THREE.LoopOnce; //不循环播放
            AnimationAction.play(); //开始播放
            // 添加图表
            this.addInfo(areaData[name]);
            // 动画end
            let clock = new THREE.Clock();
            let render = () => {
              this.threeLayer.renderScene();
              // if (mixerPosition) {
              //   mixerPosition.update(clock.getDelta());
              // }
              if (mixer&&mixer.time<=20) {
                mixer.update(clock.getDelta());
                requestAnimationFrame(render);
              }
            };
            render();
          }
        }
      );
    },
    closeInfoWindow() {
      if (this.lineLayer) {
        this.lineLayer.remove();
        this.lineLayer = null;
      }
      if (this.markerDom) {
        this.markerDom.remove();
        this.markerDom = null;
      }
      if (this.startDom) {
        this.startDom.remove();
        this.startDom = null;
      }
    },
    //信息框
    InfoWindow(marker) {
      this.closeInfoWindow();
      let point = marker.target._coordinates;
      let altitude = marker.target.properties.altitude;
      let x = point.x;
      let y = point.y;
      var lineLayer = (this.lineLayer = new maptalks.VectorLayer("line", {
        enableAltitude: true
      }).addTo(this.map));
      var dom = document.createElement("div");
      var domMark = document.createElement("div");
      // let startDom = (this.startDom = new maptalks.ui.UIMarker([x, y+1], {
      //   content: dom
      // })
      //   .addTo(this.map)
      //   .show());

      domMark.innerHTML = ` <div class='gf-container'>
          <div class='gf-head startbox'>光伏一</div>
          <div class='gf-bottom'>
           <div class='betweenbox gf-inner-item1'>
            <div>接线点：</div>
            <div>青岛第六接线点</div>
          </div>
          <div>
            <div class='betweenbox bottom-inner'>
              <div class='green'>
                 装机容量
              </div>
              <div class='betweenbox value'>
                <span>7689</span>
                <span>个</span>
               </div>
             </div>
            <div class='betweenbox bottom-inner'>
              <div class='green'>
                 本月发电量
              </div>
              <div class='betweenbox value'>
                <span>79</span>
                <span>度</span>
               </div>
             </div>
          </div>
         
          </div>
        </div>`;
      let markerDom = (this.markerDom = new maptalks.ui.UIMarker(
        [x + 1, y + 1],
        {
          draggable: true,
          content: domMark
        }
      )
        .addTo(this.map)
        .show());
      let line1 = new maptalks.ConnectorLine(marker.target, markerDom, {
        showOn: "always",
        symbol: {
          lineDasharray: [20, 5],
          lineColor: "#0091FF",
          // arcDegree: 60,
          "lineOpacity ": 0.8,
          lineWidth: 2
        }
      }).hide();
      // let line2 = new maptalks.ConnectorLine(startDom, markerDom, {
      //   showOn: "always",
      //   symbol: {
      //     // lineDasharray: [20, 5],
      //     lineColor: "#0091FF",
      //     // arcDegree: 60,
      //     "lineOpacity ": 0.8,
      //     lineWidth: 2
      //   }
      // }).hide();

      lineLayer.addGeometry(line1);
      line1.animateShow(
        {
          duration: 300,
          easing: "linear"
        },
        function(frame) {
          if (frame.state.playState === "finished") {
          }
        }
      );
      return false;
    },
    // 添加区域详情
    addInfo(obj) {
      this.addGfMark(obj.position);
      this.addEchart(obj.position, obj.qxgd);
      this.addLineEchart(obj.position, obj.tsgd);
    },
    //添加光伏标签
    addGfMark(arr) {
      let pointArr = new Point([arr]);
      if (this.layerE3) {
        this.layerE3.remove();
        this.layerE3 = null;
      }
      let layerE3 = (this.layerE3 = new maptalksE3.E3Layer("e3", {}).addTo(
        this.map
      ));
      this.layerE3.setEChartsOption(pointArr.option);
    },
    // 添加图表
    async addEchart(position, data) {
      // 获取抢修工单数据
      let options = this.options;
      options.orgNo = this.diqu[this.headData.name];
      this.setOptions(options);
      let res = await api.get95598Data(options);
      let dtqxgdydfb = res.items;
      let xData = [];
      let dnData = [];
      let qnData = [];
      if (dtqxgdydfb && dtqxgdydfb.length > 0) {
        xData = dtqxgdydfb.map(item => item.MONS);
        dnData = dtqxgdydfb.map(item => item.DNGDSL);
        qnData = dtqxgdydfb.map(item => item.QNGDSL);
      } else {
        xData = [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ];
        dnData = [0];
        qnData = [0];
      }
      let chartDom = document.createElement("div");
      chartDom.style.cssText =
        "width:1100px; height:450px;background:rgba(0,5,0,0.6);border:2px solid #fff; box-shadow: 0 0 50px #60a4f4 inset;";
      let myChart = echarts.init(chartDom);
      let option = {
        grid: {
          containLabel: true,
          left: 100,
          right: 20,
          top: 100,
          bottom: 20
        },
        legend: {
          itemWidth: 36,
          itemHeight: 24,
          top: 20,
          textStyle: {
            fontSize: 30,
            color: "#FFFFFF"
          },
          data: ["今年", "去年"]
        },
        title: {
          text: `{a|抢\n\n修\n\n工\n\n单}`,
          padding: [20, 10],
          left: 20,
          top: 80,
          backgroundColor: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              { offset: 0, color: "rgba(32,198,99, 0.9)" },
              { offset: 1, color: "rgba(32,198,99, 0.1)" }
            ],
            false
          ),
          textStyle: {
            width: 30,
            height: 200,
            textShadowColor: "#76C4C6",
            textShadowBlur: 2,
            textShadowOffsetX: 2,
            textShadowOffsetY: 2,
            rich: {
              a: {
                color: "#86f4f6",
                fontSize: 30
              }
            }
          }
        },
        tooltip: {
          show: true,
          trigger: "axis",
          padding: 2,
          textStyle: {
            fontSize: 26
          },
          formatter: function(params) {
            let html = "";
            let tol1 = "";
            let tol2 = "";

            let head = `<div class='echarttitle'><span  class='iconfont  icon-zongshu  mytubiao'></span> ${
              params[0].name
            }月</div>`;

            if (params[0].value) {
              tol1 = `<div class='betweenbox'><div><span style="color:#1371DC;" class='iconfont icon--tubiao mytubiao'></span>今年：</div><div>${
                params[0].value
              }</div></div>`;
            }
            if (params[1].value) {
              tol2 = `<div class='betweenbox'><div><span style="color:#26B861;" class='iconfont icon--tubiao mytubiao'></span>去年：</div><div>${
                params[1].value
              }</div></div>`;
            }

            html += head;
            html += tol1;
            html += tol2;
            return `<div class="tooltip-container">${html}</div>`;
          }
        },
        xAxis: {
          data: xData,
          axisLine: {
            lineStyle: {
              color: "#76C4C6"
            }
          },
          axisLabel: {
            color: "#76C4C6",
            fontSize: 22
          }
        },
        yAxis: {
          nameTextStyle: {
            color: "#76C4C6",
            fontSize: 22
          },
          axisLine: {
            lineStyle: {
              color: "#76C4C6"
            }
          },
          axisLabel: {
            color: "#76C4C6",
            fontSize: 26
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#76C4C6",
              type: "dashed"
            }
          }
        },
        series: [
          {
            type: "bar",
            barWidth: 24,
            name: "今年",
            label: {
              show: true,
              position: "top",
              fontSize: 26,
              color: "#fff"
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(19,114,222,0.9)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(19,114,222,0.1)"
                    }
                  ],
                  false
                )
              }
            },
            data: dnData
          },
          {
            type: "bar",
            name: "去年",
            barWidth: 24,
            label: {
              show: true,
              position: "top",
              fontSize: 26,
              color: "#fff"
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(32,198,99,0.9)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(32,198,99,0.1)"
                    }
                  ],
                  false
                )
              }
            },
            data: qnData
          }
        ]
      };

      myChart.setOption(option);
      if (this.echartsUI) {
        this.echartsUI.remove();
        this.echartsUI = null;
      }
      let echartsUI = (this.echartsUI = new maptalks.ui.UIMarker(
        [position[0] + 0.086, position[1] + 0.071],
        {
          draggable: true,
          content: chartDom
        }
      )
        .addTo(this.map)
        .show());
      let marker = new maptalks.Marker(position);
      let line = new maptalks.ConnectorLine(marker, echartsUI, {
        showOn: "always",
        // arrowStyle: [2, 4],
        // arrowPlacement: "vertex-last",
        symbol: {
          lineDasharray: [20, 5],
          lineColor: "#00D280",
          // arcDegree: 60,
          "lineOpacity ": 0.8,
          lineWidth: 4,
          markerFile: martkerIcon,
          markerPlacement: "vertex", //vertex, point, vertex-first, vertex-last, center
          markerVerticalAlignment: "middle",
          markerWidth: 60,
          markerHeight: 60
        }
      }).hide();
      if (this.lineLayer1) {
        this.lineLayer1.remove();
        this.lineLayer1 = null;
      }
      var lineLayer1 = (this.lineLayer1 = new maptalks.VectorLayer("line1", {
        enableAltitude: true
      }).addTo(this.map));
      lineLayer1.addGeometry(line);
      line.animateShow(
        {
          duration: 1000,
          easing: "linear"
        },
        function(frame) {
          if (frame.state.playState === "finished") {
          }
        }
      );
    },
    // 添加图表
    async addLineEchart(position, data) {
      // 获取抢修工单数据
      let options = this.tsOptions;
      options.orgNo = this.diqu[this.headData.name];
      this.setTsOptions(options);
      let res = await api.get95598Data(options);
      let dttsgdydfb = res.items;
      let xData = [];
      let dnData = [];
      let qnData = [];
      if (dttsgdydfb && dttsgdydfb.length > 0) {
        xData = dttsgdydfb.map(item => item.MONS);
        dnData = dttsgdydfb.map(item => item.DNGDSL);
        qnData = dttsgdydfb.map(item => item.QNGDSL);
      } else {
        xData = [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ];
        dnData = [0];
        qnData = [0];
      }
      let chartDom = document.createElement("div");
      chartDom.style.cssText =
        "width:1100px; height:450px;background:rgba(0,5,0,0.6);border:2px solid #fff; box-shadow: 0 0 50px #60a4f4 inset;";
      let myChart = echarts.init(chartDom);
      let option = {
        color: ["#76C6C7", "#2874ce", "#1afa29"],
        grid: {
          containLabel: true,
          left: 100,
          right: 20,
          top: 100,
          bottom: 20
        },
        legend: {
          itemWidth: 36,
          itemHeight: 24,
          top: 20,
          textStyle: {
            fontSize: 30,
            color: "#FFFFFF"
          },
          data: ["今年", "去年"]
        },
        title: {
          text: `{a|投\n\n诉\n\n工\n\n单}`,
          padding: [20, 10],
          left: 20,
          top: 80,
          backgroundColor: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              { offset: 0, color: "rgba(32,198,99, 0.9)" },
              { offset: 1, color: "rgba(32,198,99, 0.1)" }
            ],
            false
          ),
          textStyle: {
            width: 30,
            height: 400,
            textShadowColor: "#76C4C6",
            textShadowBlur: 2,
            textShadowOffsetX: 2,
            textShadowOffsetY: 2,
            rich: {
              a: {
                color: "#86f4f6",
                fontSize: 30
              }
            }
          }
        },
        tooltip: {
          show: true,
          trigger: "axis",
          padding: 2,
          textStyle: {
            fontSize: 26
          },
          formatter: function(params) {
            let html = "";
            let tol1 = "";
            let tol2 = "";

            let head = `<div class='echarttitle'><span  class='iconfont  icon-zongshu  mytubiao'></span> ${
              params[0].name
            }月</div>`;

            if (params[0] && params[0].value) {
              tol1 = `<div class='betweenbox'><div><span style="color:#26B861;" class='iconfont icon--tubiao mytubiao'></span>去年：</div><div>${
                params[0].value
              }</div></div>`;
            }
            if (params[1] && params[1].value) {
              tol2 = `<div class='betweenbox'><div><span style="color:#1371DC;" class='iconfont icon--tubiao mytubiao'></span>今年：</div><div>${
                params[1].value
              }</div></div>`;
            }

            html += head;
            html += tol1;
            html += tol2;
            return `<div class="tooltip-container">${html}</div>`;
          }
        },

        xAxis: {
          boundaryGap: false,
          data: xData,
          axisLine: {
            lineStyle: {
              color: "#76C4C6"
            }
          },
          axisLabel: {
            color: "#76C4C6",
            fontSize: 22
          }
        },
        yAxis: {
          nameTextStyle: {
            color: "#76C4C6",
            fontSize: 26
          },
          axisLine: {
            lineStyle: {
              color: "#76C4C6"
            }
          },
          axisLabel: {
            color: "#76C4C6",
            fontSize: 22
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#76C4C6",
              type: "dashed"
            }
          }
        },
        series: [
          {
            type: "line",
            stack: "line",
            name: "去年",
            smooth: true,
            symbolSize: 10,
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 30
              }
            },
            areaStyle: {
              // 区域填充样式
              normal: {
                // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: "rgba(32,198,99, 0.9)" },
                    { offset: 0.9, color: "rgba(32,198,99, 0)" }
                  ],
                  false
                ),

                shadowColor: "rgba(32,198,99, 0.9)", // 阴影颜色
                shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: qnData
          },
          {
            type: "line",
            stack: "line",
            name: "今年",
            smooth: true,
            symbolSize: 10,
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 30
              }
            },
            itemStyle: {
              color: "rgba(19,114,222, 1)"
            },
            areaStyle: {
              // 区域填充样式
              normal: {
                // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: "rgba(19,114,222, 0.9)" },
                    { offset: 0.9, color: "rgba(19,114,222, 0.1)" }
                  ],
                  false
                ),

                shadowColor: "rgba(19,114,222, 0.9)", // 阴影颜色
                shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: dnData
          }
        ]
      };
      myChart.setOption(option);
      if (this.echartsUILine) {
        this.echartsUILine.remove();
        this.echartsUILine = null;
      }
      let echartsUILine = (this.echartsUILine = new maptalks.ui.UIMarker(
        [position[0] + 0.0695, position[1] + 0.011],
        {
          draggable: true,
          content: chartDom
        }
      )
        .addTo(this.map)
        .show());
      let marker = new maptalks.Marker(position);
      let line = new maptalks.ConnectorLine(marker, echartsUILine, {
        showOn: "always",
        // arrowStyle: [2, 4],
        // arrowPlacement: "vertex-last",
        symbol: {
          lineDasharray: [20, 5],
          lineColor: "#00D280",
          // arcDegree: 60,
          "lineOpacity ": 0.8,
          lineWidth: 4,
          markerFile: martkerIcon,
          markerPlacement: "vertex", //vertex, point, vertex-first, vertex-last, center
          markerVerticalAlignment: "middle",
          markerWidth: 60,
          markerHeight: 60
        }
      }).hide();
      if (this.lineLayer2) {
        this.lineLayer2.remove();
        this.lineLayer2 = null;
      }
      var lineLayer2 = (this.lineLayer2 = new maptalks.VectorLayer("line2", {
        enableAltitude: true
      }).addTo(this.map));
      lineLayer2.addGeometry(line);
      line.animateShow(
        {
          duration: 1000,
          easing: "linear"
        },
        function(frame) {
          if (frame.state.playState === "finished") {
          }
        }
      );
    },
    // 添加地区外阴影
    addOtherArea(gl, scene, camera) {
      let otherArr = [
        [115, 45],
        [125, 45],
        [125, 30],
        [115, 30],
        [115, 45]
      ].map(v => {
        let item = this.threeLayer.coordinateToVector3(
          new maptalks.Coordinate(v[0], v[1])
        );
        return item;
      });
      let otherShape = new THREE.Shape(otherArr);
      let otherGeometry = new THREE.ExtrudeGeometry(otherShape, {
        //拉伸造型
        depth: 0.05,
        bevelEnabled: false //无倒角
      });
      let otherMaterial = new THREE.MeshLambertMaterial({
        color: "#334",
        // color: "#fff",
        side: THREE.DoubleSide, //两面可见
        transparent: true,
        opacity: 0.3
      });
      let otherMesh = new THREE.Mesh(otherGeometry, otherMaterial);
      otherMesh.receiveShadow = true;
      scene.add(otherMesh);
      return otherMesh;
    },

    // 添加地区
    addQdArea(gl, scene, camera) {
      let color = [
        `#${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(Math.random() * 9)}`,
        `#${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(Math.random() * 9)}`,
        `#${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(Math.random() * 9)}`,
        `#${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(Math.random() * 9)}`,
        `#${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(Math.random() * 9)}`,
        `#${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(Math.random() * 9)}`,
        `#${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(Math.random() * 9)}`,
        `#${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(Math.random() * 9)}`,
        `#${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(Math.random() * 9)}`,
        `#${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(Math.random() * 9)}`,
        `#${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(Math.random() * 9)}`,
        `#${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(
          Math.random() * 9
        )}${parseInt(Math.random() * 9)}${parseInt(Math.random() * 9)}`
      ];

      let group = new THREE.Group();
      qd.features.forEach((item, i) => {
        let quyu = [];
        item.geometry.coordinates.forEach(val => {
          let quyuItem = [];
          val.forEach(value => {
            value.forEach(v => {
              let cor = this.threeLayer.coordinateToVector3(
                new maptalks.Coordinate(v[0], v[1])
              );
              quyuItem.push(cor);
            });
          });
          // 样条曲线生成更多的点
          let SplineCurve = new THREE.SplineCurve(quyuItem);
          let shape = new THREE.Shape(SplineCurve.getPoints(300));
          // var geometry = new THREE.ShapeGeometry(shape);
          // let shape = new THREE.Shape(quyuItem);
          quyu.push(shape);
        });
        let geometry = new THREE.ExtrudeGeometry( //拉伸造型
          quyu, //二维轮廓
          //拉伸参数
          {
            depth: 0.1, //拉伸长度
            bevelEnabled: false //无倒角
          }
        );
        let material = new THREE.MeshBasicMaterial({
          // color: color[i],
          color: "#556",
          transparent: true,
          side: THREE.DoubleSide, //两面可见
          opacity: 0.8
        });
        let materialArea = new THREE.MeshStandardMaterial({
          // color: color[i],
          color: "#556",
          transparent: true,
          side: THREE.DoubleSide, //两面可见
          opacity: 0.3
        });
        let mesh = new THREE.Mesh(geometry, [materialArea, material]);
        mesh.name = item.properties.name;
        mesh.castShadow = true;
        group.add(mesh);
      });

      scene.add(group);
      return group;
    },
    // 返回gis
    goGis() {
      this.setShowMap("gis");
      this.reset();
      this.setArea(null);
    }
  }
};
</script>

<style lang="scss" scoped>
.secondmap {
  width: 2652px;
  height: 1492px;
  transform: scale(2);
  transform-origin: 50% 50%;
  position: relative;
  // width:100%;
  // height: 100%;
  .mapInfo {
    position: absolute;
    top: 50px;
    left: 20px;
    height: 280px;
    // height: 380px;
    border: 2px solid hsl(199, 31%, 43%);
    background: rgba(0, 0, 0, 0.6);
    font-size: 36px;
    padding: 20px;
    color: #fff;
    .infoInner {
      width: 360px;
      height: 100%;
      padding: 0px 20px;
      box-sizing: border-box;
      .quyuicon {
        margin: 0px 10px;
        font-size: 88px;
        color: #eafafa;
      }
      .quyutitle {
        font-size: 48px;
        color: #eafafa;
      }
      .icon-box {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin: 8px;
      }

      > div {
        width: 100%;
        height: 50%;
        .title {
          color: #fff;
          font-size: 30px;
        }
        .iconsize {
          margin: 0px 10px;
          font-size: 50px;
        }
        .danwei {
          color: #fff;
          margin: 0px 10px 0px 50px;
          font-size: 24px;
        }
        .number {
          font-weight: 800;
          font-size: 60px;
          font-family: digitfont;
        }
      }
    }
    .quyu{
      width:260px;
    }
    .color1 {
      color: #23e7ad;
      .icon-box {
        box-shadow: 0 0 20px #23e7ad inset;
      }
    }
    .color2 {
      color: #1595ff;
      .icon-box {
        box-shadow: 0 0 20px #1595ff inset;
      }
    }
    .color3 {
      color: #ffde00;
      .icon-box {
        box-shadow: 0 0 20px #ffde00 inset;
      }
    }
    .color4 {
      color: #c936c6;
      .icon-box {
        box-shadow: 0 0 20px #c936c6 inset;
      }
    }
    .color5 {
      color: #f2765d;
      .icon-box {
        box-shadow: 0 0 20px #f2765d inset;
      }
    }
    .border {
      width: 4px;
      height: 120px;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2),
        #1fc162,
        rgba(0, 0, 0, 0.2)
      );
    }
    .border1 {
      margin:0px 40px;
      width: 4px;
      height: 240px;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2),
        #1fc162,
        rgba(0, 0, 0, 0.2)
      );
    }
    .hr {
      width: 600px;
      height: 2px;
      margin: 20px 0px;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.2) 0%,
        #1fc162 10%,
        #1fc162 90%,
        rgba(0, 0, 0, 0.2) 100%
      );
    }
  }
  #map {
    width: 2652px;
    height: 1492px;
  }
  .back {
    z-index: 2;
    cursor: pointer;
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 60px;
    height: 50px;
    // width: 240px;
    padding: 8px 20px;
    background: rgba(31, 193, 98, 0.7);
    border-radius: 10px;
    color: #fff;
    .backfont {
      font-size: 42px;
      margin: 10px;
      color: #fff;
    }
  }
}
</style>
<style lang="scss">
.secondmap {
  .tooltip-container {
    background: rgba(58, 53, 144, 0.9);
    padding: 6px 20px;
    .echarttitle {
      font-size: 30px;
      border-bottom: 2px solid #1376eb;
    }
    .mytubiao {
      font-size: 36px;
    }
  }
  .gf-container {
    width: 300px;
    background: #fff;
    padding: 2px;
    border-radius: 4px;
    .gf-head {
      background: #000;
      color: #0cc9e2;
      padding: 4px 8px;
      font-size: 22px;
      font-weight: 600;
    }
    .gf-bottom {
      background: #6597b2;
      padding: 4px 8px;
      .gf-inner-item1 {
        font-size: 18px;
        padding: 6px 0px;
        border-bottom: 2px solid #34a5ca;
      }
      .bottom-inner {
        margin: 4px auto;
      }
      .green {
        color: #0dc9e0;
      }
      .value {
        width: 100px;
        border: 1px solid #666;
        padding: 4px 10px;
        border-radius: 3px;
      }
    }
  }
}
</style>


