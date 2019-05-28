var express = require('express');
var router = express.Router();
const request = require('request')
const io = require('../socket')

/* GET home page. */
router.get('/dyfxyj/fxyj_data/rest/gdData/get95598Data', function (req, res, next) {
  let {
    zblx,
    dataFlag,
    orgNo
  } = req.query
  if (zblx === 'repeat'  && orgNo === '37402') {
    res.json(require('./data/repeat.json'))
  }
  if (zblx === 'gdqsfx'  && orgNo === '37402') {
    res.json(require('./data/gdqsfx.json'))
  }
  if (zblx === 'drgd24dfb'  && orgNo === '37402') {
    res.json(require('./data/drgd24dfb.json'))
  }
  if (zblx === 'drgd24dfb'  && orgNo === '37401') {
    res.json(require('./data/drgd24dfb1.json'))
  }
  if (zblx === 'drgdyy'  && orgNo === '37402') {
    res.json(require('./data/drgdyy.json'))
  }
  if (zblx === 'scfx_xcfl'  && orgNo === '37402') {
    res.json(require('./data/scfx_xcfl.json'))
  }
  if (zblx === 'rxgdlx'  && orgNo === '37402') {
    res.json(require('./data/rxgdlx.json'))
  }
  if (zblx === 'drgdsl'  && orgNo === '37402') {
    res.json(require('./data/drgdsl.json'))
  }
  if (zblx === 'drgdfl'  && orgNo === '37402') {
    res.json(require('./data/drgdfl.json'))
  }
  if (zblx === 'scfx_gzpcsc'  && orgNo === '37402') {
    res.json(require('./data/scfx_gzpcsc.json'))
  }
  if (zblx === 'scfx_hdl'  && orgNo === '37402') {
    res.json(require('./data/scfx_hdl.json'))
  }
  if (zblx === 'scfx_jsl'  && orgNo === '37402') {
    res.json(require('./data/scfx_jsl.json'))
  }
  if (zblx === 'gdclqk'  && orgNo === '37402') {
    res.json(require('./data/gdclqk.json'))
  }
  if (zblx === 'dtqxgdydfb'  && orgNo === '37402') {
    res.json(require('./data/dtqxgdydfb.json'))
  }
  if (zblx === 'dtqxgdydfb'  && orgNo === '370202') {
    res.json(require('./data/dtqxgdydfb1.json'))
  }
  if (zblx === 'dttsgdydfb'  && orgNo === '370202') {
    res.json(require('./data/dttsgdydfb.json'))
  }
  if (zblx === 'jhtd'  && orgNo === '37402') {
    res.json(require('./data/jhtd.json'))
  }
  if (zblx === 'gztd'  && orgNo === '37402') {
    res.json(require('./data/gztd.json'))
  }
  if (zblx === 'gfzlzs'  && orgNo === '37402') {
    res.json(require('./data/gfzlzs.json'))
  }
  if (zblx === 'gfshxy'  && orgNo === '37402') {
    res.json(require('./data/gfshxy.json'))
  }
  if (zblx === 'gfyzzqs'  && orgNo === '37402') {
    res.json(require('./data/gfyzzqs.json'))
  }
  if (zblx === 'rxgdqy'  && orgNo === '37402') {
    res.json(require('./data/rxgdqy.json'))
  }
  if (zblx === 'clwgdlx'  && orgNo === '37402') {
    res.json(require('./data/clwgdlx.json'))
  }
  if (zblx === 'clwgdqy'  && orgNo === '37402') {
    res.json(require('./data/clwgdqy.json'))
  }
  if (zblx === 'gffltj'  && orgNo === '37402') {
    res.json(require('./data/gffltj.json'))
  }
  if (zblx === 'tsgdqy'  && orgNo === '37402') {
    res.json(require('./data/tsgdqy.json'))
  }
  if (zblx === 'tsgdlx'  && orgNo === '37402') {
    res.json(require('./data/tsgdlx.json'))
  }
  if (zblx === 'ykgdlx'  && orgNo === '37402') {
    res.json(require('./data/ykgdlx.json'))
  }
  if (zblx === 'ykdydj'  && orgNo === '37402') {
    res.json(require('./data/ykdydj.json'))
  }
  if (zblx === 'drqxhj'  && orgNo === '37402') {
    res.json(require('./data/drqxhj.json'))
  }
  if (zblx === 'ykgdqy') {
    res.json(require('./data/ykgdqy.json'))
  }
  if (zblx === 'ykgdzt'  && orgNo === '37402') {
    res.json(require('./data/ykgdzt.json'))
  }
  if (zblx === 'xxkxx') {
    res.json(require('./data/xxkxx.json'))
  }
  if (zblx === 'gfqxfb') {
    res.json(require('./data/gfqxfb.json'))
  }


});


module.exports = router;