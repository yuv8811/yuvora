import React from 'react';
import { cn } from '@lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  narrow = false,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(narrow ? 'container-narrow' : 'container', className)}
      {...props}
    >
      {children}
    </div>
  );
};

