// 文件: src/services/WorkflowNameService.ts

import { Emitter } from '@flowgram.ai/free-layout-editor'; // 从核心库导入事件发射器

// 创建一个 Emitter 实例，专门用来广播 string 类型的“新名称”
const nameChangeEmitter = new Emitter<string>();

// 导出一个单例对象，包含发射事件和监听事件的方法
export const workflowNameService = {
  /**
   * 当名称需要改变时，调用这个方法来“广播”新名称
   * @param name - 新的工作流名称
   */
  setName: (name: string) => {
    nameChangeEmitter.fire(name);
  },
  /**
   * 当组件需要监听名称变化时，调用这个方法来“订阅”
   * @param callback - 收到新名称时要执行的回调函数
   * @returns a disposable object to unsubscribe
   */
  onChange: (callback: (name: string) => void) => {
    return nameChangeEmitter.event(callback);
  },
};