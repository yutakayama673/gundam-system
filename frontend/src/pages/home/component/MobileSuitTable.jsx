export default function MobileSuitTable({ gundamData, onEdit }) {
  return (
    <table>
      <thead>
        <tr>
          <th>DESIGN</th>
          <th>MOBILE SUIT NUMBER</th>
          <th>MOBILE SUIT NAME</th>
          <th>PILOT</th>
          <th>START DESIGN DATE</th>
          <th>END DESIGN DATE</th>
          <th>CLIENTS</th>
        </tr>
      </thead>
      <tbody>
        {gundamData.map((ms, index) => (
          <tr key={index}>
            <td>
              <button className="edit-button" onClick={() => onEdit(ms)}>EDIT</button>
            </td>
            <td>{ms.mobileSuitNumber}</td>
            <td>{ms.mobileSuitName}</td>
            <td>{ms.pilot}</td>
            <td>{ms.startDesignDate}</td>
            <td>{ms.endDesignDate}</td>
            <td>{ms.belong}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
