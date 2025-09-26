/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export enum WorkflowNodeType {
  Start = 'start',
  End = 'end',
  LLM = 'llm',
  Condition = 'condition',
  Loop = 'loop-array',
  BlockStart = 'block-start',
  BlockEnd = 'block-end',
  Break = 'break',
  Comment = 'comment',
  Docker = 'Docker',
  GPP = 'GPP',
  MPI = 'MPI',
  Diskin = 'Diskin',
  Diskout = 'Diskout',
  LoopInfinite = 'loop-infinite',
  LoopCount = 'loop-count',
  Module = 'module',
  SetVariable = 'setVariable',
}
