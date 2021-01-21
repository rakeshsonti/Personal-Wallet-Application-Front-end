import { useState } from "react";
import { Label, Input, ListGroup, ListGroupItem, Button } from "reactstrap";
import "./SpendFunds.css";
function SpendFunds() {
   const isNullOrUndefined = (value) => {
      return value === undefined || value == null ? true : false;
   };

   const activeUserHandler = (value, index) => {
      const temp = `${value}${index}`;
      setActiveUser(temp);
   };

   const [activeUser, setActiveUser] = useState();
   // console.log("active user :", activeUser);
   const regexAmount = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
   const [isAmountValid, setIsAmountValid] = useState();
   const [amount, setAmount] = useState("");
   const [newAmount, setNewAmount] = useState("");
   let mp = ["ram", "shyam", "krishna", "raja", "bhindi", "gobi", "karelallal"];
   return (
      <div className="maincontainer">
         <div className="subcontainer">
            <Label for="balance" className="userLabel">
               User
            </Label>
            <Input
               type="text"
               name="balance"
               id="balance"
               defaultValue=""
               disabled
               className="userBalance"
               valid
            ></Input>
         </div>
         <ListGroup className="userList">
            {mp.map((value, index) => {
               return (
                  <ListGroupItem
                     key={`${value}${index}`}
                     color="success"
                     active={`${value}${index}` === activeUser}
                     onClick={() => {
                        return activeUserHandler(value, index);
                     }}
                  >
                     {value}
                  </ListGroupItem>
               );
            })}
         </ListGroup>
         <div className="subcontainer">
            <Label for="inputbalance" className="userLabel">
               Amount (Rs)
            </Label>
            <Input
               type="text"
               name="inputbalance"
               id="inputbalance"
               className="userBalance"
               placeholder="Enter Your Amount "
               valid={isNullOrUndefined(isAmountValid) ? null : isAmountValid}
               invalid={
                  isNullOrUndefined(isAmountValid) ? null : !isAmountValid
               }
               onChange={(evt) => {
                  const amountValue = evt.target.value;
                  if (amountValue.match(regexAmount)) {
                     setNewAmount(amountValue.replace(",", ""));
                     setIsAmountValid(true);
                  } else {
                     setIsAmountValid(false);
                  }
                  console.log(amountValue);
                  setAmount(evt.target.value);
               }}
               value={amount}
            ></Input>
         </div>
         <div className="btn1">
            <Button
               color="primary"
               style={{ marginTop: "5px" }}
               disabled={!isAmountValid}
            >
               Submit
            </Button>
         </div>
      </div>
   );
}
export default SpendFunds;
