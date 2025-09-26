/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useState, useEffect, useCallback } from 'react';

import { useClientContext, getNodeForm, FlowNodeEntity,WorkflowJSON } from '@flowgram.ai/free-layout-editor';
import { Button, Badge } from '@douyinfe/semi-ui';
import { IconPlay } from '@douyinfe/semi-icons';

import { TestRunSidePanel } from '../testrun-panel';

import styles from './index.module.less';

export function TestRunButton(props: { disabled: boolean }) {
  const [errorCount, setErrorCount] = useState(0);
  const clientContext = useClientContext();
  const [visible, setVisible] = useState(false);

  const updateValidateData = useCallback(() => {
    const allForms = clientContext.document.getAllNodes().map((node) => getNodeForm(node));
    const count = allForms.filter((form) => form?.state.invalid).length;
    setErrorCount(count);
  }, [clientContext]);

  /**
   * Validate all node and Save
   */

  //!!!原先代码
  const onTestRun = useCallback(async () => {
    const allForms = clientContext.document.getAllNodes().map((node) => getNodeForm(node));
    await Promise.all(allForms.map(async (form) => form?.validate()));
    console.log('>>>>> save data: ', clientContext.document.toJSON());
    setVisible(true);
    //持久化操作应该放置的地方
  }, [clientContext]);

  /**
   * Validate all node and Save
   */
  // const onTestRun = useCallback(async () => {
  //   // 步骤 1: 数据校验 (保持不变)
  //   const allForms = clientContext.document.getAllNodes().map((node) => getNodeForm(node));
  //   await Promise.all(allForms.map(async (form) => form?.validate()));

  //   // 步骤 2: 序列化并【声明】变量 (这是您可能遗漏的关键步骤)
  //   // 必须先调用 toJSON() 并将其结果赋值给一个变量，比如 workflowDataToSave
  //   const workflowDataToSave: WorkflowJSON = clientContext.document.toJSON();
    
  //   // 现在，编译器已经认识了 workflowDataToSave 这个变量
  //   console.log('前端准备发送的数据: ', workflowDataToSave);

  //   // 步骤 3: 【使用】变量，进行持久化操作
  //   try {
  //     const response = await fetch('http://localhost:8088/api/save', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       // 在这里使用 workflowDataToSave 变量
  //       body: JSON.stringify(workflowDataToSave), 
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       console.log('前端收到成功回执:', result.message);
  //     } else {
  //       console.error('前端收到失败回执:', result.message);
  //     }
  //   } catch (error) {
  //     console.error('发送数据到后端时发生网络错误:', error);
  //   }

  //   // 步骤 4: 打开侧边栏 (保持不变)
  //   setVisible(true);
  // }, [clientContext]);

  /**
   * Listen single node validate
   */
  useEffect(() => {
    const listenSingleNodeValidate = (node: FlowNodeEntity) => {
      const form = getNodeForm(node);
      if (form) {
        const formValidateDispose = form.onValidate(() => updateValidateData());
        node.onDispose(() => formValidateDispose.dispose());
      }
    };
    clientContext.document.getAllNodes().map((node) => listenSingleNodeValidate(node));
    const dispose = clientContext.document.onNodeCreate(({ node }) =>
      listenSingleNodeValidate(node)
    );
    return () => dispose.dispose();
  }, [clientContext]);

  const button =
    errorCount === 0 ? (
      <Button
        disabled={props.disabled}
        onClick={onTestRun}
        icon={<IconPlay size="small" />}
        className={styles.testrunSuccessButton}
      >
        Test Run
      </Button>
    ) : (
      <Badge count={errorCount} position="rightTop" type="danger">
        <Button
          type="danger"
          disabled={props.disabled}
          onClick={onTestRun}
          icon={<IconPlay size="small" />}
          className={styles.testrunErrorButton}
        >
            Test Run
        </Button>
      </Badge>
    );

  return (
    <>
      {button}
      <TestRunSidePanel visible={visible} onCancel={() => setVisible(false)} />
    </>
  );
}
