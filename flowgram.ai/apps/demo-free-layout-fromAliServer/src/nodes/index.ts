/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '../typings';
import { StartNodeRegistry } from './start';
import { LoopNodeRegistry } from './loop';
import { LLMNodeRegistry } from './llm';
import { EndNodeRegistry } from './end';
import { ConditionNodeRegistry } from './condition';
import { CommentNodeRegistry } from './comment';
import { BlockStartNodeRegistry } from './block-start';
import { BlockEndNodeRegistry } from './block-end';
export { WorkflowNodeType } from './constants';

import { DockerNodeRegistry } from './docker';
import { GPPNodeRegistry } from './gpp';
import { MPINodeRegistry } from './mpi';
import { DiskinNodeRegistry } from './diskin';
import { DiskoutNodeRegistry } from './diskout';
import { LoopInfiniteNodeRegistry } from './loop-infinite';
import { BlockBreakNodeRegistry } from './block-break';
import { LoopCountRegistry } from './loop-count';
import { ModuleNodeRegistry } from './module';
import { SetVariableNodeRegistry } from './setVariable';


export const nodeRegistries: FlowNodeRegistry[] = [
  ConditionNodeRegistry,
  StartNodeRegistry,
  EndNodeRegistry,
  LLMNodeRegistry,
  LoopNodeRegistry,
  CommentNodeRegistry,
  BlockStartNodeRegistry,
  BlockEndNodeRegistry,
  BlockBreakNodeRegistry,
  DockerNodeRegistry,
  GPPNodeRegistry,
  MPINodeRegistry,
  DiskinNodeRegistry,
  DiskoutNodeRegistry,
  LoopInfiniteNodeRegistry,
  LoopCountRegistry,
  ModuleNodeRegistry,
  SetVariableNodeRegistry,
];
