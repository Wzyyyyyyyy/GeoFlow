/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FormRenderProps, FlowNodeJSON, Field } from '@flowgram.ai/free-layout-editor';
import { SubCanvasRender } from '@flowgram.ai/free-container-plugin';
import { BatchOutputs, BatchVariableSelector, IFlowRefValue } from '@flowgram.ai/form-materials';

import { useIsSidebar, useNodeRenderContext } from '../../hooks';
import { FormHeader, FormContent, FormOutputs, FormItem, Feedback } from '../../form-components';

interface LoopBreakNodeJSON extends FlowNodeJSON {
  data: {
    LoopBreakFor: IFlowRefValue;
  };
}


export const LoopInfiniteFormRender = ({ form }: FormRenderProps<LoopBreakNodeJSON>) => {
  const isSidebar = useIsSidebar();
  const { readonly } = useNodeRenderContext();
  const formHeight = 85;

  const LoopFor = (
    <Field<IFlowRefValue> name={`LoopFor`}>
      {({ field, fieldState }) => (
        <FormItem name={'LoopFor'} type={'array'} required>
          <BatchVariableSelector
            style={{ width: '100%' }}
            value={field.value?.content}
            onChange={(val) => field.onChange({ type: 'ref', content: val })}
            readonly={readonly}
            hasError={Object.keys(fieldState?.errors || {}).length > 0}
          />
          <Feedback errors={fieldState?.errors} />
        </FormItem>
      )}
    </Field>
  );

  const LoopOutputs = (
    <Field<Record<string, IFlowRefValue | undefined> | undefined> name={`LoopOutputs`}>
      {({ field, fieldState }) => (
        <FormItem name="LoopOutputs" type="object" vertical>
          <BatchOutputs
            style={{ width: '100%' }}
            value={field.value}
            onChange={(val) => field.onChange(val)}
            readonly={readonly}
            hasError={Object.keys(fieldState?.errors || {}).length > 0}
          />
          <Feedback errors={fieldState?.errors} />
        </FormItem>
      )}
    </Field>
  );

  if (isSidebar) {
    return (
      <>
        <FormHeader />
        <FormContent>
          {/* {LoopFor} */}
          {LoopOutputs}
          <FormOutputs />
        </FormContent>
      </>
    );
  }
  return (
    <>
      <FormHeader />
      <FormContent>
        {LoopFor}
        <SubCanvasRender offsetY={-formHeight} />
        <FormOutputs />
      </FormContent>
    </>
  );
};
