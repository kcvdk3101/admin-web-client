import React, { useState } from "react";
import { DatePicker } from "../common/DatePicker";

const NewCoupon = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <DatePicker date={date} onChange={setDate}></DatePicker>
    </div>
  );
};

export default NewCoupon;
