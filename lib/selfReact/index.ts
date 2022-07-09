import * as babel from '@babel/core'

// const code = `
//     function app (name) {
//         console.log(name?.age ?? '123')
//     }
// `

// babel.transformAsync(code).then(res => {
//     console.log(res?.code)
// })

babel.transformFileAsync('./lib/selfReact/app.tsx').then(res => {
    console.log(res?.code)
})
