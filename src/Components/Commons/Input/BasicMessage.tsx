import classNames from 'classnames';
import React from 'react';

interface BasicMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export default function BasicMessage({ className, children }: BasicMessageProps) {
  if (!children) return null;

  const BasicMessageClasses = classNames('text-xs text-gray1 lg:text-sm', className);

  return <p className={BasicMessageClasses}>{children}</p>;
}
