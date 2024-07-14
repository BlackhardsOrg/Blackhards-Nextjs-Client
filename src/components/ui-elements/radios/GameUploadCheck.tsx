import { ChangeEvent } from "react";

export interface IGameUploadCheck {
  i: number
  text: string
  // value: string
  onChange: ChangeEvent<HTMLInputElement> | any
  checked: boolean
  name?: string
}

export default function GameUploadCheck({ checked, i = 0, text = ""
  //  value = ""
   , onChange, name = "flexRadioDefault" }: IGameUploadCheck) {
  return (
    <>
      <div className="form-check d-flex align-items-center gap-1 mb15 ">
        <input
          checked={checked}
          onChange={onChange}
          // value={value}
          
          className="form-check-input cursor-pointer"
          type="checkbox"
          name={name}
          id={`flexRadioDefault1${i}`}
        />
        <label className="form-check-label" htmlFor={`flexRadioDefault1${i}`}>
          {text}
        </label>
      </div>
    </>
  );
}
