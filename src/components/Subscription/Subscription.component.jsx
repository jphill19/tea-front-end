
import './Subscription.css';
import { Link } from 'react-router-dom';

const Subscription = ({ id, title, status, frequency, customer_id, price, teas_count }) => {
  const statusClass = status === "active" ? "status-active" : "status-inactive";

  // Image selection based on tea_count
  let teaImage;
  if (teas_count === 1) {
    teaImage = '/single_leaf.png';
  } else if (teas_count === 2) {
    teaImage = '/double_leaf.png';
  } else {
    teaImage = '/triple_leaf.png';
  }

  return (
    <Link to={`/subscription/${id}`} className="subscription-link">
      <div className="subscription">
        <div className="subscription-info">
          <h3>{title}</h3>
          <p><strong>Status:</strong> <span className={statusClass}>{status}</span></p>
          <p><strong>Frequency:</strong> {frequency}</p>
          <p><strong>Customer ID:</strong> {customer_id}</p>
          <p><strong>Price:</strong> ${price}</p>
        </div>
        <div className="subscription-image">
          <img src={teaImage} alt={`Tea leaves count: ${teas_count}`} />
        </div>
      </div>
    </Link>
  );
};

export default Subscription;
