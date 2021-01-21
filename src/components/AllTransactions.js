import { Table } from "reactstrap";
import "./AllTransactions.css";
function AllTransactions() {
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
               <tr>
                  <td>Mark</td>
                  <td>12 Jan, 5 pm</td>
                  <td>+125 </td>
                  <td>225</td>
               </tr>
               <tr>
                  <td>Jacob</td>
                  <td>12 Jan, 6 pm</td>
                  <td>+225</td>
                  <td>225</td>
               </tr>
               <tr>
                  <td>Larry</td>
                  <td>13 Jan, 1 am</td>
                  <td>-65</td>
                  <td>334.56</td>
               </tr>
            </tbody>
         </Table>
      </>
   );
}
export default AllTransactions;
