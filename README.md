ishare
========

作者：tomiezhang<br>
联系：neil@vip.qq.com<br>
blog:[tomiedev.sinaapp.com](http://tomiedev.sinaapp.com "tomiedev.sinaapp.com")

ishare是一款基于社交网站分享的js工具，你可以在你网站页面添加ishare相关代码后，即可自由定制分享代码！

##优点

* 文件压缩后只有9kb，gzip后只有3kb.
* 依赖jquery框架，兼容性良好.
* 涵盖了目前比较主流的社交网站【新浪微博/腾讯微博/QQ/QQ空间/QQ邮箱/开心/人人/微信....】.

##Change Log
### v1.0.0
* 发布第一个版本，增加分享到QQ以及可以将分享按钮插入到指定DOM结构

### v1.0.1
* 腾讯微博不能分享自定义图片的bug

###使用方法
*引入[ishare_min.js](http://mat1.gtimg.com/joke/tomiezhang/ishare/ishare_min_v1.1.js "ishare_min.js")

*基本用法：

	iShareNew({

			"mod":0,

			"icon":2,

			"share":["tsina","tqq","QQ","qzone","mail","kaixin001","renren","fb","twitter","weixin"]

		});

*详细使用方法见[example.html](http://tomiedev.sinaapp.com/ishare/example.html "【example.html】")