import React from 'react';
import { cn } from '@lib/utils';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverLift?: boolean;
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hoverLift = true,
  as: Component = 'div',
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        'card',
        `card-${variant}`,
        `card-p-${padding}`,
        hoverLift && 'card-hover',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

