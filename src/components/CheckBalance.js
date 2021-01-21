import { useState } from "react";
import { Label, Input, ListGroup, ListGroupItem, Button } from "reactstrap";
import "./CheckBalance.css";
function CheckBalance() {
   const activeUserHandler = (value, index) => {
      const temp = `${value}${index}`;
      setActiveUser(temp);
   };
   const [activeUser, setActiveUser] = useState();
   // console.log("active user :", activeUser);

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
         <div className="btn1">
            <Button color="primary" style={{ marginTop: "5px" }}>
               Get Balance
            </Button>
         </div>
      </div>
   );
}
export default CheckBalance;
