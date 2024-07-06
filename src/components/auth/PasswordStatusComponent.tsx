import React from "react";

interface PasswordStatusComponentProps {
  passwordCriteria: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    specialChar: boolean;
  };
}

const PasswordStatusComponent: React.FC<PasswordStatusComponentProps> = ({
  passwordCriteria,
}) => {
  return (
    <div>
      <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
        <li style={{ color: passwordCriteria.length ? "green" : "red" }}>
          {passwordCriteria.length && <i className="fas fa-check"></i>} At least
          8 characters
        </li>
        <li style={{ color: passwordCriteria.lowercase ? "green" : "red" }}>
          {passwordCriteria.lowercase && <i className="fas fa-check"></i>}{" "}
          Contains lowercase letter (eg. a - z)
        </li>
        <li style={{ color: passwordCriteria.uppercase ? "green" : "red" }}>
          {passwordCriteria.uppercase && <i className="fas fa-check"></i>}{" "}
          Contains uppercase letter (eg. A - Z)
        </li>
        <li style={{ color: passwordCriteria.number ? "green" : "red" }}>
          {passwordCriteria.number && <i className="fas fa-check"></i>} Contains
          number (eg. 0 - 9)
        </li>
        <li style={{ color: passwordCriteria.specialChar ? "green" : "red" }}>
          {passwordCriteria.specialChar && <i className="fas fa-check"></i>}{" "}
          Contains special character (eg. @,#,$,!,&,*,)
        </li>
      </ul>
    </div>
  );
};

export default PasswordStatusComponent;
