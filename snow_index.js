
// USE THIS FILE TO REBUILD web_modules and Generate Dependencies for Browser 

import * as THREE from 'three'
import { Interaction } from 'three.interaction'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { gsap } from "gsap";

import { createGraph } from "ngraph.graph";
import { ngraphPath } from "ngraph.path";
import { springForce , dragForce , createBody, bounds, eulerIntegrator } from "ngraph.physics.simulator";
import { ngraphMerge } from "ngraph.merge";
import { forceLayout } from "ngraph.forcelayout";
import { createQuadTree } from "ngraph.quadtreebh";


import { groupBy } from "lodash-es"
//import { createGraph } from '/js/ng.js'
//import { createGraph , createLayout } from 'ngx'

import Stats from 'stats-js'
import $ from 'jquery';
import Terminal from 'xterm';

import VanillaQR from 'vanillaqr';
import { createChart } from 'lightweight-charts';
//import { Glue } from 'gluemasher';
//import { run as runx } from 'gluemasher/glob'
//import { platform } from './x_modules/frame/platform.js'

import 'regenerator-runtime/runtime'

import level from 'level'
import topojson from 'topojson-client'
//topojson = require("topojson-client@3")
//import { ipcRenderer } from 'electron'
//import bn from 'bn.js'

//import Web3 from "web3";
//import Web3Modal from "web3modal";