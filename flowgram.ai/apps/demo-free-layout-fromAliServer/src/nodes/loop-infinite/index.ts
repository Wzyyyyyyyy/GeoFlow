/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { nanoid } from 'nanoid';
import {
  WorkflowNodeEntity,
  PositionSchema,
  FlowNodeTransformData,
} from '@flowgram.ai/free-layout-editor';
import { createBatchOutputsFormPlugin, provideBatchInputEffect } from '@flowgram.ai/form-materials';

import { defaultFormMeta } from '../default-form-meta';
import { FlowNodeRegistry } from '../../typings';
import iconLoopInfinite from '../../assets/icon-loopInfinite.png';
import { LoopInfiniteFormRender } from './loopinfinite-form-render';
import { WorkflowNodeType } from '../constants';

let index = 0;
export const LoopInfiniteNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.LoopInfinite,
  category: '流程控制',
  info: {
    icon: iconLoopInfinite,
    description:
      '无限循环节点、需要使用条件判断打断循环',
  },
  meta: {
    /**
     * Mark as subcanvas
     * 子画布标记
     */
    isContainer: true,
    nodePanelVisible: true,
    /**
     * The subcanvas default size setting
     * 子画布默认大小设置
     */
    size: {
      width: 424,
      height: 244,
    },
    /**
     * The subcanvas padding setting
     * 子画布 padding 设置
     */
    padding: () => ({
      top: 120,
      bottom: 60,
      left: 100,
      right: 100,
    }),
    /**
     * Controls the node selection status within the subcanvas
     * 控制子画布内的节点选中状态
     */
    selectable(node: WorkflowNodeEntity, mousePos?: PositionSchema): boolean {
      if (!mousePos) {
        return true;
      }
      const transform = node.getData<FlowNodeTransformData>(FlowNodeTransformData);
      // 鼠标开始时所在位置不包括当前节点时才可选中
      return !transform.bounds.contains(mousePos.x, mousePos.y);
    },
    expandable: false, // disable expanded
    wrapperStyle: {
      minWidth: 'unset',
      width: '100%',
    },
  },
  onAdd() {
    return {
      id: `LoopInfinite_${nanoid(5)}`,
      type: WorkflowNodeType.LoopInfinite,
      data: {
        title: `无限循环_${++index}`,
      },
      blocks: [
        {
          id: `block_start_${nanoid(5)}`,
          type: WorkflowNodeType.BlockStart,
          meta: {
            position: {
              x: -320,
              y: 176,
            },
          },
          data: {},
        },
        {
          id: `block_end_${nanoid(5)}`,
          type: WorkflowNodeType.BlockEnd,
          meta: {
            position: {
              x: 320,
              y: 120,
            },
          },
          data: {},
        },
        {
          id: `block_condition_${nanoid(5)}`,
          type: WorkflowNodeType.Condition,
          meta: {
            position: {
              x: -4.1744385725905886e-14,
              y: 133.99999999999994,
            },
          },
          data: {
            title:'循环 break 条件',
            conditions: [
              {
                key: "if_vhjLSh",
                value: {
                  type: "expression",
                  content: ""
                }
              }
            ]
          },
        },
        {
          id: `block_break_${nanoid(5)}`,
          type: WorkflowNodeType.Break, // 使用我们之前定义的 BlockBreak 类型
          meta: {
            position: { x: 320, y: 220}, // 把它放在 Start 和 End 的中间
          },
          data: {
            title: 'Break', // 可以给它一个默认标题
          },
        },
      ],
    };
  },
  formMeta: {
    ...defaultFormMeta,
    render: LoopInfiniteFormRender,
    effect: {
      LoopBreakFor: provideBatchInputEffect,
    },
    plugins: [createBatchOutputsFormPlugin({ outputKey: 'LoopBreakOutputs' })],
  },
};
