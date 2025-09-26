// 文件: packages/runtime/interface/src/node/module/index.ts

import { IJsonSchema } from '@schema/json-schema';
import { WorkflowNodeSchema } from '@schema/node';
import { FlowGramNode } from '@node/constant';

/**
 * ModuleNodeData 接口
 * 定义了 'module' 类型节点核心的 data 对象的结构。
 * 由于我们的 module 节点目前只是一个占位符，
 * 它的 data 结构可以非常简单。
 */
interface ModuleNodeData {
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
 * ModuleNodeSchema 类型别名
 * 它使用通用的 WorkflowNodeSchema 泛型，
 * 将 'Module' 这个节点类型标识，与我们上面定义的 ModuleNodeData 数据结构绑定在一起，
 * 从而创建出一个完整的、类型安全的 Module 节点定义。
 */
export type ModuleNodeSchema = WorkflowNodeSchema<FlowGramNode.Module, ModuleNodeData>;