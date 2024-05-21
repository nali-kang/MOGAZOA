import classNames from 'classnames';
import React from 'react';

interface FieldLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const FieldLabel = React.forwardRef<HTMLSpanElement, FieldLabelProps>(
  ({ className = '', children }: FieldLabelProps, ref) => {
    if (!children) return null;

    const fieldLabelClasses = classNames(
      'text-base font-normal absolute right-4 top-1/2 -translate-y-1/2',
      className
    );

    return (
      <span className={fieldLabelClasses} ref={ref}>
        {children}
      </span>
    );
  }
);

export default FieldLabel;
