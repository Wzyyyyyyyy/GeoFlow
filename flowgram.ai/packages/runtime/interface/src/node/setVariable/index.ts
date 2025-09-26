// 文件: packages/runtime/interface/src/node/SetVariable/index.ts

import { IJsonSchema } from '@schema/json-schema';
import { WorkflowNodeSchema } from '@schema/node';
import { FlowGramNode } from '@node/constant';

/**
 * SetVariableNodeData 接口
 * 定义了 'SetVariable' 类型节点核心的 data 对象的结构。
 * 由于我们的 SetVariable 节点目前只是一个占位符，
 * 它的 data 结构可以非常简单。
 */
interface SetVariableNodeData {
  /**
   * 节点标题
   */
  title: string;

  /**
   * 定义节点的输入（可选）
   */
  inputs?: IJsonSchema<'object'>;

  /**
   * 定义节点的输出（可选）
   */
  outputs?: IJsonSchema<'object'>;
}

/**
 * SetVariableNodeSchema 类型别名
 * 它使用通用的 WorkflowNodeSchema 泛型，
 * 将 'SetVariable' 这个节点类型标识，与我们上面定义的 SetVariableNodeData 数据结构绑定在一起，
 * 从而创建出一个完整的、类型安全的 SetVariable 节点定义。
 */
export type SetVariableNodeSchema = WorkflowNodeSchema<FlowGramNode.SetVariable, SetVariableNodeData>;