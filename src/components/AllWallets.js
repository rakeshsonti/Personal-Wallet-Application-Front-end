import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import "./AllWallets.css";
function AllWallets() {
   const [walltes, setWallets] = useState([]);
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
   return (
      <>
         <Table className="mytable">
            <thead>
               <tr>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Balance (Rs)</th>
               </tr>
            </thead>
            <tbody>
               {walltes.map((value, index) => {
                  return (
                     <tr key={`${value.user_id}${index}`}>
                        <th scope="row">{index + 1}</th>
                        <td>{value.username}</td>
                        <td>{value.phone}</td>
                        <td>{value.balance / 100}</td>
                     </tr>
                  );
               })}
            </tbody>
         </Table>
      </>
   );
}
export default AllWallets;
