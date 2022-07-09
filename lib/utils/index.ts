import path from 'path'

/**
 * 生成基于项目所在路径的绝对路径
 * @param {string} dir
 * @returns {Boolean}
 */
export function pathResolve(dir: string): string {
    return path.resolve(process.cwd(), '.', dir)
}

/**
 * 获取请求头中的文件名
 * @param {string} name
 * @returns {Boolean}
 */
export function getFileName(name: string): string {
    if (name && /filename=.*/gi.test(name)) {
        const fileNameReg = new RegExp(/filename=\"(.*)\"/gi)
        return decodeURI(fileNameReg.exec(name)?.at(1) as string)
    }
    return 'file'
}
