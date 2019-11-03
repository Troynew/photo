import Mock from 'mockjs';

const database = Mock.mock({
  'list|6-10': [
    {
      key: '@id',
      id: '@id',
      oilStation: '@city()油站',
    },
  ],
});

function getData(req, res) {
  const data = database.list;
  return res.json({
    status: true,
    body: {
      list: data,
      total: data.length,
    },
    message: 'success',
  });
}

export default {
  'GET /api/oilstation/list/query': getData,
};
