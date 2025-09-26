// 文件: packages/runtime-js/src/nodes/module/index.ts

import {
  ExecutionContext,
  ExecutionResult,
  FlowGramNode, // 假设 FlowGramNode 枚举包含了所有节点类型
  INodeExecutor,
} from '@flowgram.ai/runtime-interface';

/**
 * ModuleNodeExecutor 的输入接口
 * 目前为空，因为它只是一个占位符
 */
export interface ModuleExecutorInputs {}

/**
 * ModuleNodeExecutor 类
 * 这是一个最基础的“直通”执行器实现
 */
export class ModuleNodeExecutor implements INodeExecutor {
  /**
   * 必须的 type 属性，用于将执行器与 'module' 类型的节点关联起来
   * 注意: 您需要在 @flowgram.ai/runtime-interface 的 FlowGramNode 枚举中添加 Module 类型
   */
  public readonly type = FlowGramNode.Module;

  /**
   * 核心的 execute 方法
   * @param context - 执行上下文，包含了所有输入和运行时信息
   * @returns 执行结果
   */
  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    const inputs = context.inputs as ModuleExecutorInputs;

    // 打印一条日志，证明这个 Executor 已经被正确调用
    console.log(`--- ModuleNodeExecutor is running for node: ${context.node.id} ---`);
    console.log('Received inputs:', inputs);

    // 将所有收到的输入，原封不动地作为输出返回
    const outputs = { ...inputs };

    console.log('Passing through outputs:', outputs);

    // 返回符合 ExecutionResult 规范的结果
    return {
      outputs,
    };
  }
}