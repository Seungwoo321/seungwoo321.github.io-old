/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "8f15f9d526e01c2685ac8a221c7c0a3e"
  },
  {
    "url": "about/index.html",
    "revision": "7c26bae9b061f97ca2a842c9cea12952"
  },
  {
    "url": "assets/css/0.styles.20bfd7f2.css",
    "revision": "c0331924c3b4a16e1c2be92513eb2ff5"
  },
  {
    "url": "assets/img/001.e25dfb2a.png",
    "revision": "e25dfb2ac20e49e91a06fb032951a07d"
  },
  {
    "url": "assets/img/002.6f58d56e.png",
    "revision": "6f58d56e8c5e275af145c190a4dc8435"
  },
  {
    "url": "assets/img/003.6a560d87.png",
    "revision": "6a560d871ad9ad82ba8f1be9b9261d47"
  },
  {
    "url": "assets/img/004.26fc72b4.png",
    "revision": "26fc72b44c3056fd233438a205ad67c1"
  },
  {
    "url": "assets/img/005.ac922619.png",
    "revision": "ac922619f33f40aad0020518731a285b"
  },
  {
    "url": "assets/img/006.9873f1e6.png",
    "revision": "9873f1e64d23e8c9aad6c11a3af3e0c7"
  },
  {
    "url": "assets/img/007.c3c42e5f.png",
    "revision": "c3c42e5f453fbf773cf2431f50b50bd9"
  },
  {
    "url": "assets/img/008.309e914c.png",
    "revision": "309e914cfafbcb3ea73f3586d7ca5c35"
  },
  {
    "url": "assets/img/009.dafe0489.png",
    "revision": "dafe04893763a49fde9110ba41b88de6"
  },
  {
    "url": "assets/img/01_sql.6d347f8e.png",
    "revision": "6d347f8e0cfb09df6e9aee020c45a4fc"
  },
  {
    "url": "assets/img/01_trade.848e0ca9.png",
    "revision": "848e0ca95457a078a94273b44ae845aa"
  },
  {
    "url": "assets/img/02_chart.6e0f1104.png",
    "revision": "6e0f110427bb9d483ff4fe6a4f5d4e77"
  },
  {
    "url": "assets/img/02_result.c8fed134.png",
    "revision": "c8fed134b21814d775a3b3afdd358b9c"
  },
  {
    "url": "assets/img/bot2.7b3e8f19.png",
    "revision": "7b3e8f19d61688ca03a23dc6d85f7551"
  },
  {
    "url": "assets/img/high-level-flow.f3a8596f.png",
    "revision": "f3a8596f9b665c62c8807e712ef67471"
  },
  {
    "url": "assets/img/influxdb-01.ea00a921.png",
    "revision": "ea00a921e7c1ce09c996c90d0af9eab7"
  },
  {
    "url": "assets/img/influxdb-02.12b83ef0.png",
    "revision": "12b83ef02de7e1bfd9dd30d41fee58ee"
  },
  {
    "url": "assets/img/influxdb-03.3582945d.png",
    "revision": "3582945dd7a7e49a8186469cf59a0fb6"
  },
  {
    "url": "assets/img/influxdb-04.265e454d.png",
    "revision": "265e454d45016e596e096a03e09c2d70"
  },
  {
    "url": "assets/img/mariadb-01.ac3778e6.png",
    "revision": "ac3778e624a4777c917eef4c18aa03c7"
  },
  {
    "url": "assets/img/mariadb-02.cf1794d3.png",
    "revision": "cf1794d364a3e6ce05dfc38f763eb8cb"
  },
  {
    "url": "assets/img/mariadb-03.4e821e26.png",
    "revision": "4e821e26291888d00e55598913e60542"
  },
  {
    "url": "assets/img/npm-sinopia.aebb7d18.png",
    "revision": "aebb7d1899543772792ab15e77b71c78"
  },
  {
    "url": "assets/img/pass-by-reference-vs-pass-by-value-animation.197a0c5a.gif",
    "revision": "197a0c5aa96302b99b8c1d1178d8a86a"
  },
  {
    "url": "assets/img/profile.e5d753c8.jpeg",
    "revision": "e5d753c83686d667fc909ea7abf5f165"
  },
  {
    "url": "assets/img/profit1.8c88cfca.png",
    "revision": "8c88cfca4da3cb36c12551a9ae12bb89"
  },
  {
    "url": "assets/img/profit2.05c15b57.png",
    "revision": "05c15b576fb18177843f1eddcb4a5936"
  },
  {
    "url": "assets/img/profit3.2858f49d.png",
    "revision": "2858f49d83a7057e30a090f751af5a03"
  },
  {
    "url": "assets/img/redmine_architecture.e46cfcf6.png",
    "revision": "e46cfcf6a383fd6f57aa07f5e8903610"
  },
  {
    "url": "assets/img/result-containers.9b2a9cb8.png",
    "revision": "9b2a9cb8be34b93ba1fc210705c96ed4"
  },
  {
    "url": "assets/img/result-influxdb.4a1649d6.png",
    "revision": "4a1649d6fb26543375d3a37346ab5fa3"
  },
  {
    "url": "assets/img/result-mariadb.bd6f4c78.png",
    "revision": "bd6f4c7811cbb1881a1ffdb1d55f3c3b"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/stochastic.a17f52bd.png",
    "revision": "a17f52bdf13be5b8483017dd3f20f93d"
  },
  {
    "url": "assets/img/vue-datamaps-demo-arcs.fd2be11a.png",
    "revision": "fd2be11afe587e33f6b27d6e9df8dbe9"
  },
  {
    "url": "assets/img/vue-datamaps-demo-aws-region.7b363018.png",
    "revision": "7b3630185e668ecf20d63f77eea1cba6"
  },
  {
    "url": "assets/img/vue-datamaps-demo-basic.37ff25b5.png",
    "revision": "37ff25b5e3d43dfdde38efc7a5f3fd44"
  },
  {
    "url": "assets/img/vue-datamaps-demo-bubbles.50e0dbef.png",
    "revision": "50e0dbeff2f8b0c03c607d0f3022168d"
  },
  {
    "url": "assets/img/vue-datamaps-demo-custom-color.624d25c8.png",
    "revision": "624d25c8585069038ac116ea408dcb8e"
  },
  {
    "url": "assets/img/vue-datamaps-demo-graticules.e3f3b618.png",
    "revision": "e3f3b61808b116ea7469bd78660f0f7e"
  },
  {
    "url": "assets/img/vue-datamaps-demo-south-korea.5addb7c8.png",
    "revision": "5addb7c8f683573f46308961b974c51a"
  },
  {
    "url": "assets/img/vue-datamaps-demo-state-label.304f80c2.png",
    "revision": "304f80c2496471da8fe3572b2b571d23"
  },
  {
    "url": "assets/img/vue-datamaps-demo-zoom.793a8d7e.png",
    "revision": "793a8d7ef5fd67e308e05d968f629fb2"
  },
  {
    "url": "assets/img/vue-datamaps-example.58fcd139.png",
    "revision": "58fcd13979744328e24bcc9e93ee51f4"
  },
  {
    "url": "assets/img/vue-pivottable-demo.dbf19b1e.gif",
    "revision": "dbf19b1e437a35f12467d5f38986f10d"
  },
  {
    "url": "assets/img/vue-pivottable-docs.bef53dd9.png",
    "revision": "bef53dd9df91d3380047bdf6aa9890d1"
  },
  {
    "url": "assets/img/vue-pivottable-npm.2205afc0.png",
    "revision": "2205afc073d4df284a29bdc7e4332c7e"
  },
  {
    "url": "assets/js/10.f50b3069.js",
    "revision": "94e51c951124be2342ecb5fe4941ee06"
  },
  {
    "url": "assets/js/11.0aff3a06.js",
    "revision": "080296162e182660316fdb9de06edbb9"
  },
  {
    "url": "assets/js/12.3e7af3bf.js",
    "revision": "6f80c3f819065f9b9625681147de9873"
  },
  {
    "url": "assets/js/13.fa26fe36.js",
    "revision": "17830c9b781d48cfdadc5415880ac21f"
  },
  {
    "url": "assets/js/14.0768aa6d.js",
    "revision": "9040f52016ecc5d5bb60aad85c19fbb1"
  },
  {
    "url": "assets/js/15.30687e11.js",
    "revision": "eabffd3e59b578a42c4a1658a9f9b717"
  },
  {
    "url": "assets/js/16.41510fcd.js",
    "revision": "067d4cee04e9943c71ceac258fc2eb27"
  },
  {
    "url": "assets/js/17.9165c019.js",
    "revision": "0c4bd184e8958ccc840ad103e20ddd64"
  },
  {
    "url": "assets/js/18.c4db6529.js",
    "revision": "ff7fb576681d0a8c94384eb596e5f16b"
  },
  {
    "url": "assets/js/19.53f494fc.js",
    "revision": "b067a6a8001d91de9f9ba7156c8ae6ae"
  },
  {
    "url": "assets/js/2.564482d3.js",
    "revision": "1e8c735e485533f73e388a74ff286224"
  },
  {
    "url": "assets/js/20.a2ccceb0.js",
    "revision": "e73b6ceed98994225e229ffe2bba212f"
  },
  {
    "url": "assets/js/21.4ab76ce0.js",
    "revision": "6ca2e6b8c9e6ae6e9c1dbc6cb1f034e1"
  },
  {
    "url": "assets/js/22.3067ec14.js",
    "revision": "bcf439e7f954368b5ed781fe2d82a7f5"
  },
  {
    "url": "assets/js/23.d9c1d334.js",
    "revision": "de23cc9ab7ce19b7437028a342569a7e"
  },
  {
    "url": "assets/js/24.4bb93ab5.js",
    "revision": "a019218f7105036d496ae125624a9d63"
  },
  {
    "url": "assets/js/25.1a971ee8.js",
    "revision": "638f1f2c2d3aceb52adfbc658990bc9b"
  },
  {
    "url": "assets/js/26.82059bc2.js",
    "revision": "26376defbb2e15a2d5ba29de361d5747"
  },
  {
    "url": "assets/js/27.6eef011b.js",
    "revision": "21f925163cf82079fb7404ace30ccdba"
  },
  {
    "url": "assets/js/28.b4304189.js",
    "revision": "5e44e7c2fb9d22f4d176341c625439eb"
  },
  {
    "url": "assets/js/29.8bf5d948.js",
    "revision": "84901f50bdace2c2d1deafd22718aa8f"
  },
  {
    "url": "assets/js/3.17f4bb11.js",
    "revision": "d9d65dc6f89f7057ac041f15f4376e64"
  },
  {
    "url": "assets/js/30.7d340947.js",
    "revision": "f7fb9f965d32785759b8f1ebeead0742"
  },
  {
    "url": "assets/js/31.37e22e25.js",
    "revision": "fdaca159966cbfcab1a387f673dbf4db"
  },
  {
    "url": "assets/js/32.11858fc6.js",
    "revision": "951c4ba1cba6a148720c0afefd864f92"
  },
  {
    "url": "assets/js/33.e6179f4e.js",
    "revision": "9def946c4815bf34723c28dc88dc44f6"
  },
  {
    "url": "assets/js/34.9acf3c14.js",
    "revision": "b1bbb0cb5e2078e5752d9dd396b1ff8b"
  },
  {
    "url": "assets/js/35.92f5255d.js",
    "revision": "26e1426a3ead9eb1c7bf92da5e662ebd"
  },
  {
    "url": "assets/js/36.9ae1f8b8.js",
    "revision": "385f8080e9d1cae8fb6e7f128643607a"
  },
  {
    "url": "assets/js/37.66436609.js",
    "revision": "f869e259294472a43a38521393e5e1ec"
  },
  {
    "url": "assets/js/38.4efea876.js",
    "revision": "6ff201f56e95228fdbd845f15d8211e5"
  },
  {
    "url": "assets/js/39.ba46fd32.js",
    "revision": "cbb1247c2f59d8c7675b134e0fd7ca1e"
  },
  {
    "url": "assets/js/4.c23ed9a9.js",
    "revision": "0a2dcf5d3a11bda20030b7e383c83040"
  },
  {
    "url": "assets/js/40.a4397a34.js",
    "revision": "a6d9bb579b98cb92d940df6744b8e9cd"
  },
  {
    "url": "assets/js/41.456ec380.js",
    "revision": "65427cda490fc0d5b9a92a7bb0ff705d"
  },
  {
    "url": "assets/js/42.79b7a40b.js",
    "revision": "1887900b9ef8b3dca9139339fd1c9864"
  },
  {
    "url": "assets/js/43.e4ecbd03.js",
    "revision": "d1ed2981f7ff7108ce9335e7730eae41"
  },
  {
    "url": "assets/js/44.477d7b8f.js",
    "revision": "9eaaf92766526e80ae9f3d5e4af438d6"
  },
  {
    "url": "assets/js/45.8199861e.js",
    "revision": "899da7f06d6474d0a797e984a7ef415e"
  },
  {
    "url": "assets/js/46.b9dce41d.js",
    "revision": "710dd8498eba78f6e335ffd8086d75ac"
  },
  {
    "url": "assets/js/47.9daaab5a.js",
    "revision": "4abe86dd9e260d7358f5404f60b759d8"
  },
  {
    "url": "assets/js/48.52618739.js",
    "revision": "9cbe7fd2c3785ce668aebbafd5303adc"
  },
  {
    "url": "assets/js/49.8e5c423b.js",
    "revision": "a0864a3de14b6ed117dc36dcfc3e3417"
  },
  {
    "url": "assets/js/5.1b3dee86.js",
    "revision": "0c2aff2e7f1b85c39f7a3902546c3694"
  },
  {
    "url": "assets/js/6.f348eab0.js",
    "revision": "c0fd6b062b81b27d15297c988f313294"
  },
  {
    "url": "assets/js/7.5f6760fb.js",
    "revision": "4284655408e59ce2e438389c2bd29d63"
  },
  {
    "url": "assets/js/8.6b1110bc.js",
    "revision": "c3a4e12c330b9df4ff3a917b19aff341"
  },
  {
    "url": "assets/js/9.cd01cbc6.js",
    "revision": "681ae200903f1fa85650484067071c05"
  },
  {
    "url": "assets/js/app.1f8d3069.js",
    "revision": "b1691273cfb55016600b9d1b7f708345"
  },
  {
    "url": "blog/2019/04/21/how-to-git-mulitple-account.html",
    "revision": "78c549b4622bb60cc6f98b74105534ad"
  },
  {
    "url": "blog/2019/04/30/how-to-vuecli3-vscode.html",
    "revision": "5ee1d0940552a4ec43c65c570e7f14f4"
  },
  {
    "url": "blog/2019/12/15/what-is-padding-hack.html",
    "revision": "2c3040e14ed13a8f58dd2fbcfab5056c"
  },
  {
    "url": "blog/2020/02/02/how-to-private-npm.html",
    "revision": "c595375cddbc42f97258e24e89770720"
  },
  {
    "url": "blog/2020/03/13/basic-css.html",
    "revision": "ce33c19d63fd3ffb1bfd5913b09ef60b"
  },
  {
    "url": "blog/2020/03/16/error-report-ie11-script1002.html",
    "revision": "48a94e06967d1d691e1dc74f32e9fb5c"
  },
  {
    "url": "blog/2021/04/25/making-trading-bot-1.html",
    "revision": "9db4cfdc6e5983563a1b5b5bc323df32"
  },
  {
    "url": "blog/2021/05/02/book-you-dont-know-js-1.html",
    "revision": "ae3741fa6a15ddd9c82d16bf3001f6f3"
  },
  {
    "url": "blog/2021/05/20/making-trading-bot-2.html",
    "revision": "1cc6028c4e9bc32988b6e1bef439b685"
  },
  {
    "url": "blog/2021/06/07/making-trading-bot-3.html",
    "revision": "c945b2ea0c097c20947a5e938c8c4899"
  },
  {
    "url": "blog/2021/07/31/what_closure_means.html",
    "revision": "8c08e328a8bff37ea22bd20d2e8a6967"
  },
  {
    "url": "blog/2021/08/16/how-to-connecting-to-github-with-ssh.html",
    "revision": "10c555da9b24461ab2f2888486bcb11b"
  },
  {
    "url": "blog/2021/12/10/error-report-account-has-insufficient-available-balance.html",
    "revision": "07321b3c43db444dffe85a028e51c0e1"
  },
  {
    "url": "blog/2022/01/19/how_does_it_work_javascript.html",
    "revision": "3bceef7848620de7b4b656af3a7a6b0f"
  },
  {
    "url": "blog/2022/01/20/how_to_install_redmine.html",
    "revision": "e11c12fafcbc896395b2b39b1b28f209"
  },
  {
    "url": "blog/2022/01/23/deploy-vue-pivottable-0-4-1.html",
    "revision": "c5ddeda074d07e1d9d315f3708c2f026"
  },
  {
    "url": "blog/2022/01/24/how_does_it_work_browser_rendering.html",
    "revision": "21d4d71f44e05719b456d749ca1adf34"
  },
  {
    "url": "blog/2022/01/26/pros-and-cons-of-ssr-and-csr.html",
    "revision": "bfd328036e25744e2329784b07988712"
  },
  {
    "url": "blog/2022/01/28/making-trading-bot-4.html",
    "revision": "80cb4df6c16129ac00b9f9a4fd6e5158"
  },
  {
    "url": "blog/2022/01/29/what_is_event_delegation.html",
    "revision": "0b6328e4ea27540b687c5c1f9fcf4d31"
  },
  {
    "url": "blog/2022/01/30/event_listener_this.html",
    "revision": "d7455d2a6c76ebee352361d50fb2b1f3"
  },
  {
    "url": "blog/2022/01/31/why_can_I_change_a_constant_object.html",
    "revision": "3822ccbad0d7bf24085e570b04bbc12e"
  },
  {
    "url": "blog/2022/02/02/absolute_relative.html",
    "revision": "dec3bffd33334c7a63cabad1e4b8ba3a"
  },
  {
    "url": "blog/2022/06/16/starting-docker.html",
    "revision": "7de90106f957d3a61b4bee983ff39746"
  },
  {
    "url": "blog/2022/10/16/css-box-model.html",
    "revision": "c3359a13168610a588e05d240e29b11e"
  },
  {
    "url": "blog/index.html",
    "revision": "cc3b68d81401dd52ccf05fd4895a31e5"
  },
  {
    "url": "fire.png",
    "revision": "61982b48c4fc5e4e2f8888c1f4459c00"
  },
  {
    "url": "google603171b62dec4aac.html",
    "revision": "31d70d981f06209ee337ed729ce7075d"
  },
  {
    "url": "index.html",
    "revision": "9643ac64148db7170a4e060f887816d9"
  },
  {
    "url": "naverd0af24031866c2cb391f545d6da12043.html",
    "revision": "a800ca28210e3201c8e711db6f112060"
  },
  {
    "url": "portfolio/goorm-goorm.html",
    "revision": "0cbd4a9515af610378a4ff71fb31d30a"
  },
  {
    "url": "portfolio/index.html",
    "revision": "b8d912f9c520ae1f2c9dbc82082951f9"
  },
  {
    "url": "portfolio/vue-datamaps.html",
    "revision": "61ef46e3db03d9125420119285a4271c"
  },
  {
    "url": "portfolio/vue-pivottable.html",
    "revision": "3a405a8e0d2b2d62f5f15d0bf954656f"
  },
  {
    "url": "thumb/20191215.png",
    "revision": "58fcd13979744328e24bcc9e93ee51f4"
  },
  {
    "url": "thumb/20200202.png",
    "revision": "aebb7d1899543772792ab15e77b71c78"
  },
  {
    "url": "thumb/20210425.png",
    "revision": "c8fed134b21814d775a3b3afdd358b9c"
  },
  {
    "url": "thumb/20210502.jpg",
    "revision": "ce5aca32c9222f93b996387c0322d24c"
  },
  {
    "url": "thumb/20210520.png",
    "revision": "6e0f110427bb9d483ff4fe6a4f5d4e77"
  },
  {
    "url": "thumb/20210816.png",
    "revision": "dafe04893763a49fde9110ba41b88de6"
  },
  {
    "url": "thumb/template.png",
    "revision": "e59bafa507ecfd91e4c76d9112620fdb"
  },
  {
    "url": "thumb/template2.png",
    "revision": "046618f4cb2cfccdfe246fc0c0916471"
  },
  {
    "url": "thumb/template3.png",
    "revision": "a30ffca99365fb588c177da6384e5f6e"
  },
  {
    "url": "vue-pivottable-demo.gif",
    "revision": "dbf19b1e437a35f12467d5f38986f10d"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
