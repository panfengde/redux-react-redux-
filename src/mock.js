import Mock from 'mockjs'

Mock.mock('/login', 'get',
    {
        'name': 'ceshi',
        'sex': '男',
        'age': '12',
    }
);

Mock.mock('/api/value', 'get',
    {
        'count': 10
    }
);


Mock.mock('/api/value2', 'get',
    {
        'count': 2
    }
);

