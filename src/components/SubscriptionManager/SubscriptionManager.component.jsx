import "./SubscriptionManager.css"
import { fetchSubscriptions } from "../../api/teaBackEndApi"
import Subscription from "../Subscription/Subscription.component";
import { useState, useEffect} from "react";


const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSubscriptions();
        setSubscriptions(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="subscriptions-container">
    <h2>Subscriptions</h2>
    <ul className="subscriptions-list">
      {subscriptions.map((subscription) => (
        <Subscription
          key={subscription.id}
          id={subscription.id}
          title={subscription.attributes.title}
          status={subscription.attributes.status}
          frequency={subscription.attributes.frequency}
          customer_id={subscription.attributes.customer_id}
          price={subscription.attributes.price}
          teas_count={subscription.attributes.teas_count}
        />
      ))}
    </ul>
  </div>
  );
}

export default SubscriptionManager