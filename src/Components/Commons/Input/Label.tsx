import classNames from 'classnames';
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  required?: boolean;
}

export default function Label({ className = '', children, htmlFor, required = false }: LabelProps) {
  if (!children) return null;

  const labelClasses = classNames(
    'text-base font-normal text-black',
    required && 'after:content-[\'*\'] after:text-black',
    className
  );

  return (
    <label className={labelClasses} htmlFor={htmlFor}>
      {children}
    </label>
  );
}
