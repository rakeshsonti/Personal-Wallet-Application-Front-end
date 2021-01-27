import { useState, useEffect } from "react";
import { Label, Input, ListGroup, ListGroupItem, Button } from "reactstrap";
import "./SpendFunds.css";
function SpendFunds() {
   const [walltes, setWallets] = useState([]);
   const [activeUserName, setActiveUserName] = useState("");
   const [activeUser, setActiveUser] = useState();
   const regexAmount = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
   const [isAmountValid, setIsAmountValid] = useState();
   const [amount, setAmount] = useState("");
   const [newAmount, setNewAmount] = useState("");
   useEffect(() => {
      fetch("http://localhost:9999/allwallets", {
         method: "GET",
         credentials: "include",
      })
         .then((r) => {
            if (r.ok) {
               return r.json();
            } else {
               console.log("err", r);
            }
         })
         .then((r) => {
            setWallets([...r]);
            console.log(r);
         });
   }, []);
   const isNullOrUndefined = (value) => {
      return value === undefined || value == null ? true : false;
   };
   const activeUserHandler = (value, name) => {
      const temp = `${value}`;
      setActiveUserName(name);
      setActiveUser(temp);
   };
   const spendAmount = () => {
      fetch("http://localhost:9999/spendfunds", {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ user_id: activeUser, amount: newAmount }),
         credentials: "include",
      }).then((r) => {
         if (r.ok) {
            console.log(r);
            setIsAmountValid(true);
         } else {
            console.log("err", r);
            setIsAmountValid(false);
         }
      });
   };
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
               value={activeUserName}
               disabled
               className="userBalance"
               valid
            ></Input>
         </div>
         <ListGroup className="userList">
            {walltes.map((value, index) => {
               return (
                  <ListGroupItem
                     key={`${value.user_id}${index}`}
                     color="success"
                     active={`${value.user_id}` === activeUser}
                     onClick={() => {
                        return activeUserHandler(value.user_id, value.username);
                     }}
                  >
                     {value.username}
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
               placeholder="Enter Amount to Spend"
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
                  setAmount(evt.target.value);
               }}
               value={amount}
            ></Input>
         </div>
         <div className="submitbtn">
            <Button
               color="primary"
               style={{ marginTop: "5px" }}
               disabled={!isAmountValid || activeUser === undefined}
               onClick={spendAmount}
               // className="sbmt-btn"
            >
               Submit
            </Button>
         </div>
      </div>
   );
}
export default SpendFunds;
