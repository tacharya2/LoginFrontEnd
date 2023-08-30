import React from 'react';
import './ChildTable.css';

const ChildTable = ({ children }) => {
if (!children || children.length === 0) {
    return <p>No children data available.</p>;
    }
console.log("Number of children:", children.length);
console.log("Type of children:", typeof children);
  return (
  <div className="child-table-wrapper">
        <table className="child-table">
          <thead>
            <tr>
               <th>S.N</th>
              <th>Child Name</th>
              <th>Gender</th>
              <th>Emergency Name</th>
              <th>Emergency Number</th>
              <th>Driver</th>
              <th>Driver Relation</th>
              <th>Category</th>
              <th>Registered</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {children.map((child, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{child.fullName}</td>
                <td>{child.gender}</td>
                <td>{child.emName}</td>
                <td>{child.emPhone}</td>
                <td>{child.driver}</td>
                <td>{child.driverRelation}</td>
                <td>{child.category}</td>
                <td>{child.date}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default ChildTable;
