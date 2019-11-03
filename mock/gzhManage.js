import Mock from 'mockjs'

let database = Mock.mock({
    'wechatConfigList|10-30': [
        {
            appId: '@id',
            appSecret: '@id',
            'companyId|+1': 1,
            companyName: '@cword(3,6)',
            status: '@pick([true,false])',
            publicName: '@cname',
            token: '@id',
        }
    ],
    'companyList|10-20': [{
        "code": "@id",
        "createBy": "@cname",
        "createTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "fullName": "@cname",
        "id|+1": 1,
        "modifyBy": "@cname",
        "modifyTime": '@datetime("yyyy-MM-dd HH:mm:ss")',
        "remark": "@cword(3,20)",
        "shortName": "@cname",
        "status": '@pick(["enabled","disabled"])'
    }],
    'urlList|20-80': [{
        "id": '@id',
        "name": '@cword(2,4)',
        "type": '@pick([0,1])',
        "url": "string"
    }],
    'keywords|1-8': [{
        'companyId': '1',
        'functionUrlId': '@id',
        'keyword': '@cword',
    }],
    'codeList|10-30': [
        {
            code: '@id',
            functionCode: '@id',
            name: '@cword',
            title: '@cword',
        }
    ],
    'templateList': {
        'data|1-6': [
            {
                companyId: '1',
                id: '@id',
                templateCode: '@id',
                templateId: '@id',
                templateName: '@cword',
            }
        ],
        total: 60
    }
})
let menuList = []
function getWechatConfig(req, res) {
    const data = database.wechatConfigList
    const total = data.length

    return res.json({
        status: true,
        body: {
            data,
            total,
            totalPages: 0
        },
        message: 'success',
    })
}
function updateStatus(req, res) {
    const { id, status } = req
    database.wechatConfigList = database.wechatConfigList.map(item => {
        if (item.companyId === id) item.status = status
        return item
    })
    const result = {
        body: 0,
        message: 'success',
        status: true,
    }
    return res.json(result)
}
function getCompanyList(req, res) {
    const body = database.companyList
    const result = {
        body,
        message: 'success',
        status: true,
    }
    return res.json(result)
}

function configSave(req, res) {
    if (req.body) {
        database.wechatConfigList.push(req.body)
    }
    const result = {
        body: 0,
        message: 'success',
        status: true,
    }
    return res.json(result)
}

function getPublicInfo(req, res) {
    const id = req.params[0]
    const publicInfo = database.wechatConfigList.filter(configItem => configItem.companyId == id)
    const result = {
        body: publicInfo[0],
        message: 'success',
        status: true,
    }
    return res.json(result)
}

function queryMenu(req, res) {
    // const wechatMenuQueryParamList = database.menuList
    const result = {
        body: {
            wechatMenuQueryParamList: []
        },
        message: 'success',
        status: true,
    }
    return res.json(result)
}

function getAllUrl(req, res) {
    const result = {
        "body": database.urlList,
        "message": "string",
        "status": true
    }
    return res.json(result)
}

function queryTemplateCodeList(req, res) {
    const result = {
        "body": database.codeList,
        "message": "string",
        "status": true
    }
    return res.json(result)
}

function saveAndReleaseMenu(req, res) {
    let { list } = req.body
    list = list.map(item => menuList.push(item))
    const result = {
        "code": "string",
        "message": "string",
        "status": 0,
        "success": true
    }
    return res.json(result)
}

function getWechatKeyword(req, res) {
    const result = {
        body: database.keywords,
        message: 'string',
        status: true,
    }
    return res.json(result)
}

function editKeyWords(req, res) {
    console.info('editKeyWords->', req)

}

function queryTemplateList(req, res) {
    const result = {
        body: {
            data: database.templateList.data,
            total: database.templateList.total,
        },
        message: 'string',
        status: true,
    }
    return res.json(result)
}

function deleteTemplate(req, res) {
    let { data } = database.templateList
    data = data.filter(dataItem => dataItem.id !== req.body.id)
    database.templateList.data = data
    const result = {
        message: 'string',
        status: true,
    }
    return res.json(result)
}

function createTemplate(req, res) {
    database.templateList.data.push(req.body)
    console.info('data=>', database.templateList.data)
    const result = {
        body: 0,
        message: 'string',
        status: true,
    }
    return res.json(result)
}

export default {
    'POST /wechat/config/page': getWechatConfig,
    'POST /wechat/config/updateStatus': updateStatus,
    'POST /api/company/query/user': getCompanyList,
    'POST /wechat/config/save': configSave,
    'GET /wechat/config/*': getPublicInfo,
    'POST /api/wechat/menu/query': queryMenu,
    'GET /wechat/functionUrl/getAllUrl': getAllUrl,
    'POST /api/wechat/menu/saveAndReleaseMenu': saveAndReleaseMenu,
    'POST /wechat/keyword/editKeyWords': editKeyWords,
    'GET /wechat/keyword/*': getWechatKeyword,
    'POST /wechat/codeTable/list': queryTemplateCodeList,
    'GET /wechat/template/*': queryTemplateList,
    'POST /wechat/template/deleteTemplate': deleteTemplate,
    'POST /wechat/template/createTemplate': createTemplate,
}