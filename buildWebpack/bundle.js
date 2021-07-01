// 获取主入口文件
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const getModuleInfo = function(file){
  const body = fs.readFileSync(file,'utf-8') //读取文件
  const ast = parser.parse(body, {
    sourceType: 'module' // 解析ES模块为ast语法书
  })
  console.log(ast.program.body)
  const deps = {} // 依赖收集
  traverse(ast,{
    ImportDeclaration({node}){ //对type类型为ImportDeclaration的节点的处理
      const dirname = path.dirname(file)
      //将file目录路径跟获得的value值拼接起来保存到deps里
      const abspath = './' + path.join(dirname,node.source.value)
      deps[node.source.value] = abspath 
    }
  })
  console.log(deps)
  const {code} = babel.transformFromAst(ast,null,{ // es6代码转为es5
    presets: ['@babel/preset-env']
  })
  console.log(code)
  const moduleInfo = {file,deps,code}
  return moduleInfo
}
// 迭代的方式获取模块里的依赖模块
const parseModules = function(file){
  const entry = getModuleInfo(file)
  const temp = [entry]
  for(let i=0;i<temp.length;i++){
    const deps = temp[i].deps //取到收集的依赖
    if(deps){
      for(const key in deps){
        if(deps.hasOwnProperty(key)){
          temp.push(getModuleInfo(deps[key]))
        }
      }
    }
  }
  // 格式转换为key，{code，deps}的形式
  depsGraph = {}
  temp.forEach(moduleInfo=>{
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code
    }
  })
  console.log(depsGraph)
  return depsGraph
}
//浏览器不会识别执行require和exports，需要自己定义
const bundle = (file)=>{
  const depsGraph = JSON.stringify(parseModules(file)) //先转为JSON字符串
  return `(function(graph){
    function require(file){
      function absRequire(relPath){
        return require(graph[file].deps[relPath])
      }
      var exports = {}
      function fn(require,exports,code){
        eval(code)
      }
      fn(absRequire,exports,graph[file].code)
      return exports
    }
    require('${file}')
  })(${depsGraph})`
}
const content = bundle('./src/index.js')
console.log(content)
fs.mkdirSync('./dist');
fs.writeFileSync('./dist/bundle.js',content)
// node bundle.js