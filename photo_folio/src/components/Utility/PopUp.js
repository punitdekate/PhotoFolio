export function PopUp(message, color) {
  const style = {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor: "#f0f0f0",
    border: "1px solid red",
    padding: "10px",
    zIndex: "9999",
    color: "green",
    borderRadius: "10px",
  };
  return (
    <>
      <div style={style}>Image has been deleted</div>
    </>
  );
}
