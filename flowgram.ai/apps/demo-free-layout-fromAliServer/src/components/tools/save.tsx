/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useState, useCallback } from 'react';
import { useClientContext } from '@flowgram.ai/free-layout-editor';
// ↓↓ 1. 从 Semi UI 额外引入 Modal 和 Input 组件 ↓↓
import { Button, Toast, Modal, Input } from '@douyinfe/semi-ui';
import { IconSave } from '@douyinfe/semi-icons'; // 引入图标

// 注意：我们将原有的 Save 组件重命名为了 SaveButton，因为这个文件只负责按钮本身
export function Save(props: { disabled: boolean }) {
  const clientContext = useClientContext();
  
  // 2. 增加两个新的状态
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制模态框的显示和隐藏
  const [filename, setFilename] = useState('');                 // 存储用户输入的文件名

  // 3. 这是点击主“Save”按钮时触发的函数
  const showSaveModal = () => {
    // 只是打开模态框，并设置一个默认文件名
    setFilename(`workflow-${Date.now()}`); 
    setIsModalVisible(true);
  };

  // 4. 这是在模态框里点击“确定”时，真正执行保存的函数
  const handleOk = async () => {
    if (!filename) {
      Toast.warning('请输入文件名！');
      return;
    }
    
    console.log(`准备保存，文件名为: ${filename}`);
    const workflowData = clientContext.document.toJSON();

    try {
      // 5. 将文件名和工作流数据一起发送
      const response = await fetch('http://localhost:8088/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename, workflowData }), // <-- 关键改动在这里！
      });

      const result = await response.json();
      if (result.success) {
        Toast.success(result.message);
      } else {
        Toast.error(result.message);
      }
    } catch (error) {
      Toast.error('保存失败，无法连接到后端服务器。');
      console.error('网络请求失败:', error);
    }

    // 6. 无论成功失败，最后都关闭模态框
    setIsModalVisible(false);
  };

  return (
    <>
      {/* 7. 这是页面上我们能看到的那个按钮，它的 onClick 现在只负责打开模态框 */}
      <Button
        disabled={props.disabled}
        onClick={showSaveModal}
        icon={<IconSave size="small" />}
      >
        Save
      </Button>

      {/* 8. 这是弹出的模态框组件，平时是隐藏的 */}
      <Modal
        title="保存工作流"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText="确定保存"
        cancelText="取消"
      >
        <p>请输入要保存的文件名：</p>
        <Input 
          value={filename}
          onChange={(value) => setFilename(value)} // 实时更新文件名状态
          placeholder="例如：my-first-workflow"
        />
      </Modal>
    </>
  );
}