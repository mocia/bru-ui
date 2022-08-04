module.exports = [
    {
        route: 'upload-file-pbj',
        name: 'upload-file-pbj',
        moduleId: './modules/upload-file-pbj/index',
        nav: true,
        title: 'Upload Packing List',
        auth: true,
        settings: {
            group: "pemasukan supplier",
            permission: { "C.01": 1 ,"GP.01":1},
            iconClass: 'fa fa-clone'
        }
    },
]
