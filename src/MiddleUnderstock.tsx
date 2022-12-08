import { useContext, useEffect, useState } from "react";
import { context, USData, WSIUS } from "./App";
import "./styles.css";

const UsBox: React.FC<{ content: string[] }> = ({ content }) => {
  const [addable, setAddable] = useState(false);
  const [hilighted, setHilighted] = useState("lightgray");
  const search = useContext(context);
  useEffect(() => {
    if (search.current.length > 1) {
      content.every((sku) => {
        if (sku === search.current) {
          setAddable(false);
          setHilighted("green");
          return false;
        } else if (sku.includes(search.current)) {
          setAddable(true);
          setHilighted("yellow");
          return false;
        } else {
          setAddable(true);
          setHilighted("lightgray");
          return true;
        }
      });
    } else {
      setAddable(true);
      setHilighted("lightgray");
    }
  }, [search, content]);

  return (
    <div className="usBox" style={{ backgroundColor: `${hilighted}` }}></div>
  );
};

interface Props {
  data: WSIUS;
}

const MiddleUnderstock: React.FC<Props> = (props) => {
  return (
    <div className="midUnderstock">
      <div
        style={{
          position: "absolute",
          color: "red",
          fontWeight: "bold",
          transform: "translate(-10em, -2em) rotate(-45deg)",
          top: "10em",
        }}
      >
        DOOR
      </div>
      <div className="usRow">
        <UsBox content={props.data.a} />
        <UsBox content={props.data.b} />
      </div>
      <div className="usRow usCen">
        <UsBox content={props.data.c} />
        <div className="space" />
        <UsBox content={props.data.d} />
      </div>
      <div className="usRow usCen">
        <UsBox content={props.data.e} />
        <div className="space" />
        <UsBox content={props.data.f} />
      </div>
      <div className="usRow usCen">
        <UsBox content={props.data.g} />
        <div className="space" />
        <UsBox content={props.data.h} />
      </div>
      <div className="usRow">
        <UsBox content={props.data.i} />
        <UsBox content={props.data.j} />
      </div>
    </div>
  );
};
export default MiddleUnderstock;
