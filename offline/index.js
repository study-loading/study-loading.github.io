if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		console.log('serviceWorker registering');
		navigator.serviceWorker.register(location.pathname + 'sw.js').then(function(registration) {
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

askP




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
