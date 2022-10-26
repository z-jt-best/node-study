const fs = require('fs')
const path = require('path')

// 遍历指定文件夹下的所有文件
function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(function (dirent) {
        var filePath = path.join(currentDirPath, dirent.name)
        if (dirent.isFile()) {
            callback(filePath, dirent)
        } else if (dirent.isDirectory()) {
            walkSync(filePath, callback)
        }
    })
}

export { walkSync }
