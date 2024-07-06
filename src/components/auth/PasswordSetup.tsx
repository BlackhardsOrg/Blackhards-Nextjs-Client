import React, { ChangeEvent, useEffect, useState } from "react";
import PasswordStatusComponent from "./PasswordStatusComponent";

interface PasswordSetupProps {
  credentials: {
    password: string;
    confirmPassword: string;
  };
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isPasswordMismatched: boolean;
  setIsPasswordMismatched: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordSetup: React.FC<PasswordSetupProps> = ({
  credentials,
  handleChange,
  isPasswordMismatched,
  setIsPasswordMismatched,
}) => {
  const [strength, setStrength] = useState<string>("");
  const [strengthColor, setStrengthColor] = useState<string>("black");

  const [passwordCriteria, setPasswordCriteria] = useState<{
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    specialChar: boolean;
  }>({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const evaluatePasswordStrength = (password: string): string => {
    const criteria = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password),
    };

    setPasswordCriteria(criteria);

    const score = Object.values(criteria).filter(Boolean).length;

    switch (score) {
      case 0:
      case 1:
      case 2:
        setStrengthColor("red");
        return "Weak";
      case 3:
        setStrengthColor("orange");
        return "Medium";
      case 4:
      case 5:
        setStrengthColor("green");
        return "Strong";
      default:
        return "";
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    handleChange(event);
    setStrength(evaluatePasswordStrength(value));
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;

    handleChange(event);
    setIsPasswordMismatched(value != "" && value !== credentials.password);
  };

  useEffect(() => {
    console.log(setIsPasswordMismatched, "Check")
    if (credentials.confirmPassword !== "") {
      setIsPasswordMismatched(credentials.password !== credentials.confirmPassword);
    }
  }, [credentials.confirmPassword, credentials.password]);

  return (
    <div>
      <div className="mb15">
        <label className="form-label fw500 dark-color">
          Password <span className="text-danger">*</span>
        </label>
        <input
          name="password"
          type="password"
          className="form-control"
          placeholder="*******"
          value={credentials.password}
          onChange={handlePasswordChange}
          required
        />
        {credentials.password != "" &&<small>
          Password strength:{" "}
          <span
            style={{
              fontWeight: "bold",
              color: strengthColor,
            }}
          >
            {strength}
          </span>
        </small>}
        {credentials.password != "" && <PasswordStatusComponent passwordCriteria={passwordCriteria} />}
      </div>
      <div className="mb15">
        <label className="form-label fw500 dark-color">
          Confirm Password <span className="text-danger">*</span>
        </label>
        <input
          name="confirmPassword"
          type="password"
          className="form-control"
          placeholder="*******"
          value={credentials.confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        {isPasswordMismatched && (
          <small style={{ color: "red" }}>Passwords do not match</small>
        )}
      </div>
    </div>
  );
};

export default PasswordSetup;
