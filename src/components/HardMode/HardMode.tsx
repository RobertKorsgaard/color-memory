import React from "react";

interface IHardModeProps {
  isHardMode: boolean;
  toggleHardMode: () => void;
  timeleft: number;
}
const inputid = "hard-mode";
export const HardMode: React.FC<IHardModeProps> = ({ isHardMode, toggleHardMode, timeleft }) => {
  return (
    <div>
      {isHardMode && (
        <>
          <span
            style={{ color: timeleft === 0 ? "red" : "white" }}
          >{`timeleft: ${timeleft}s`}</span>
          <span>{` | `}</span>
        </>
      )}
      <label htmlFor={inputid}> hardmode: </label>
      <input id={inputid} type="checkbox" checked={isHardMode} onChange={toggleHardMode} />
    </div>
  );
};
