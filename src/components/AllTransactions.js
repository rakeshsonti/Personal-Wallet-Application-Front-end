import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./AllTransactions.css";
function AllTransactions() {
   const [allTransactions, setAllTransactions] = useState([]);
   useEffect(() => {
      fetch("http://localhost:9999/alltransactions", {
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
            setAllTransactions([...r]);
            console.log(r);
         });
   }, []);
   return (
      <>
         <Table className="mytable">
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount (Rs)</th>
                  <th>Balance (Rs)</th>
               </tr>
            </thead>
            <tbody>
               {allTransactions.map((val, index) => {
                  const time = new Date(val.trans_date);
                  const arr1 = time.toDateString().split(" ");
                  const month1 = arr1[2] + " " + arr1[1];
                  let hours = time.getHours();
                  let hor = Number(hours) % 12;
                  let hours2 = hor + " " + (Number(hours) >= 12) ? "PM" : "AM";
                  return (
                     <tr key={`${val}${index}`}>
                        <td>{val.name}</td>

                        <td>{`${month1}${" "}, ${hor} ${hours2}`}</td>
                        <td>
                           {val.transaction_type === "add_funds" ? "+" : "-"}{" "}
                           {Number(val.amount) / 100}
                        </td>
                        <td>{Number(val.final_balance) / 100}</td>
                     </tr>
                  );
               })}
            </tbody>
         </Table>
      </>
   );
}
export default AllTransactions;
