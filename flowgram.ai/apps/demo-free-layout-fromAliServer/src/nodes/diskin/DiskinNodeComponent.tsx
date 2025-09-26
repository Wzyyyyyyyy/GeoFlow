/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect, useState, CSSProperties } from 'react';
import {
  FlowNodeEntity,
  FlowNodeFormData,
  useClientContext,
} from '@flowgram.ai/free-layout-editor';
import { Input, Tooltip } from '@douyinfe/semi-ui';

// --- 样式定义 (保持不变) ---
const nodeCardStyle: CSSProperties = { /* ... */ };
const nodeHeaderStyle: CSSProperties = { /* ... */ };
const nodeIconStyle: CSSProperties = { /* ... */ };
const nodeTitleStyle: CSSProperties = { /* ... */ };
const nodeContentStyle: CSSProperties = { /* ... */ };

// --- Docker 节点的 UI 组件 ---
export function DockerNodeComponent({ node }: { node: FlowNodeEntity }) {
  const { playground } = useClientContext();
  const formData = node.getData(FlowNodeFormData) as FlowNodeFormData;

  // 1. 从 formData.toJSON() 获取初始值
  const [title, setTitle] = useState(formData.toJSON()?.title || '');
  const [imageName, setImageName] = useState(formData.toJSON()?.imageName || '');
  const [host, setHost] = useState(formData.toJSON()?.host || '');
  const [isEditing, setIsEditing] = useState(false);

  // 2. useEffect 监听数据变化，并通过 toJSON() 获取最新值来同步 state
  useEffect(() => {
    const dispose = formData.onDataChange(() => {
      const newValues = formData.toJSON() || {}; // 调用 toJSON() 获取最新数据快照
      setTitle(newValues.title || '');
      setImageName(newValues.imageName || '');
      setHost(newValues.host || '');
    });
    return () => dispose.dispose();
  }, [formData]);

  const handleDoubleClick = () => {
    if (playground.config.readonly) return;
    setIsEditing(true);
  };

  // 写入数据的 updateFormValues 方法是正确的，保持不变
  const handleTitleSave = () => {
    formData.updateFormValues({ title });
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleTitleSave();
    } else if (event.key === 'Escape') {
      // 同样通过 toJSON() 来恢复原始标题
      setTitle(formData.toJSON()?.title || '');
      setIsEditing(false);
    }
  };

  return (
    <div style={nodeCardStyle}>
      <div style={nodeHeaderStyle}>
        <img src={node.getNodeRegistry().info.icon} alt="icon" style={nodeIconStyle} />
        {isEditing ? (
          <Input
            value={title}
            autoFocus
            onChange={(value) => setTitle(value)}
            onBlur={handleTitleSave}
            onKeyDown={handleKeyDown}
            style={nodeTitleStyle}
          />
        ) : (
          <Tooltip content="双击编辑标题">
            <span style={nodeTitleStyle} onDoubleClick={handleDoubleClick}>
              {title || '未命名节点'}
            </span>
          </Tooltip>
        )}
      </div>
      {/* 3. 内容部分从 state 中读取数据 */}
      <div style={nodeContentStyle}>
        <p>Image: {imageName}</p>
        <p>Host: {host}</p>
      </div>
    </div>
  );
}