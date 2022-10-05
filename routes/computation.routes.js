const express = require('express');
const computingController = require('../api/controllers/computation.controller.js');
const wrap = require('../util/route-wrapper.js');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json()

const computingRoutes = express.Router();

// computingRoutes.post('/compute/ipq', wrap(async (req, res) => jsonParser,computingController.computeIPQ(req, res)));
computingRoutes.post('/compute/ipq', jsonParser, wrap(async (req, res) => computingController.computeIPQ(req, res)));

module.exports = computingRoutes;