import { Table } from "reactstrap";
import "./AllWallets.css";
function AllWallets() {
   // const allData=[{}];
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
               <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>9988999877</td>
                  <td>765.43</td>
               </tr>
               <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>7763423688</td>
                  <td>443.24</td>
               </tr>
               <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>3434545666</td>
                  <td>20.05</td>
               </tr>
            </tbody>
         </Table>
      </>
   );
}
export default AllWallets;
