import { useState } from "react";
import { Button, Input, InputGroup } from "react-daisyui";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Password(props) {
  const { id, name, className, inputClassName, placeholder, onChange } = props;
  const [showPass, setShowPass] = useState(false);

  const toggleShow = () => setShowPass(show => !show);

  return (
    <InputGroup className={className}>
      <Input
        type={showPass ? "text" : "password"}
        className={inputClassName}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Button onClick={toggleShow} type="button">
        {!showPass ? <FaEye /> : <FaEyeSlash />}
      </Button>
    </InputGroup>
  );
}
