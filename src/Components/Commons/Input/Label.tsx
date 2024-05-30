import classNames from 'classnames';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  required?: boolean;
}

export default function Label({ className = '', children, htmlFor, required = false }: LabelProps) {
  if (!children) return null;

  const labelClasses = classNames(
    'text-xs font-pretendard text-white lg:text-base',
    required && "after:content-['*'] after:text-white",
    className
  );

  return (
    <label className={labelClasses} htmlFor={htmlFor}>
      {children}
    </label>
  );
}
