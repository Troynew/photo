import Mock from 'mockjs';

const database = Mock.mock({
  'list|80-90': [
    {
      id: '@id',
      goodsName: '@cname',
      barCode: '@int(100,999)',
      oilStation: '@city()油站',
      category: '@pick(["饮料/水","饮料/功能饮料"])',
      price: '@int(10, 99)',
      tradePrice: '@int(10,99)',
      stockNumber: '@int(100,999)',
      unit: '@pick(["箱","瓶"])',
      status: '@pick(["已上架","已下架"])',
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
  'POST /api/goodsstock/query': getData,
};
