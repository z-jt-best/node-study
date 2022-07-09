// const fs = require('fs-extra')
// const path = require('path')
// const archiver = require('archiver')

import fs from 'fs-extra'
import path from 'path'
import archiver from 'archiver'

import { pathResolve } from '../utils'

/**
 * 实例化 Archiver，内部做好的配置，未做自定义配置
 * @param format
 * @param options
 * @returns
 */
export function initArchiver(format: archiver.Format = 'zip', options: archiver.ArchiverOptions = { zlib: { level: 9 } }): archiver.Archiver {
    const archiverHandle = archiver(format, options)

    // 进度事件
    archiverHandle.on('progress', ({ entries, fs }) => {})

    // 警告事件
    archiverHandle.on('warning', err => {
        // log warning
        if (err.code === 'ENOENT') {
        }
        // throw error
        else {
            throw err
        }
    })

    // 报错事件
    archiverHandle.on('error', function (err) {
        throw err
    })

    return archiverHandle
}

interface ZipOptions {
    rootPath: boolean
}

/**
 * 压缩文件或文件夹
 * @param outputName 输入zip的包名。压缩成 zip 格式
 * @param target 要压缩的文件名或文件夹。如果是文件夹并rootPath为false时，压缩包内的名字与文件夹名称一致，如果为rootPath: true时，则全部添加到根目录
 * @param options options.rootPath: 是否将目标文件夹内的所有文件/文件夹都添加到根路径下，并不打包文件夹，而是打包文件夹内的文件
 */
async function js2Zip(outputName: string, target: string, options: ZipOptions = { rootPath: false }) {
    const output = fs.createWriteStream(path.isAbsolute(outputName) ? outputName : pathResolve(`${outputName}.zip`))
    const archive = initArchiver()

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes')
        console.log('已经完成压缩...')
    })

    const targetPath = pathResolve(target)
    const fileStat = await fs.stat(targetPath)

    archive.pipe(output)
    if (fileStat.isFile()) {
        const rename = path.parse(targetPath)
        archive.append(fs.createReadStream(targetPath), { name: rename.base })
    } else {
        archive.directory(targetPath, options.rootPath ? false : targetPath.split(path.sep).at(-1))
    }
    archive.finalize()
}

// 绝对路径
// js2Zip(pathResolve('src/testing.zip'), 'src/subdir', { rootPath: true })

// 输出名
// js2Zip('example', 'src/subdir', { rootPath: true })

export default js2Zip
