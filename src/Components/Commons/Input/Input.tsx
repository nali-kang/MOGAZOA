import classNames from 'classnames';
import React, { ForwardedRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string;
  invalid?: boolean;
  textarea?: boolean;
  rows?: number;
  // eslint-disable-next-line no-unused-vars
  formatter?: (value: string) => string;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className = '', invalid = false, textarea = false, formatter, ...rest }: InputProps, ref) => {
    const { value, onChange, ...restProps } = rest;

    const inputClasses = classNames(
      'flex w-full p-4 gap-4 text-black rounded-md border border-gray-300 outline-none bg-white placeholder-gray-400',
      invalid && 'border-red-400 focus:border-gray-300',
      className
    );

    if (textarea) {
      return <textarea className={inputClasses} ref={ref as ForwardedRef<HTMLTextAreaElement>} {...rest} />;
    }

    if (formatter && onChange) {
      return (
        <input
          className={inputClasses}
          ref={ref as ForwardedRef<HTMLInputElement>}
          type="text"
          value={value}
          onChange={(e) => {
            const newEvent = {
              ...e,
              target: {
                ...e.target,
                value: formatter(e.target.value)
              }
            };
            onChange(newEvent);
          }}
          {...restProps}
        />
      );
    }

    return <input className={inputClasses} ref={ref as ForwardedRef<HTMLInputElement>} {...rest} />;
  }
);

export default Input;
