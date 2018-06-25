if (process.env.NODE_ENV === 'development') {
    var Mock = require('mockjs');
    Mock.mock('https://api.example.com/test', {
        'list|1-10': [{
            'id|+1': 1,
            email: '@EMAIL',
            name: '@FIRST',
            title: '@TITLE',
            ip: Mock.Random.ip(),
            tel: /^1[385][1-9]\d{8}/
        }]
    });
}