import { speaks } from "@/data/listing";
import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";

export default function LanguageDropdown1() {
  const [getSpeak, setSpeak] = useState<any[]>([]);

  const setSpeakState = listingStore((state: any) => state.setSpeak);
  const getSpeakState = listingStore((state: any) => state.getSpeak);

  // handler
  const speakHandler = (data: any) => {
    if (!getSpeak.includes(data)) {
      return setSpeak([...getSpeak, data]);
    }
    const deleted = getSpeak.filter((item) => item !== data);
    setSpeak(deleted);
  };

  const speakSubmitHandler = () => {
    setSpeakState([]);
    getSpeak.forEach((item) => {
      setSpeakState(item);
    });
  };

  useEffect(() => {
    setSpeak(getSpeakState);
  }, [getSpeakState]);

  return (
    <>
      <div className="widget-wrapper pr20">
        <div className="checkbox-style1">
          {speaks.map((item, i) => (
            <label key={i} className="custom_checkbox">
              {item.title}
              <input
                type="checkbox"
                checked={getSpeak.includes(item.value)}
                onChange={() => speakHandler(item.value)}
              />
              <span className="checkmark" />
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={speakSubmitHandler}
        className="done-btn ud-btn btn-thm drop_btn4"
      >
        Apply
        <i className="fal fa-arrow-right-long" />
      </button>
    </>
  );
}
