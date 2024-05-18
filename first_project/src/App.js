import "./App.css";
import Slider from "./components/Slider";
import Header from "./components/Header";
import ClassComponent from "./components/ClassComponent";
import FunctionComponent from "./components/FunctionComponent";
import { useState } from "react";
function App() {
  let content = <Slider />;
  const [tab, setTab] = useState("slider");
  if (tab == "Slider") {
    content = <Slider />;
  } else if (tab == "Class Component") {
    content = <ClassComponent />;
  } else if (tab == "Function Component") {
    content = <FunctionComponent />;
  }
  return (
    <div className="App">
      <Header setTab={setTab} tab={tab} />
      {content}
    </div>
  );
}

export default App;
