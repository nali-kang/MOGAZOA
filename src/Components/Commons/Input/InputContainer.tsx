import classNames from 'classnames';

import ErrorMessage from './ErrorMessage';
import Label from './Label';

export interface InputContainerProps {
  className?: string;
  children?: React.ReactNode;
  label?: string;
  required?: boolean;
  errorMessage?: string | undefined | null;
}

export default function InputContainer({
  className = '',
  label = '',
  required = false,
  errorMessage = '',
  children
}: InputContainerProps) {
  const inputFormContainer = classNames('flex flex-col w-full h-full', className);
  const inputFormLabel = 'mb-2.5';
  const inputFormErrorMessage = 'mt-2.5';

  return (
    <div className={inputFormContainer}>
      <Label className={inputFormLabel} required={required}>
        {label}
      </Label>
      {children}
      <ErrorMessage className={inputFormErrorMessage}>{errorMessage}</ErrorMessage>
    </div>
  );
}
