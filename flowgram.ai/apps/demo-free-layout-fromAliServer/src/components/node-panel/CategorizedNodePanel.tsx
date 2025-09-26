// 文件: src/components/node-panel/CategorizedNodePanel.tsx (最终正确版)

import React, { useMemo, useState } from 'react';
import { Typography, Input } from '@douyinfe/semi-ui';
import { FlowNodeRegistry } from '@flowgram.ai/free-layout-editor';
import { groupBy } from 'lodash-es';
import { IconSearch } from '@douyinfe/semi-icons';

// ↓↓ 1. 从正确的源头，直接导入 nodeRegistries 数组 ↓↓
import { nodeRegistries } from '../../nodes'; 
import styles from './index.module.less';

const { Title, Text } = Typography;

interface CategorizedNodePanelProps {
  onSelect: (params: any) => void;
}

export function CategorizedNodePanel({ onSelect }: CategorizedNodePanelProps) {
  // 2. 直接使用导入的 allRegistries，不再需要 useClientContext 或 useService
  const allRegistries = useMemo(() => nodeRegistries || [], []);

  const [searchTerm, setSearchTerm] = useState('');

  // 后续所有代码完全不变...
  const groupedNodes = useMemo(() => {
    const visible = allRegistries.filter(r => r.meta?.nodePanelVisible);
    const filtered = visible.filter(
      (r) =>
        (r.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.info?.description || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    return groupBy(visible, (r) => r.category || '通用');
  }, [allRegistries, searchTerm]);

  return (
    <div className={styles.categorizedPanel}>
      <div className={styles.searchBar}>
        <Input
          prefix={<IconSearch />}
          placeholder="搜索节点、插件、工作流"
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <div className={styles.nodeGrid}>
        {Object.entries(groupedNodes).map(([category, nodes]) => (
          <div key={category} className={styles.categorySection}>
            <Title heading={6} className={styles.categoryTitle}>{category}</Title>
            <div className={styles.nodeItemList}>
              {nodes.map((registry: FlowNodeRegistry) => (
                <div
                  key={registry.type as string}
                  className={styles.nodeItem}
                  onClick={() => onSelect({ nodeType: registry.type, nodeJSON: registry.onAdd?.() })} // onAdd 可能不需要参数
                >
                  <img src={registry.info?.icon} alt={registry.title} className={styles.nodeItemIcon} />
                  
                  <Text className={styles.nodeItemTitle}>{registry.type}</Text>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}