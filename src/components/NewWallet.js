import "./NewWallet.css";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
function NewWallet() {
   const isNullOrUndefined = (value) => {
      return value === undefined || value == null ? true : false;
   };
   const letters = /^[A-Za-z]+$/;
   const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
   const regexAmount = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
   const [isNameValid, setIsNameValid] = useState();
   const [name, setName] = useState("");
   const [isPhoneValid, setIsPhoneValid] = useState();
   const [phone, setPhone] = useState("");
   const [isAmountValid, setIsAmountValid] = useState();
   const [amount, setAmount] = useState("");
   const [newAmount, setNewAmount] = useState("");
   const isValidate = async (event) => {
      event.preventDefault();
      fetch("http://localhost:9999/user", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ username: name, phone, amount: newAmount }),
         credentials: "include",
      }).then((r) => {
         console.log(r);
      });
   };
   return (
      <>
         <Form onSubmit={isValidate}>
            <FormGroup className="formgroup">
               <Label for="name" className="lable">
                  Name
               </Label>
               <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name"
                  className="inputField"
                  valid={isNullOrUndefined(isNameValid) ? null : isNameValid}
                  invalid={isNullOrUndefined(isNameValid) ? null : !isNameValid}
                  onChange={(evt) => {
                     const nameText = evt.target.value;
                     if (nameText.match(letters)) {
                        setIsNameValid(true);
                     } else {
                        setIsNameValid(false);
                     }
                     setName(evt.target.value);
                  }}
                  value={name}
               />
            </FormGroup>
            <FormGroup className="formgroup">
               <Label for="phone" className="lable">
                  Phone
               </Label>
               <Input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Enter Your valid Phone"
                  className="inputField"
                  valid={isNullOrUndefined(isPhoneValid) ? null : isPhoneValid}
                  invalid={
                     isNullOrUndefined(isPhoneValid) ? null : !isPhoneValid
                  }
                  onChange={(evt) => {
                     const phoneValue = evt.target.value.trim();
                     if (phoneValue.match(phoneno)) {
                        setIsPhoneValid(true);
                     } else {
                        setIsPhoneValid(false);
                     }
                     setPhone(phoneValue);
                  }}
                  value={phone}
               />
            </FormGroup>
            <FormGroup className="formgroup">
               <Label for="amount" className="lable">
                  Amount (RS)
               </Label>
               <Input
                  type="text"
                  name="amount"
                  id="amount"
                  placeholder="Enter Your Amount "
                  className="inputField"
                  valid={
                     isNullOrUndefined(isAmountValid) ? null : isAmountValid
                  }
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
               />
            </FormGroup>
            <FormGroup className="submit-btn">
               <Button
                  color="primary"
                  size="sm"
                  type="submit"
                  disabled={!(isAmountValid && isNameValid && isPhoneValid)}
               >
                  Submit
               </Button>{" "}
            </FormGroup>
         </Form>
      </>
   );
}
export default NewWallet;
/*
Note:
^[1-9] The number must start with 1-9
\d* The number can then have any number of any digits
(...)$ look at the next group from the end (...)$
(...)?(...)? Look for two groups optionally. The first is for the comma, the second is for the decimal.
(,\d{3}){1} Look for one occurance of a comma followed by exactly three digits
\.\d{0,2} Look for a decimal followed by zero, one, or two digits.

This regex works off of these rules:

Valid values are numbers 0-9, comma and decimal point.
If a customer enters more than one decimal point or more than one comma, the value is invalid and will not be accepted.

Examples of invalid input values

1.2.3
1,2,4
Examples of valid input values
1.23
1,000
3967.
23
1.2
999,999.99
*/
