import { useState, useEffect } from "react";
import { Label, Input, ListGroup, ListGroupItem, Button } from "reactstrap";
import "./CheckBalance.css";
function CheckBalance() {
   const [activeUser, setActiveUser] = useState();
   const [usr, setUsr] = useState("");
   const [activeUserName, setActiveUserName] = useState("No User");
   const [walltes, setWallets] = useState([]);
   const [bal, setBal] = useState(-1);
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
   const activeUserHandler = (value, name) => {
      setActiveUserName(name);
      const temp = `${value}`;
      setActiveUser(temp);
   };
   const getBalance = () => {
      fetch(`http://localhost:9999/balance?user_id=${activeUser}`, {
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
            setBal(r.balance);
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
               value={
                  bal === -1
                     ? "No user No Money"
                     : `${usr} :${Number(bal) / 100} (RS)`
               }
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
         <div className="getBalCss">
            <Button
               color="primary"
               style={{ marginTop: "5px" }}
               disabled={activeUser === undefined}
               onClick={() => {
                  getBalance();
                  setUsr(activeUserName);
               }}
            >
               Get Balance
            </Button>
         </div>
      </div>
   );
}
export default CheckBalance;
