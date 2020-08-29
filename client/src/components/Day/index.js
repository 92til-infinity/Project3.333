import React from "react";

function Day(props) {
  function formatDate(dateStr) {
    const dateArray = dateStr.toString().split(" ");
    return `${dateArray[0]}, ${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
  }

  return (
    <div>
      <h3>{formatDate(props.date.toString())}</h3>
    </div>
  );
}

export default Day;
