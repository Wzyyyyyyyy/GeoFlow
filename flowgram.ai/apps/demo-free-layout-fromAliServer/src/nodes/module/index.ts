/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { nanoid } from 'nanoid';

import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import iconModule from '../../assets/icon-module.png';

let index = 0;
export const ModuleNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Module,
  category: '执行节点',
  info: {
    icon: iconModule,
    description:
      'Call the large language model and use variables and prompt words to generate responses.',
  },
  meta: {
    nodePanelVisible: true,
    size: {
      width: 180,
      height: 390,
    },
  },
  // onAdd() {
  //   return {
  //     id: `llm_${nanoid(5)}`,
  //     type: 'llm',
  //     data: {
  //       title: `LLM_${++index}`,
  //       inputsValues: {
  //         modelName: {
  //           type: 'constant',
  //           content: 'gpt-3.5-turbo',
  //         },
  //         apiKey: {
  //           type: 'constant',
  //           content: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  //         },
  //         apiHost: {
  //           type: 'constant',
  //           content: 'https://mock-ai-url/api/v3',
  //         },
  //         temperature: {
  //           type: 'constant',
  //           content: 0.5,
  //         },
  //         systemPrompt: {
  //           type: 'constant',
  //           content: '# Role\nYou are an AI assistant.\n',
  //         },
  //         prompt: {
  //           type: 'constant',
  //           content: '',
  //         },
  //       },
  //       inputs: {
  //         type: 'object',
  //         required: ['modelName', 'apiKey', 'apiHost', 'temperature', 'prompt'],
  //         properties: {
  //           modelName: {
  //             type: 'string',
  //           },
  //           apiKey: {
  //             type: 'string',
  //           },
  //           apiHost: {
  //             type: 'string',
  //           },
  //           temperature: {
  //             type: 'number',
  //           },
  //           systemPrompt: {
  //             type: 'string',
  //             extra: {
  //               formComponent: 'prompt-editor',
  //             },
  //           },
  //           prompt: {
  //             type: 'string',
  //             extra: {
  //               formComponent: 'prompt-editor',
  //             },
  //           },
  //         },
  //       },
  //       outputs: {
  //         type: 'object',
  //         properties: {
  //           result: { type: 'string' },
  //         },
  //       },
  //     },
  //   };
  // },
};
