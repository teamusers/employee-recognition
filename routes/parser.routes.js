const express = require('express')
const parserController = require('../api/controllers/parser.controller.js')
const wrap = require('../util/route-wrapper.js')

const parsingRoutes = express.Router();

parsingRoutes.get('/parse', wrap(async (req, res) => parserController.getJson(req, res)));
// parsingRoutes.get('/json2', wrap(async (req, res) => parserController.getJson2(req, res)));


module.exports = parsingRoutes;