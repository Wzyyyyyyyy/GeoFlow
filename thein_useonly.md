## ui组件
 flowgram.ai/apps/demo-free-layout/src/components/tools/index.tsx

## test-run按钮 对应文件
 flowgram.ai/apps/demo-free-layout/src/components/testrun/testrun-button/index.tsx

## document（整个工作流的主体）
 flowgram.ai/packages/canvas-engine/free-layout-core/src/workflow-document.ts

# 序列化、反序列化 document
 flowgram.ai/packages/canvas-engine/free-layout-core/dist/workflow-line-entity-BvKc5ehl.d.ts
## 具体实现
 flowgram.ai/packages/canvas-engine/free-layout-core/src/workflow-document.ts:515
    递归每个节点进行序列化
## 单个节点实现
 flowgram.ai/packages/canvas-engine/free-layout-core/src/workflow-document-option.ts
### 节点类型
一共有两种节点类型：
    1.定义节点类型、数据。静态的接口（专注于一个节点信息）:WorkflowNodeJSON
         flowgram.ai/packages/canvas-engine/free-layout-core/src/typings/workflow-node.ts:32
    2.定义节点关系、提取关系方法。动态的类（专注于节点间关系）:FlowNodeEntity
         flowgram.ai/packages/canvas-engine/document/dist/index.d.ts:639

# 用于切换执行逻辑放于服务器还是浏览器（后端还是前端）
## 模式切换
/workspaces/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/hooks/use-editor-props.tsx:309
## 逻辑if部分
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/plugins/runtime-plugin/create-runtime-plugin.ts:21
## 浏览器（前端）执行
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/plugins/runtime-plugin/client/browser-client/index.ts
## 服务器（后端）执行
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/plugins/runtime-plugin/client/server-client/index.ts
### 配置前后端执行的代码
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/hooks/use-editor-props.tsx:308
### 后端位置
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/packages/runtime/nodejs
### 运行命令
npm run dev

# 工作流引擎
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/packages/runtime/js-core/src/domain/engine/index.ts

# 代码导读
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/docs/src/zh/guide/runtime/source-code-guide.mdx

# 从点击按钮到执行的完整流程：

用户点击 TestRunButton。

onClick 事件触发 onTestRun 函数。

onTestRun 函数通过 useClientContext() 拿到 WorkflowDocument 的实例 document。

它调用 document.toJSON()，WorkflowDocument 内部的 toJSON() 方法开始工作，它会向 linesManager 等子系统收集信息，最终序列化出一个完整的 WorkflowJSON 对象。

onTestRun 函数拿到这个 JSON 对象，将它传递给 TestRunSidePanel 组件。

TestRunSidePanel 组件内部，最终会调用 WorkflowRuntimeExecutor 的 .execute() 方法，并将这个 JSON 对象（或包含它的ExecutionContext）作为参数传进去，开始执行。

# 心得
### 运行逻辑
逻辑可能都和监听组件写在一起了 .tsx文件
### 溯源代码
部分在主目录的代码可以点击import跳转到对应文件路径下，在文件夹内查找

# 持久化改动代码
## save保存按钮
 flowgram.ai/apps/demo-free-layout/src/components/tools/save.tsx         按钮逻辑
 flowgram.ai/apps/demo-free-layout/src/components/tools/index.tsx        按钮渲染
## load加载按钮
 flowgram.ai/apps/demo-free-layout/src/components/tools/load.tsx         按钮逻辑
 flowgram.ai/apps/demo-free-layout/src/components/tools/load.module.less 按钮样式
## 后端处理代码
 backend-server

# 增加节点改动代码
## 节点注册处
 flowgram.ai/apps/demo-free-layout/src/nodes
## 图标位置
 flowgram.ai/apps/demo-free-layout/src/assets
## 后端节点接口
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/packages/runtime/interface/src/node
## 后端对应节点执行器 executor
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/packages/runtime/js-core/src/nodes

 # 移植demo
 将 demo 放入 flowgram.ai/app/下
 修改新增 demo 文件夹中package.json中的 name键值（每个项目中的 demo 对应的 name 键值应唯一）
 在/flowgram.ai/rush.json 中的 projects 数组增加新增 demo 的元素
 rush update
 rush build

# 顶部菜单栏添加
新增/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/components/topbar
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/editor.tsx 新增 topbar 标签
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/components/tools/index.tsx 注释掉按钮
## 调整侧边栏位置
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/components/sidebar/sidebar-renderer.tsx
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/components/testrun/testrun-panel/index.tsx

# addnode面板
## 节点注册器中添加种类用于分类
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/typings/node.ts  
## 添加分类节点组件
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/components/node-panel/CategorizedNodePanel.tsx
## 更改index
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/components/node-panel/index.tsx

# 增加topbar标题
## 添加同步服务文件
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/services/WorkflowNameService.ts
## 在topbar 与 load 按钮中插入对应代码
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/components/topbar/index.tsx
/Users/apple/Desktop/CNPC/workflow/flowgram/flowgram.ai/apps/demo-free-layout-fromAliServer/src/components/tools/load.tsx

# 打包 docker 镜像
1. 修改/workspaces/flowgram/flowgram.ai/apps/demo-free-layout/package.json 中  "build": "exit 0",     为"build": "rsbuild build"
2. 运行生成 amd 平台镜像命令：docker buildx build --platform linux/amd64 -t flowgram-demo-aliserver-amd64:latest -f Dockerfile .
3. 打包镜像为tar：docker save -o flowgram-demo-amd64.tar flowgram-demo-amd64:latest    
   docker save -o flowgram-demo-aliserver-amd64.tar flowgram-demo-aliserver-amd64:latest  
4. 从.tar部署镜像到机器docker load -i flowgram-demo-aliserver-amd64.tar
5. 运行 docker run -d -p 8080:80 --name my-demo-app flowgram-demo-amd64:latest

## 后端打包 docker
1. 构建：docker build -t flowgram-backend:latest -f Dockerfile.backend .
3. 运行：docker run -d -p 4000:4000 --name my-backend-app flowgram-backend:latest