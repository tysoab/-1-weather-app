import spinnerIcon from "../../../assets/spinner.gif";

export default function Spinner({ icon = spinnerIcon, size = "auto" }) {
  return (
    <img
      src={icon}
      alt="spinner"
      style={{ margin: "0 auto", width: `${size ? size + "px" : "auto"}` }}
    />
  );
}
