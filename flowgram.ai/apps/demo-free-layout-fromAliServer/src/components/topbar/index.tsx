// 文件: src/components/topbar/index.tsx

// import React from 'react';
// import styled from 'styled-components';
// import { Tooltip, IconButton, Divider } from '@douyinfe/semi-ui';
// import { useClientContext } from '@flowgram.ai/free-layout-editor';

// // 注意：请根据您项目的实际文件路径，检查并修正下面的 import 路径！
// import { AddNode } from '../add-node';
// import { Save } from '../tools/save';
// import { LoadButton } from '../tools/load';
// import { TestRunButton } from '../testrun/testrun-button';

// // --- 样式定义 ---
// const BarContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   width: 100%;
//   z-index: 1000;
  
//   display: flex;
//   // ↓↓ 1. 核心修改：将 justify-content 改为 space-between ↓↓
//   justify-content: space-between; /* 子元素将在主轴上两端对齐 */
//   align-items: center;
  
//   height: 40px;
//   padding: 0 12px;
//   background-color: white;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
//   box-sizing: border-box;
// `;

// // 新增一个 div 用于包裹按钮组
// const ButtonGroup = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px; /* 组内按钮的间距 */
// `;

// const Title = styled.span`
//   font-weight: 600;
//   color: #333;
// `;


// // --- TopBar 组件 ---
// export function TopBar() {
//   console.log('[TopBar] 组件正在重新渲染...');
//   const { playground, workflowName } = useClientContext();
//   console.log(`[TopBar] 当前收到的 workflowName 是: "${workflowName}"`);
//   const disabled = playground?.config.readonly || false;

//   return (
//     <BarContainer>
//       {/* 2. 将按钮分为左右两组 */}
//       <ButtonGroup>
//         {/* 左侧的按钮组可以留空，或者放 Logo/标题等 */}
//         <Title>{workflowName}</Title>
//       </ButtonGroup>

//       <ButtonGroup>
//         {/* 右侧的按钮组 */}
//         <LoadButton disabled={disabled} />
//         <Divider layout="vertical" style={{ height: '16px' }} margin={3} />
//         <Save disabled={disabled} />
//         {/* <AddNode disabled={disabled} />
//         <TestRunButton disabled={disabled} /> */}
//       </ButtonGroup>
//     </BarContainer>
//   );
// }
// 文件: src/components/topbar/index.tsx (最终修正版)

import React, { useState, useEffect } from 'react'; // 1. 确保导入了 useState 和 useEffect
import styled from 'styled-components';
import { useClientContext } from '@flowgram.ai/free-layout-editor';

// 2. 导入我们创建的事件服务
import { workflowNameService } from '../../services/WorkflowNameService';

// --- 3. 使用您之前版本中所有【正确】的 import 路径 ---
import { AddNode } from '../add-node';
import { Save } from '../tools/save';
import { LoadButton } from '../tools/load';
import { TestRunButton } from '../testrun/testrun-button';
import { Divider } from '@douyinfe/semi-ui'; // 补上 Divider 的导入

// --- 样式定义 (保持不变) ---
const BarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.span`
  font-weight: 600;
  color: #333;
`;

// --- TopBar 组件 ---
export function TopBar() {
  const { playground } = useClientContext();
  const disabled = playground?.config.readonly || false;

  // 4. TopBar 拥有自己的、用于显示的 title 状态
  const [title, setTitle] = useState('未命名工作流');

  // 5. 使用 useEffect 来订阅“名称变更”事件
  useEffect(() => {
    // 当组件第一次加载时，开始监听
    const disposable = workflowNameService.onChange((newName) => {
      setTitle(newName); // 收到广播，更新自己的 state
    });

    // 当组件被卸载时，自动取消监听
    return () => {
      disposable.dispose();
    };
  }, []); // 空依赖数组确保只订阅一次

  return (
    <BarContainer>
      <ButtonGroup>
        {/* 6. 显示组件自己的 state */}
        <Title> 
        <span >工作流：</span> 
        <span style={{ color: '#0163f9' }}>{title}</span>
        </Title>
      </ButtonGroup>

      <ButtonGroup>
        {/* 右侧的按钮组 (保留您之前的结构) */}
        <Save disabled={disabled} />
        <LoadButton disabled={disabled} />
        {/* <AddNode disabled={disabled} />
        <TestRunButton disabled={disabled} /> */}
      </ButtonGroup>
    </BarContainer>
  );
}