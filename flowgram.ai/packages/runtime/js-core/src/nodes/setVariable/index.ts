// 文件: packages/runtime-js/src/nodes/setVariable/index.ts (最终正确版)

import {
  ExecutionContext,
  ExecutionResult,
  FlowGramNode,
  INodeExecutor,
  IVariableStore,
  SetVariableNodeSchema,
  WorkflowVariableType,
} from '@flowgram.ai/runtime-interface';

type Assignment = SetVariableNodeSchema['data']['assignments'][0];

export class SetVariableNodeExecutor implements INodeExecutor {
  public readonly type = FlowGramNode.SetVariable;

  public async execute(context: ExecutionContext): Promise<ExecutionResult> {
    const nodeData = context.node.data as SetVariableNodeSchema['data'];
    const assignments = nodeData.assignments || [];

    // ↓↓ 关键改动：优先使用从父级传递下来的 variableStore 进行写入 ↓↓
    const storeToWrite =
      (context.runtime.cache.get('parentVariableStore') as IVariableStore) ||
      context.runtime.variableStore;

    for (const assignment of assignments) {
      if (!assignment.targetVariable || assignment.targetVariable.length === 0) {
        continue;
      }
      
      const [scope, variableKey, ...variablePath] = assignment.targetVariable;
      
      // 读取变量时，仍然使用当前的 variableStore，因为它能向上追溯
      const variableResult = context.runtime.variableStore.getValue({
        nodeID: scope,
        variableKey: variableKey,
        variablePath: variablePath.length > 0 ? variablePath : undefined,
      });

      if (!variableResult) {
        console.warn(`Variable not found: ${assignment.targetVariable.join('.')}`);
        continue;
      }

      const { value: currentValue, type } = variableResult;
      if (type !== WorkflowVariableType.Number && type !== WorkflowVariableType.Integer) {
        throw new Error(`Cannot increment a non-number variable: "${variableKey}"`);
      }

      const newValue = ((currentValue || 0) as number) + 1;
      
      console.log(`Updating variable "${variableKey}" in correct scope: ${currentValue} -> ${newValue}`);

      // ↓↓ 使用我们选择的 storeToWrite 来写入变量 ↓↓
      storeToWrite.setVariable({
        nodeID: scope,
        key: variableKey,
        type: type,
        value: newValue,
      });
    }
    
    return {
      outputs: {},
    };
  }
}