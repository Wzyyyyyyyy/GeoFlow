// server.js (升级版，支持动态文件名)
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 8088;
// 1. 只定义数据库文件夹的路径
const DB_FOLDER_PATH = path.join(__dirname, 'workflow_DB');

// --- 中间件配置 ---
app.use(cors());
app.use(express.json({ limit: '10mb' })); // 增加了请求体大小限制，以防工作流过大

// --- “保存” API 路由 (已升级) ---
app.post('/api/save', async (req, res) => {
  // 2. 从请求体中解构出文件名和工作流数据
  const { filename, workflowData } = req.body;
  
  console.log(`--- [请求到达] 后端收到保存请求，文件名: ${filename} ---`);

  // 3. 更严格的数据校验
  if (!filename || typeof filename !== 'string' || !workflowData || !Array.isArray(workflowData.nodes)) {
    console.error('错误: 请求数据不完整或格式不正确。');
    return res.status(400).json({ success: false, message: '请求无效，缺少文件名或工作流数据。' });
  }

  try {
    // 4. (安全关键) 清理文件名，防止路径遍历攻击
    // 这会移除所有路径相关的字符，只留下一个安全的文件名
    const safeFilename = filename.replace(/[\/\\]/g, ''); 
    const finalFilename = safeFilename.endsWith('.json') ? safeFilename : `${safeFilename}.json`;
    const fullPath = path.join(DB_FOLDER_PATH, finalFilename);

    // 5. 确保目录存在
    await fs.mkdir(DB_FOLDER_PATH, { recursive: true });

    // 6. 将数据写入到动态生成的文件路径
    await fs.writeFile(fullPath, JSON.stringify(workflowData, null, 2), 'utf8');
    
    console.log(`[成功] 数据已写入到文件: ${fullPath}`);
    res.status(200).json({ success: true, message: `工作流已成功保存为 ${finalFilename}！` });

  } catch (error) {
    console.error('[失败] 写入文件时发生错误:', error);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// --- [新功能] “获取所有工作流文件” API 路由 ---
app.get('/api/workflows', async (req, res) => {
  console.log('--- [请求到达] 后端收到 /api/workflows 的列表请求 ---');
  
  try {
    // 1. 确保目录存在，如果不存在则创建一个空目录并返回空列表
    await fs.mkdir(DB_FOLDER_PATH, { recursive: true });

    // 2. 读取目录下的所有文件名
    const files = await fs.readdir(DB_FOLDER_PATH);

    // 3. 过滤出只以 .json 结尾的文件
    const workflowFiles = files.filter(file => file.endsWith('.json'));

    console.log(`[成功] 发现 ${workflowFiles.length} 个工作流文件。`);
    // 4. 将文件名数组以 JSON 格式返回给前端
    res.status(200).json({ success: true, data: workflowFiles });

  } catch (error) {
    console.error('[失败] 读取目录时发生错误:', error);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// --- [新功能] “根据文件名获取单个工作流” API 路由 ---
app.get('/api/workflow', async (req, res) => {
  // 1. 从 URL 查询参数中获取文件名
  const { filename } = req.query;
  console.log(`--- [请求到达] 后端收到加载请求，请求文件: ${filename} ---`);

  // 2. 校验文件名是否存在
  if (!filename || typeof filename !== 'string') {
    return res.status(400).json({ success: false, message: '请求无效，缺少文件名。' });
  }

  try {
    // 3. (安全关键) 再次清理文件名，防止路径遍历攻击
    const safeFilename = filename.replace(/[\/\\]/g, '');
    const fullPath = path.join(DB_FOLDER_PATH, safeFilename);

    // 4. 读取文件内容
    const fileContent = await fs.readFile(fullPath, 'utf8');

    // 5. 将读取到的字符串内容，解析成 JSON 对象
    const workflowData = JSON.parse(fileContent);
    
    console.log(`[成功] 已读取文件: ${fullPath}`);
    res.status(200).json({ success: true, data: workflowData });

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`[失败] 文件未找到: ${filename}`);
      return res.status(404).json({ success: false, message: '文件不存在' });
    }
    console.error('[失败] 读取或解析文件时发生错误:', error);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});


app.listen(PORT, () => {
  console.log(`后端服务器(支持动态文件名)正在 http://localhost:${PORT} 上运行...`);
});