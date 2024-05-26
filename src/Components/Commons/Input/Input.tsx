import classNames from 'classnames';
import React, { ForwardedRef } from 'react';

// 타입 정의
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string;
  invalid?: boolean;
  textarea?: boolean;
  rows?: number;
  formatter?: (value: string) => string;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className = '', invalid = false, textarea = false, formatter, ...rest }: InputProps, ref) => {
    const { value, onChange, ...restProps } = rest;

    const inputClasses = classNames(
      'flex leading-none p-[23px_20px] text-xs text-white rounded-md border border-black4 outline-none bg-black3 placeholder-gray-400 focus:border-blue resize-none',
      invalid ? 'border-red hover:border-blue focus:border-blue' : 'border-black4 hover:border-blue focus:border-blue',
      className
    );

    // textarea일 경우 textarea로 렌더링
    if (textarea) {
      return (
        <div className="relative">
          <textarea
            className={inputClasses}
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
            {...rest}
          />
        </div>
      );
    }

    // fomatter와 onChange가 있을 경우 value를 포맷팅
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
