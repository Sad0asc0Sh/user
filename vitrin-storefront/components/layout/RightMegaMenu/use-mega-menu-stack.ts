'use client';
import { useState } from 'react';
import { Category } from './data';

export interface StackItem {
  level: number;
  data: Category[];
  title?: string;
}

export const useMegaMenuStack = (initialData: Category[]) => {
  const [stack, setStack] = useState<StackItem[]>([
    { level: 0, data: initialData, title: 'دسته‌بندی کالاها' },
  ]);

  const push = (item: Category, fromLevel: number) => {
    if (!item.children || item.children.length === 0) return;

    setStack((prevStack) => {
      const targetLevel = Math.min(fromLevel + 1, 2);

      const newPanel: StackItem = {
        level: targetLevel,
        data: item.children!,
        title: item.title,
      };

      const baseStack = prevStack.slice(0, targetLevel);

      const lastPanel = baseStack[baseStack.length - 1];
      if (lastPanel && lastPanel.title === newPanel.title && lastPanel.level === newPanel.level) {
        return baseStack;
      }

      return [...baseStack, newPanel];
    });
  };

  const pop = () => {
    setStack((prevStack) => {
      if (prevStack.length <= 1) return prevStack;
      return prevStack.slice(0, -1);
    });
  };
  
  const goToLevel = (level: number) => {
    setStack((prevStack) => {
      if (level < 0 || level >= prevStack.length) return prevStack;
      return prevStack.slice(0, level + 1);
    });
  };

  const reset = () => {
    setStack([{ level: 0, data: initialData, title: 'دسته‌بندی کالاها' }]);
  };

  return { stack, push, pop, goToLevel, reset };
};

