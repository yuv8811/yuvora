import React from 'react';
import { cn } from '@lib/utils';
import './Section.css';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'secondary' | 'contrast';
  padding?: 'sm' | 'md' | 'lg';
  as?: React.ElementType;
}

export const Section: React.FC<SectionProps> = ({
  variant = 'default',
  padding = 'lg',
  as: Component = 'section',
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn('section', `section-${variant}`, `section-p-${padding}`, className)}
      {...props}
    >
      {children}
    </Component>
  );
};

