import classNames from 'classnames';
import React from 'react';

interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export default function ErrorMessage({ className, children }: ErrorMessageProps) {
  if (!children) return null;

  const errorMessageClasses = classNames('text-xs text-red lg:text-sm', className);

  return <p className={errorMessageClasses}>{children}</p>;
}
