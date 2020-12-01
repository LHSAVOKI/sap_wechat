# This repo is for my SCN blog series

* [Wechat development series 1 – setup your development environment](https://blogs.sap.com/2017/12/10/wechat-development-series-1-setup-your-development-environment/)

* [Wechat development series 2 – development Q&A service using nodejs](https://blogs.sap.com/2017/12/10/wechat-development-series-2-development-qa-service-using-nodejs/)

* [Wechat development series 3 – Trigger C4C Account creation in Wechat app](https://blogs.sap.com/2017/12/13/wechat-development-series-3-trigger-c4c-account-creation-in-wechat-app/)

* [Wechat development series 4 – Send C4C Data change notification to Wechat app](https://blogs.sap.com/2017/12/15/wechat-development-series-4-send-c4c-data-change-notification-to-wechat-app/)

* [Wechat development series 5 - embedded your UI5 application to Wechat app](https://blogs.sap.com/2017/12/17/wechat-development-series-5-embedded-your-ui5-application-to-wechat-app/)

* [Wechat development series 6 – Retrieve Wechat User info via oAuth2 and display it in UI5 application](https://blogs.sap.com/2017/12/19/wechat-development-series-6-retrieve-wechat-user-info-via-oauth2-and-display-it-in-ui5-application/)

* [Wechat development series 7 – use Redis to store Wechat conversation history](https://blogs.sap.com/2017/12/20/wechat-development-series-7-use-redis-to-store-wechat-conversation-history/)

# 2017-12-09

Express: Web 应用程序框架

11:25AM: it is NOT NECESSARY to specify proxy in Nodejs code!!! Only set proxy in cmd is far enough

* 4:33PM 最小系统法可以工作。。。

# 2017-12-10

Nodejs执行结果和浏览器里结果不一样。。。

# 2017-12-13

* node-inspector &
* node --debug app.js
* 通过URL http://127.0.0.1:8080/debug?port=5858 就可以进行调试了。
does not work on 2018-04-04!!!!!!!!!!!!!!!
Try new built-in tool: node --inspect <your_file>.js

网页授权获取用户基本信息: 订阅号无法开通此接口, 服务号必须通过微信认证
可以使用测试公众号.

# 2017-12-17 2:47PM

download PHP plugin in home: disable proxy in Eclipse
http://localhost:8098/jerrytest.php?code=Swim - 相当于这个php page就是一个code的接收器。

http://download.eclipse.org/tools/pdt/updates/5.0

# 2017-12-18 6:57PM

could not directly reply html page in wechat.
url复制到微信里手动能够打开： 

https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx73b49bfe02fd3a17&redirect_uri=https://wechatjerry.herokuapp.com/tokenCallback&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect

授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理

<Page title="{i18n>MasterTitle}" >
	{modelForview>MasterTitle}

UnhandledPromiseRejectionWarning: Unhandled promise rejection

* heroku logs -n 1500
* heroku logs -t 

[log](https://devcenter.heroku.com/articles/logging#view-logs)

# API

* Jerry test account get access token: https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx73b49bfe02fd3a17&secret=8a269a9916c32069901c2e6b6f3f16a6

* delete custom menu: 

https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=5_g-u6YuCk3xqfHILzYrK4dOCWPaEwUqafiYH-ZfV5YTlDqg59R32zC2MeBTaspJRSTcVvr49d3jrlxwLMefZIwoBuZfaDfwT5sMQBijv7qSW0tSQKfyugEOqght6VNUasu7N48zfrY-spq9UTZBMcAGAHJU

# learn

* app.use(bodyParser.json());
* app.use(bodyParser.urlencoded({ extended: false }));
顾名思义，bodyParser.json是用来解析json数据格式的。bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据，也就是请求头中包含这样的信息： Content-Type: application/x-www-form-urlencoded

效果:
```javascript
  app.route('/').post(function(req,res){
    console.log(req.body);
    res.status(200).end();
  });
```

# 2018-07-24

The "scripts" property is a dictionary containing script commands that are run at various times in the lifecycle of your package. The key is the lifecycle event, and the value is the command to run at that point.

npm run-script <script name>

# 2019-10-7

