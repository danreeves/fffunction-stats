'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = addPathsTo;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function addPathsTo(app) {
    return function addPaths(obj, url) {
        var _this = this;

        if (typeof obj === 'object') {
            Object.keys(obj).forEach(function (segment) {
                addPaths(obj[segment], _path2['default'].join(url, segment));
            });
        } else {
            app.get(url, function callee$2$0(req, res) {
                var data;
                return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            context$3$0.next = 2;
                            return regeneratorRuntime.awrap(obj());

                        case 2:
                            data = context$3$0.sent;

                            res.json(data);
                            console.log('Request  ->', url);
                            console.log('Response ->', data);

                        case 6:
                        case 'end':
                            return context$3$0.stop();
                    }
                }, null, _this);
            });
            console.log('Route added:', url);
        }
    };
}

module.exports = exports['default'];