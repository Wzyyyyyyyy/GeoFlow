// 文件: src/nodes/set-variable/set-variable-form-render.tsx (简化版)

import React from 'react';
import { nanoid } from 'nanoid';
import {
  FormRenderProps,
  Field,
  FieldArray,
  FlowNodeJSON,
  type IField,
  type IFieldArray,
  type FieldState,
} from '@flowgram.ai/free-layout-editor';
import { Button } from '@douyinfe/semi-ui';
import { IconPlus, IconCrossCircleStroked } from '@douyinfe/semi-icons';
// 1. 我们现在只需要 VariableSelector
import { VariableSelector } from '@flowgram.ai/form-materials';

import { useNodeRenderContext } from '../../hooks';
import { FormHeader, FormContent, FormItem, Feedback } from '../../form-components';

// 2. 简化每一行的数据结构，只保留目标变量
interface Assignment {
  targetVariable?: string[];
}

// 定义整个表单的数据结构
interface SetVariableNodeJSON extends FlowNodeJSON {
  data: {
    assignments: Assignment[];
  };
}

export const SetVariableFormRender = ({ form }: FormRenderProps<SetVariableNodeJSON>) => {
  const { readonly } = useNodeRenderContext();

  return (
    <>
      <FormHeader />
      <FormContent>
        <FieldArray name="assignments">
          {({ field }: { field: IFieldArray<Assignment[]> }) => (
            <>
              {field.map((child: any, index: number) => (
                <div key={child.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: '8px' }}>
                  
                  {/* 3. 只保留左侧的变量选择器 */}
                  <div style={{ flex: 1 }}>
                    <Field<string[] | undefined> name={`${child.name}.targetVariable`}>
                      {({ field: targetField, fieldState }: { field: IField<string[] | undefined>, fieldState: FieldState }) => (
                        <FormItem name="targetVariable" type="any"> 
                          <VariableSelector
                            value={targetField.value}
                            onChange={(val) => targetField.onChange(val)}
                            readonly={readonly}
                            hasError={Object.keys(fieldState?.errors || {}).length > 0}
                          />
                           <Feedback errors={fieldState?.errors} />
                        </FormItem>
                      )}
                    </Field>
                  </div>

                  {/* 4. 移除 "=" 符号和右侧的值输入框 */}

                  {/* 删除按钮 */}
                  <Button
                    theme="borderless"
                    type="tertiary"
                    icon={<IconCrossCircleStroked />}
                    onClick={() => field.delete(index)}
                  />
                </div>
              ))}

              {/* 添加按钮 */}
              {!readonly && (
                <Button
                  theme="borderless"
                  icon={<IconPlus />}
                  onClick={() =>
                    // 5. append 一个空对象即可
                    field.append({})
                  }
                >
                  添加变量
                </Button>
              )}
            </>
          )}
        </FieldArray>
      </FormContent>
    </>
  );
};