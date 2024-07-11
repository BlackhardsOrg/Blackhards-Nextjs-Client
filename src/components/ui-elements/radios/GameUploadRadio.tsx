import { ChangeEvent } from "react";

export interface IGameUploadRadio {
  i: number
  text: string
  value: string
  onChange: ChangeEvent<HTMLInputElement> | any
  checked: boolean
}

export default function GameUploadRadio({ checked, i = 0, text = "", value = "", onChange }: IGameUploadRadio) {
  return (
    <>
      <div className="form-check d-flex align-items-center gap-1 mb15">
        <input
          checked={checked}
          onChange={onChange}
          value={value}

          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id={`flexRadioDefault1${i}`}
        />
        <label className="form-check-label" htmlFor={`flexRadioDefault1${i}`}>
          {text}
        </label>
      </div>
    </>
  );
}
