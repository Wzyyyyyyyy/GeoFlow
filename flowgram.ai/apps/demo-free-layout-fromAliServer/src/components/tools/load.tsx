// // 文件: src/components/tools/load.tsx (最终版)

import React, { useState, useCallback } from 'react';
import { useClientContext } from '@flowgram.ai/free-layout-editor';
import { Button, Toast, Modal, List, Spin } from '@douyinfe/semi-ui';
import { IconUpload } from '@douyinfe/semi-icons';

import styles from './load.module.less';

import { workflowNameService } from '../../services/WorkflowNameService'; // <-- 1. 导入广播站

export function LoadButton(props: { disabled: boolean }) {
  const { document,setWorkflowName } = useClientContext();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 新增一个状态，防止重复点击加载

  const showLoadModal = useCallback(async () => {
    setIsModalVisible(true);
    setIsLoading(true);
    setSelectedFile(null);

    try {
      const response = await fetch('http://localhost:8088/api/workflows');
      const result = await response.json();
      if (result.success) {
        setFileList(result.data);
        
      } else {
        Toast.error(result.message);
        setFileList([]);
      }
    } catch (error) {
      Toast.error('获取文件列表失败，无法连接服务器。');
      setFileList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- ↓↓ 这是我们本次修改的核心 ↓↓ ---
  const handleOk = async () => {
    if (!selectedFile) {
      Toast.warning('请先选择一个要加载的文件！');
      return;
    }
    
    setIsSubmitting(true); // 开始加载，禁用按钮

    try {
      // 1. 根据选中的文件名，向新的后端接口请求文件内容
      const response = await fetch(`http://localhost:8088/api/workflow?filename=${encodeURIComponent(selectedFile)}`);
      const result = await response.json();

      if (result.success) {
        // 2. 这是最关键的一步！调用 document 的 reload 方法更新画布
        await document.reload(result.data);
        Toast.success(`工作流 "${selectedFile}" 加载成功！`);
        setIsModalVisible(false); // 加载成功后关闭模态框
        // 2.【核心修改】通过广播站“发射”新名称事件
        workflowNameService.setName(selectedFile.replace('.json', '')); 
        console.log(`[LoadButton] 信号已发出：新的 workflowName 是 "${selectedFile.replace('.json', '')}"`);
      } else {
        Toast.error(result.message);
      }
    } catch (error) {
      Toast.error('加载失败，无法连接服务器或文件内容损坏。');
    } finally {
      setIsSubmitting(false); // 加载结束，恢复按钮
    }
  };
  
  return (
    <>
      <Button
        disabled={props.disabled}
        onClick={showLoadModal}
        icon={<IconUpload size="small" />}
        // type="tertiary"
        // theme="borderless"
      >
        Load
      </Button>

      <Modal
        title="加载工作流"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText="加载"
        cancelText="取消"
        confirmLoading={isSubmitting} // 让“加载”按钮显示 loading 动画
        width={400}
        bodyStyle={{ maxHeight: 300, overflow: 'auto' }}
      >
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '30px' }}>
            <Spin />
            <p>正在获取文件列表...</p>
          </div>
        ) : (
          <List
            dataSource={fileList}
            renderItem={(item) => (
              <List.Item 
                className={selectedFile === item ? styles.selectedItem : ''}
                onClick={() => setSelectedFile(item)}
              >
                {item}
              </List.Item>
            )}
          />
        )}
      </Modal>
    </>
  );
}

// 文件: src/components/tools/load.tsx (事件发送版)

// import React, { useState, useCallback } from 'react';
// import { useClientContext } from '@flowgram.ai/free-layout-editor';
// import { Button, Toast, Modal, List, Spin } from '@douyinfe/semi-ui';
// import { IconUpload } from '@douyinfe/semi-icons';

// import { workflowNameService } from '../../services/WorkflowNameService'; // <-- 1. 导入广播站
// import styles from './index.module.less';

// export function LoadButton(props: { disabled: boolean }) {
//   const { document } = useClientContext();
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [fileList, setFileList] = useState<string[]>([]);
//   const [selectedFile, setSelectedFile] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const showLoadModal = useCallback(async () => {
//     // ... (这部分逻辑保持不变)
//     setIsModalVisible(true);
//     setIsLoading(true);
//     setSelectedFile(null);
//     try {
//       const response = await fetch('http://localhost:8088/api/workflows');
//       const result = await response.json();
//       if (result.success) { setFileList(result.data); } 
//       else { Toast.error(result.message); setFileList([]); }
//     } catch (error) {
//       Toast.error('获取文件列表失败，无法连接服务器。');
//       setFileList([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const handleOk = async () => {
//     if (!selectedFile) {
//       Toast.warning('请先选择一个要加载的文件！');
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const response = await fetch(`http://localhost:8088/api/workflow?filename=${encodeURIComponent(selectedFile)}`);
//       const result = await response.json();
//       if (result.success) {
//         await document.reload(result.data);
//         const newName = selectedFile.replace('.json', '');

//         // 2.【核心修改】通过广播站“发射”新名称事件
//         workflowNameService.setName(newName); 

//         Toast.success(`工作流 "${selectedFile}" 加载成功！`);
//         setIsModalVisible(false);
//       } else {
//         Toast.error(result.message);
//       }
//     } catch (error) {
//       Toast.error('加载失败，无法连接服务器或文件内容损坏。');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Button disabled={props.disabled} onClick={showLoadModal} /* ... */ >
//         Load
//       </Button>
//       <Modal onOk={handleOk} /* ... */ >
//         {/* ... (Modal 内容不变) ... */}
//       </Modal>
//     </>
//   );
// }