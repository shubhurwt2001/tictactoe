function Button(props) {
  return (
    <>
      <button
        value={props.value}
        disabled={props.disabled}
        className={`btn btn_${props.value}`}
        onClick={props.btnClick}
      >
        {props.icon}
      </button>
    </>
  );
}
export default Button;
