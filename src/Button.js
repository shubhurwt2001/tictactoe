function Button(props) {
  return (
    <>
      <button
        value={props.value}
        disabled={props.disabled}
        className="btn"
        onClick={props.btnClick}
      >
        {props.icon}
      </button>
    </>
  );
}
export default Button;
