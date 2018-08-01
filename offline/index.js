var path = location.pathname;
if (path[path.length - 1] !== '/') {
	path += '/';
}
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		console.log('serviceWorker registering');
		navigator.serviceWorker.register( + 'sw.js').then(function(registration) {
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}).catch(function(err) {
			console.log('ServiceWorker registration failed: ', err);
		});
	}, false);
}else {
	console.log('The browser is not support serviceWorker');
}

function askPermission() {
    return new Promise(function (resolve, reject) {
        var permissionResult = Notification.requestPermission(function (result) {
            // 旧版本
            resolve(result);
        });
        if (permissionResult) {
            // 新版本
            permissionResult.then(resolve, reject);
        }
    })
    .then(function (permissionResult) {
        if (permissionResult !== 'granted') {
            // 用户未授权
			alert('用户未授权')
        }
    });
}

askPermission();

var dfdPrompt = null;
var button = document.getElementById('btn');

window.addEventListener('beforeinstallprompt', function (e) {
    // 存储事件
    dfdPrompt = e;
    // 显示按钮
    button.style.display = 'block';
    // 阻止默认事件
    e.preventDefault();
    return false;
});

button.addEventListener('click', function (e) {
    if (dfdPrompt == null) {
        return;
    }
    // 通过按钮点击事件触发横幅显示
    dfdPrompt.prompt();
    // 监控用户的安装行为
    dfdPrompt.userChoice.then(function (choiceResult) {
        alert(choiceResult.outcome);
    });
    // 隐藏按钮
    button.style.display = 'none';
    dfdPrompt = null;
});




// 	sendMessage: function (data) {
// 		console.log(navigator.serviceWorker.controller)
// 		navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage(data);
// 	}
// }

// navigator.serviceWorker.addEventListener('message', function (event) {
//     if (e.data === 'sw.update') {
//         // 此处可以操作页面的 DOM 元素啦
//     }
// });
