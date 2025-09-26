// 文件: src/nodes/loop-infinite/executor.ts (修正版)

import {
  ExecutionContext,
  ExecutionResult,
  FlowGramNode,
  IContext,
  IEngine,
  INodeExecutor,
} from '@flowgram.ai/runtime-interface';

/**
 * 无限循环执行器
 */
export class LoopInfiniteExecutor implements INodeExecutor {
  public readonly type = FlowGramNode.LoopInfinite; // 确保类型与节点注册表一致

  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    const engine = context.container.get<IEngine>(IEngine);
    const subNodes = context.node.children;
    const blockStartNode = subNodes.find((node) => node.type === FlowGramNode.BlockStart);

    if (!blockStartNode) {
      throw new Error('LoopInfinite block start node not found');
    }
    
    // --- 核心改造：使用 while(true) 实现无限循环 ---
    while (true) {
    // ↓↓ 核心修正：通过 context.runtime 来访问 statusCenter ↓↓
      if (context.runtime.statusCenter.workflow.terminated) {
        break;
      }

      const subContext = context.runtime.sub();
      subContext.cache.set('parentVariableStore', context.runtime.variableStore); 
      
      try {
        await engine.executeNode({
          context: subContext,
          node: blockStartNode,
        });
      } catch (e) {
        // 子流程执行出错，直接抛出异常，终止整个循环
        throw new Error(`LoopInfinite block execute error: ${(e as Error).message}`);
      }

      // 检查中断信号，这是退出无限循环的唯一正常途径
      if (this.isBreak(subContext)) {
        break; // 跳出 while(true) 循环
      }
      
      if (this.isContinue(subContext)) {
        continue; // 跳过本次循环的剩余部分，直接进入下一次
      }
      
      // (可选) 收集每次循环的输出
      // ... 
    }
    
    return {
      outputs: {},
    };
  }

  /**
   * 检查中断信号的辅助函数
   */
  private isBreak(subContext: IContext): boolean {
    return subContext.cache.get('loop-break') === true;
  }
  
  /**
   * 检查继续信号的辅助函数
   */
  private isContinue(subContext: IContext): boolean {
    return subContext.cache.get('loop-continue') === true;
  }
}