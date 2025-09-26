// /**
//  * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
//  * SPDX-License-Identifier: MIT
//  */

// import { FC } from 'react';

// import { NodePanelRenderProps } from '@flowgram.ai/free-node-panel-plugin';
// import { Popover } from '@douyinfe/semi-ui';

// import { NodePlaceholder } from './node-placeholder';
// import { NodeList } from './node-list';
// import './index.less';

// export const NodePanel: FC<NodePanelRenderProps> = (props) => {
//   const { onSelect, position, onClose, panelProps } = props;
//   const { enableNodePlaceholder } = panelProps;

//   return (
//     <Popover
//       trigger="click"
//       visible={true}
//       onVisibleChange={(v) => (v ? null : onClose())}
//       content={<NodeList onSelect={onSelect} />}
//       placement="right"
//       popupAlign={{ offset: [30, 0] }}
//       overlayStyle={{
//         padding: 0,
//       }}
//     >
//       <div
//         style={
//           enableNodePlaceholder
//             ? {
//                 position: 'absolute',
//                 top: position.y - 61.5,
//                 left: position.x,
//                 width: 360,
//                 height: 100,
//               }
//             : {
//                 position: 'absolute',
//                 top: position.y,
//                 left: position.x,
//                 width: 0,
//                 height: 0,
//               }
//         }
//       >
//         {enableNodePlaceholder && <NodePlaceholder />}
//       </div>
//     </Popover>
//   );
// };

// 文件: src/components/node-panel/index.tsx (升级版)

import { FC } from 'react';
import { NodePanelRenderProps } from '@flowgram.ai/free-node-panel-plugin';
import { Popover } from '@douyinfe/semi-ui';

import { NodePlaceholder } from './node-placeholder';
// ↓↓ 1. 导入我们新的分类面板组件 ↓↓
import { CategorizedNodePanel } from './CategorizedNodePanel';
import './index.less';

export const NodePanel: FC<NodePanelRenderProps> = (props) => {
  const { onSelect, position, onClose, panelProps } = props;
  const { enableNodePlaceholder } = panelProps || {}; // 增加一个安全检查

  return (
    <Popover
      trigger="click"
      visible={true}
      onVisibleChange={(v) => (v ? null : onClose())}
      // ↓↓ 2. 将 content 从 <NodeList /> 替换为 <CategorizedNodePanel /> ↓↓
      content={<CategorizedNodePanel onSelect={onSelect} />}
      placement="right"
      popupAlign={{ offset: [30, 0] }}
      overlayStyle={{
        padding: '12px', // 增加一些内边距
        width: '320px',   // 给面板一个合适的宽度
        borderRadius: '12px',
      }}
    >
      {/* ... 占位符的部分保持不变 ... */}
      <div
        style={
          enableNodePlaceholder
            ? {
                position: 'absolute',
                top: position.y - 61.5,
                left: position.x,
                width: 360,
                height: 100,
              }
            : {
                position: 'absolute',
                top: position.y,
                left: position.x,
                width: 0,
                height: 0,
              }
        }
      >
        {enableNodePlaceholder && <NodePlaceholder />}
      </div>
    </Popover>
  );
};