import { useContext } from "react";
import { ThemeContext } from "../provider/Themeprovider";

const Context = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  console.log(theme);
  return (
    <div>
      <button className="border p-4 bg-slate-300" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

export default Context;
