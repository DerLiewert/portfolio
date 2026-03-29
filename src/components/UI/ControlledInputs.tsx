import { useState, type InputHTMLAttributes } from "react";

export const ControlledInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const [value, setValue] = useState('');
  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const ControlledTextArea = (props: InputHTMLAttributes<HTMLTextAreaElement>) => {
  const [value, setValue] = useState('');
  return <textarea {...props} value={value} onChange={(e) => setValue(e.target.value)}></textarea>;
};