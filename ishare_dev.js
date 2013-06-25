/**
 * ishare is an open share tool
 * Author tomie
 * 2013/06/25
 * dependent on jquery
 * share target:weibo,t.qq.com,qzone,qqmail,kaixin001,renren,weixin,fb,twitter
 * use case:
 * 1.<script src="ishare_min.js"></script>
 * 2.<script>
 * 		iShareNew({
 * 			"mod":0,
 * 			"icon":2,
 * 			"share":["tsina","tqq","qzone","main","kaixin001","renren","fb","twitter","weixin"],
 * 			"shareword":"ishare is an open share tool",
 * 			"isShowTime":true,
 * 			"shareurl":"http://www.qq.com",
 * 			"sharepic":"http://mat1.gtimg.com/joke/tomiezhang/ishare/t.png"
 * 		});
 * 	
 * </script>
 * example:example.html
 */
; (function(W) {
	var iShareNew = W.iShareNew = function(args) {
		return new iShareNew.fn.init(args);
	};
	iShareNew.fn = iShareNew.prototype = {
		g: function(v) {
			return document.getElementById(v)
		},
		cssReady: false,
		jsReady: false,
		infoArray: [],
		loadUrlShareTime: [],
		loadUrlShareIndex: 0,
		bossName: {
			mode: {
				"iShareWrap": "图标式",
				"iShareFloatWrap": "悬浮式右侧",
				"iShareFloatWrapLeft": "悬浮式左侧"
			},
			button: {
				"tsina": "新浪微博",
				"tqq": "腾讯微博",
				"QQ":"QQ",
				"qzone": "QQ空间",
				"mail": "QQ邮箱",
				"kaixin001": "开心网",
				"renren": "人人网",
				"weixin": "微信",
				"fb": "Facebook",
				"twitter": "Twitter"
			}
		},
		floatColor: {
			1: {
				"blue": "http://mat1.gtimg.com/joke/tomiezhang/ishare/r1.gif",
				"black": "http://mat1.gtimg.com/joke/tomiezhang/ishare/r2.gif",
				"gray": "http://mat1.gtimg.com/joke/tomiezhang/ishare/r3.gif",
				"blues": "http://mat1.gtimg.com/joke/tomiezhang/ishare/r4.gif",
				"green": "http://mat1.gtimg.com/joke/tomiezhang/ishare/r5.gif",
				"org": "http://mat1.gtimg.com/joke/tomiezhang/ishare/r6.gif",
				"red": "http://mat1.gtimg.com/joke/tomiezhang/ishare/r7.gif",
				"pink": "http://mat1.gtimg.com/joke/tomiezhang/ishare/r8.gif"
			},
			2: {
				"blue": "http://mat1.gtimg.com/joke/tomiezhang/ishare/l1.gif",
				"black": "http://mat1.gtimg.com/joke/tomiezhang/ishare/l2.gif",
				"gray": "http://mat1.gtimg.com/joke/tomiezhang/ishare/l3.gif",
				"blues": "http://mat1.gtimg.com/joke/tomiezhang/ishare/l4.gif",
				"green": "http://mat1.gtimg.com/joke/tomiezhang/ishare/l5.gif",
				"org": "http://mat1.gtimg.com/joke/tomiezhang/ishare/l6.gif",
				"red": "http://mat1.gtimg.com/joke/tomiezhang/ishare/l7.gif",
				"pink": "http://mat1.gtimg.com/joke/tomiezhang/ishare/l8.gif"
			}
		},
		init: function(args) {
			var _this = this;
			this.args = args;
			this.uid = new Date().getTime() + this.RndNum(8);
			this.word = args.shareword || document.title;
			this.pic = args.sharepic || "";
			this.url = args.shareurl || document.location.href;
			this.coreJS = "http://mat1.gtimg.com/joke/tomiezhang/ishare/jquery.js";
			this.isShowTime = args.isShowTime || false;
			this.coreCSS = "http://mat1.gtimg.com/joke/tomiezhang/ishare/isharenew_v1.1.css?20130625v4";
			this.cssMOD = ['iShareWrap', 'iShareFloatWrap', 'iShareFloatWrapLeft'];
			this.ContentId = args.ContentId || "";
			var ContentStr = "";
			ContentStr += '<div id="iShareNew_' + this.uid + '" class="' + this.cssMOD[this.args.mod] + '"';
			if ((this.args.mod == 1 && args.top && args.bgStyle) || (this.args.mod == 2 && args.top && args.bgStyle)) {
				ContentStr += ' style="top:' + args.top + ';">';
				ContentStr += '<div class="neibu">';
				ContentStr += '<div class="shareBar"><img src="' + _this.floatColor[_this.args.mod][args.bgStyle] + '"/></div><div class="shareCoent">';
				ContentStr += '<div class="title"><span class="closeTips" title="不再显示分享按钮"></span>';
				if (_this.isShowTime) {
					ContentStr += "<em>分享次数:<strong class='showTime_" + this.args.icon + "'></strong></em>";
				} else {
					ContentStr += '<em>分享到...</em>';
				}
				ContentStr += '</div>';
				for (var i = 0; i < this.args.share.length; i++) {
					ContentStr += '<a href="javascript:;" class="iShare_' + this.args.icon + '_' + _this.args.share[i] + '" name="' + _this.args.share[i] + '" title="分享到' + _this.bossName.button[_this.args.share[i]] + '"><span class="icon"></span><span class="text">' + this.bossName.button[_this.args.share[i]] + '</span></a>';
				};
				ContentStr += '</div>';
				ContentStr += '</div>';
			} else {
				ContentStr += '>';
				for (var i = 0; i < this.args.share.length; i++) {
					ContentStr += '<a href="javascript:;" class="iShare_' + this.args.icon + '_' + _this.args.share[i] + '" name="' + _this.args.share[i] + '" title="分享到' + _this.bossName.button[_this.args.share[i]] + '"></a>';
				};
				if (_this.isShowTime) {
					ContentStr += "<a href='javascript:;' class='showTime_" + this.args.icon + "'></a>";
				}
			}
			ContentStr += '</div>';
			if (this.ContentId !== "") {
				this.g(this.ContentId).innerHTML = ContentStr;
			} else {
				var wrapUID = new Date().getTime() + this.RndNum(8);
				document.write("<div id='shareWRAP_" + wrapUID + "'></div>");
				this.g('shareWRAP_' + wrapUID).innerHTML = ContentStr;
			}
			this.infoArray.push({
				"uid": this.uid,
				"pic": this.pic,
				"word": this.word,
				"url": this.url,
				"mod": this.args.mod,
				"icon": this.args.icon,
				"showtime": this.isShowTime
			});
			this.loadCore(this.coreCSS, "css",
			function() {
				_this.cssReady = true;
				if (typeof jQuery !== "undefined") {
					_this.jsReady = true;
					_this.checkSta();
				} else {
					_this.loadCore(_this.coreJS, "js",
					function() {
						_this.jsReady = true;
						_this.checkSta();
					})
				}
			});
		},
		getpic: function() {
			var arr = [];
			if ($j("img").length > 0) {
				$j("img").each(function(a, b) {
					if ($j(this).width() > 150 && $j(this).height() > 150) {
						arr.push($j(this).attr("src"))
					}
				})
			}
			return arr;
		},
		interface: {
			getMeta: function() {
				var meta = document.getElementsByTagName('meta');
				var share_desc = '';
				for (i in meta) {
					if (typeof meta[i].name != "undefined" && meta[i].name.toLowerCase() == "description") {
						share_desc = meta[i].content;
					}
				}
				return share_desc;
			},
			QQ:function(title,url,imgurl){
				return "http://connect.qq.com/widget/shareqq/index.html?url="+encodeURIComponent(url)+"&site=qqcom&iframe=true&showcount=0&desc=&summary=&title=&pics=&style=203&width=19&height=22";
			},
			mail: function(title, url, imgurl) {
				if (imgurl.length > 0) {
					return "http://mail.qq.com/cgi-bin/qm_share?url=" + encodeURIComponent(url) + "&to=qqmail&desc=&summary=" + encodeURIComponent(this.getMeta()) + "&title=" + encodeURIComponent(title) + "&pics=" + encodeURIComponent(imgurl[0]) + "&site=";
				} else {
					return "http://mail.qq.com/cgi-bin/qm_share?url=" + encodeURIComponent(url) + "&to=qqmail&desc=&summary=" + encodeURIComponent(this.getMeta()) + "&title=" + encodeURIComponent(title) + "&site=";
				}
			},
			weixin: function(title, url, imgurl) {
				$j.getScript("http://mat1.gtimg.com/www/weixin/sharewx_v1.0.0.js",
				function() {
					var opt = {
						"title": encodeURIComponent(title),
						"imgsrc": imgurl,
						"url": url,
						"appid": ""
					};
					W.sharewx(opt);
					return false;
				});
			}
		},
		getDomain: function(str) {
			var durl = /http:\/\/([^\/]+)\//i;
			domain = str.match(durl);
			if (domain == null) {
				return "";
			} else {
				return domain[1];
			}
		},
		RndNum: function(n) {
			var rnd = "";
			for (var i = 0; i < n; i++) {
				rnd += Math.floor(Math.random() * 10);
			}
			return rnd;
		},
		pushDate: function(mode, button, url, site) {
			var _this = this;
			W.bossimg = new Image(1, 1);
			var ouin = "";
			if (typeof trimUin === "function" && typeof pgvGetCookieByName === "function") {
				try {
					ouin = trimUin(pgvGetCookieByName("o_cookie="));
				} catch(e) {}
			}
			W.bossimg.src = "http://btrace.qq.com/collect?sIp=&iQQ=" + ouin + "&sBiz=ishare&sOp=&iSta=&iTy=1729&iFlow=" + _this.RndNum(9) + "&mode=" + encodeURIComponent(mode) + "&button=" + encodeURIComponent(button) + "&url=" + encodeURIComponent(url) + "&site=" + encodeURIComponent(site);
		},
		checkSta: function() {
			var _this = this;
			if (this.cssReady && this.jsReady) {
				window.$j = $j = jQuery.noConflict();
				$j.each(this.infoArray,
				function(i, o) {
					if (o.showtime) {
						_this.loadUrlShareTime.push({
							"u": "http://i.jiathis.com/url/shares.php?url=" + encodeURIComponent(o.url),
							"el": "#iShareNew_" + o.uid,
							"child": ".showTime_" + o.icon
						});
					}
					$j("#iShareNew_" + o.uid).find(".showTime_" + o.icon).html("0");
					$j("#iShareNew_" + o.uid).find(".closeTips").click(function() {
						$j("#iShareNew_" + o.uid).hide();
					});
					$j("#iShareNew_" + o.uid).find("a").unbind('click').bind("click",
					function() {
						_this.pushDate(_this.bossName.mode[$j("#iShareNew_" + o.uid).attr("class")], _this.bossName.button[$j(this).attr("name")], o.url, _this.getDomain(o.url));
						if ($j(this).attr("name") == "weixin") {
							_this.interface[$j(this).attr("name")](o.word, o.url, o.pic);
						} else {
							if ($j(this).attr("name") == "mail" || $j(this).attr("name") == "QQ") {
								if (o.pic == "") {
									o.pic = _this.getpic();
								} else {
									o.pic = [o.pic];
								}
								window.open(_this.interface[$j(this).attr("name")](o.word, o.url, o.pic), "腾讯网ishare", "height=485, width=720,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no,top=200,left=200");
							} else {
								window.open("http://s.jiathis.com/?webid=" + $j(this).attr("name") + "&url=" + encodeURIComponent(o.url) + "&title=" + encodeURIComponent(o.word) + "&uid=1626433&jid=1344496797938582", "腾讯网ishare", "height=600, width=560,toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no,top=200,left=200");
							}
						}
						return false;
					});
					if (o.mod == 1) {
						$j("html").css({
							'position': 'relative',
							'overflow-x': 'hidden'
						});
						$j("." + _this.cssMOD[o.mod]).find(".neibu").bind("mouseenter",
						function(event) {
							event = event ? event: window.event
							var obj = event.srcElement ? event.srcElement: event.target;
							if (obj.tagName == "IMG" || obj.tagName == "DIV") {
								$j(this).parent().animate({
									right: "0px"
								});
							}
						}).bind("mouseleave",
						function() {
							var _this = this;
							setTimeout(function() {
								$j(_this).parent().animate({
									right: "-216px"
								},
								"fast")
							},
							200);
						})
					}
					if (o.mod == 2) {
						$j("html").css({
							'position': 'relative',
							'overflow-x': 'hidden'
						});
						$j("." + _this.cssMOD[o.mod]).find(".neibu").bind("mouseenter",
						function(event) {
							if (event.target.nodeName == "IMG" || event.target.nodeName == "DIV") {
								$j(this).parent().animate({
									left: "0px"
								},
								"fast");
							}
						}).bind("mouseleave",
						function() {
							var _this = this;
							setTimeout(function() {
								$j(_this).parent().animate({
									left: "-216px"
								},
								"fast")
							},
							200);
						})
					}
				});
				W.$CKE = {
					rdc: function(a) {
						var nb = 0;
						if (parseInt(a.shares) < 1000) {
							nb = parseInt(a.shares);
						} else {
							nb = Math.ceil(parseInt(a.shares) / 1000) + "K";
						}
						$j(_this.loadUrlShareTime[_this.loadUrlShareIndex].el).find(_this.loadUrlShareTime[_this.loadUrlShareIndex].child).html(nb);
						if (_this.loadUrlShareIndex < _this.loadUrlShareTime.length) {
							$j.getScript(_this.loadUrlShareTime[++_this.loadUrlShareIndex].u);
						}
					}
				}
				if (_this.loadUrlShareTime.length > 0) {
					$j.getScript(_this.loadUrlShareTime[_this.loadUrlShareIndex].u);
				}
			} else {
				this.init();
			}
		},
		isCssCreat: false,
		loadCore: function(link, type, callback) {
			if (type == "js") {
				try {
					var script = document.createElement('script');
					script.src = link;
					script.id = "coreJS";
					script.type = "text/javascript";
					if (!this.g("coreJS")) {
						document.getElementsByTagName("head")[0].appendChild(script);
					}
					if (script.addEventListener) {
						script.addEventListener("load", callback, false);
					} else if (script.attachEvent) {
						script.attachEvent("onreadystatechange",
						function() {
							if (script.readyState == 4 || script.readyState == 'complete' || script.readyState == 'loaded') {
								callback();
							}
						});
					}
				} catch(e) {
					callback();
				}
			} else {
				if (!this.isCssCreat) {
					var links = document.createElement('link');
					links.type = 'text/css';
					links.rel = 'stylesheet';
					links.id = "coreCSS";
					links.href = link;
					if (!this.g("coreCSS")) {
						document.getElementsByTagName("head")[0].appendChild(links);
					}
					this.isCssCreat = true;
					var _this = this;
					links.onload = function() {
						_this.isCssLoaded = true;
					};
					setTimeout(function() {
						_this.loadCore(link, type, callback);
					},
					100);
				} else {
					try {
						var loader = new Image;
						loader.onerror = callback;
						loader.src = link;
					} catch(e) {
						callback();
					}
				}
			}
		}
	}
	iShareNew.fn.init.prototype = iShareNew.fn;
})(window);