import Mock from 'mockjs';

const database = Mock.mock({
  'list|80-90': [
    {
      id: '@id',
      goodsName: '@cname',
      barCode: '@int(100,999)',
      levelName: '@pick(["平台","厦门油站"])',
      category: '@pick(["饮料/水","饮料/功能饮料"])',
      price: '@int(10, 99)',
      tradePrice: '@int(10,99)',
      unit: '@pick(["箱","瓶"])',
      createTime: '@date',
    },
  ],
});

function getData(req, res) {
  const { body } = req;
  const { pageNumber = 1, pageSize = 10 } = body;

  const start = (pageNumber - 1) * pageSize;
  const end = pageNumber * pageSize;
  const data = database.list.slice(start, end);
  return res.json({
    status: true,
    body: {
      list: data,
      total: database.list.length,
    },
    message: 'success',
  });
}

export default {
  'POST /goods/dataTable': getData,
};
