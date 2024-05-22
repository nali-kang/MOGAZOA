import classNames from 'classnames';
import React from 'react';

interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export default function ErrorMessage({ className, children }: ErrorMessageProps) {
  if (!children) return null;

  const errorMessageClasses = classNames('text-sm font-normal ml-2 text-red-500', className);

  return <p className={errorMessageClasses}>{children}</p>;
}
