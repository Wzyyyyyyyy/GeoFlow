import { nanoid } from 'nanoid';

import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import iconDiskout from '../../assets/icon-diskout.png';

// ↓↓ 1. 在这里，导入我们刚刚创建的 UI 组件 ↓↓
import { DockerNodeComponent } from './DiskoutNodeComponent'; 

let index = 0;
export const DiskoutNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Diskout,
  category: '数据IO',
  info: {
    icon: iconDiskout,
    description: '在指定的主机上运行一个 Docker 容器',
  },
  meta: {
    nodePanelVisible: true,
    component: DockerNodeComponent, 
    size: {
      width: 380,
      height: 420,
    },
  },
  onAdd() {
    const title = `Docker Container ${++index}`; // 先生成一个唯一的默认标题
    return {
      id: `docker_${nanoid(5)}`,
      type: WorkflowNodeType.Docker,
      data: {
        // --- 核心修改在这里 ---
        inputsValues: {
          // 1. 将 title 的初始值放在这里，作为表单字段的默认内容
          title: {
            type: 'constant',
            content: title,
          },
          host: {
            type: 'constant',
            content: 'unix:///var/run/docker.sock',
          },
          imageName: {
            type: 'constant',
            content: 'hello-world',
          },
          forcePull: {
            type: 'constant',
            content: false,
          },
          // 其他字段的默认值...
          containerName: { type: 'constant', content: '' },
          command: { type: 'constant', content: '' },
          envVars: { type: 'constant', content: '' },
          ports: { type: 'constant', content: '' },
          volumes: { type: 'constant', content: '' },
        },
        
        // 2. 这里的 inputs 结构，我们上次已经定义好了 title，它告诉表单引擎“需要渲染一个 title 输入框”
        inputs: {
          type: 'object',
          required: ['imageName', 'title'],
          properties: {
            title: {
              type: 'string',
              title: '节点标题', // 这是输入框左侧显示的标签
            },
            host: {
              type: 'string',
              title: '主机地址',
            },
            imageName: {
              type: 'string',
              title: '镜像名称',
            },
            // ... 其他所有字段的定义 ...
            forcePull: { type: 'boolean', title: '总是拉取最新镜像' },
            containerName: { type: 'string', title: '容器名称 (可选)' },
            command: { type: 'string', title: '启动命令 (可选)' },
            envVars: { type: 'string', title: '环境变量 (可选)', extra: { formComponent: 'textarea' } },
            ports: { type: 'string', title: '端口映射 (可选)', extra: { placeholder: '例如: 8080:80' } },
            volumes: { type: 'string', title: '数据卷挂载 (可选)', extra: { placeholder: '例如: /host/path:/container/path' } },
          },
        },

        outputs: {
          type: 'object',
          properties: {
            containerId: { type: 'string' },
            logs: { type: 'string' },
            status: { type: 'string' },
          },
        },
      },
    };
  },
};