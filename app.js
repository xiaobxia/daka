const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const cors = require('koa-cors')
const qs = require('qs');
const moment = require('moment')

const router = new Router({
  prefix: `/daka`
});

router.get('/', async function (ctx) {
  ctx.body = 'ok';
});

router.get('/cccc', async function (ctx) {
  ctx.body = 'ok111';
});

router.get('/xiaban', async function (ctx) {
  try {
    const resData = await axios({
      method: 'get',
      url: `http://internali6s.netcall.cc:8081/rest/api/kernelsession?_dc=${new Date().getTime()}&loginid=190401&ucode=0001&devicename=3e30cc8920abdc4b&isapp=1`,
      headers: {
        Host: 'internali6s.netcall.cc:8081',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Redmi K30 Pro Build/QKQ1.191117.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.101 Mobile Safari/537.36'
      }
    }).then((res) => {
      const data = res.data
      const accesstoken= data.accesstoken
      // const refreshtoken= data.refreshtoken
      // const hiscode= data.hiscode
      // const userid= data.userid
      return axios({
        method: 'post',
        url: `http://internali6s.netcall.cc:8081/rest/api/HR/Hr3TimeCheckApp/PostSaveCheck?_dc=${new Date().getTime()}`,
        headers: {
          Host: 'internali6s.netcall.cc:8081',
          Authorization: accesstoken,
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Redmi K30 Pro Build/QKQ1.191117.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.101 Mobile Safari/537.36',
          // 下面这几个headers理论上是不需要的
          appinfo: 'eyJEYk5hbWUiOiJORzAwMDEiLCJPcmdJZCI6IjI1MDE4MDExMTAwMDA0MyIsIk9Db2RlIjoiIiwiT3JnTmFtZSI6IiIsIlVzZXJJZCI6IjU3OTE5MTEyODAwMDAwMyIsIlVzZXJLZXkiOiIiLCJVc2VyTmFtZSI6IiIsIlRva2VuS2V5IjoiIiwiQXBwS2V5IjoiRDMxQjdGOTEtMzA2OC00QTQ5LTkxRUUtRjNFMTNBRTVDNDhDIiwiQXBwU2VjcmV0IjoiMTAzQ0I2MzktODQwQy00RTRGLTg4MTItMjIwRUNFM0M0RTREIiwiRGJTZXJ2ZXJOYW1lIjoiIiwiU2Vzc2lvbktleSI6IiJ9',
          sign: `e12a3082d99e995334ab34cdd3b659ad,http://internali6s.netcall.cc:8081/i6s/,${new Date().getTime()},D31B7F91-3068-4A49-91EE-F3E13AE5C48C`,
          Cookie: 'ASP.NET_SessionId=1xbtq1le2ah1xxv3xaamkfnm; JSESSIONID=dd0kgb8x55lsotqnecpuh4u0'
        },
        data: qs.stringify({
          Ctype: 1,
          // 地址名写死的
          PhidAddress: '579200426000002',
          Address: '',
          // 政云写死的
          PhidEmp: '579191122000002',
          CheckTime: moment().format('YYYY/MM/DD HH:mm:ss'),
          Status: 1,
          Description: '',
          Attachguid: 0,
          DevicePhoneNo: '17681824125'
        })
      }).then((res) => {
        return res.data
      })
    })
    ctx.body = resData
  } catch (err) {
    console.log(err);
  }
});

const app = new Koa();

// 跨域
app.use(cors({
  methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  credentials: true,
  maxAge: 2592000
}))

app.use(router.routes());
const port = 3031;

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
