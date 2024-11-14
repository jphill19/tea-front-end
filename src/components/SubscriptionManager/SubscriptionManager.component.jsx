import "./SubscriptionManager.css";
import { fetchSubscriptions } from "../../api/teaBackEndApi";
import Subscription from "../Subscription/Subscription.component";
import { useState, useEffect } from "react";
import SearchBox from "../SearchBox/Searchbox.component";

const SubscriptionManager = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);
  const [searchField, setSearchField] = useState('');
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSubscriptions();
        setSubscriptions(data.data);
        setFilteredSubscriptions(data.data); // Initialize filtered subscriptions
      } catch (error) {
        setError(error.message);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const newFilteredSubscriptions = subscriptions.filter((subscription) => {
      return subscription.attributes.title.toLowerCase().includes(searchField);
    });

    setFilteredSubscriptions(newFilteredSubscriptions);
  }, [subscriptions, searchField]);

  const onSearchChange = (event) => {
    const searchFieldText = event.target.value.toLowerCase();
    setSearchField(searchFieldText);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="subscriptions-container">
      <h2>Subscriptions</h2>
      <SearchBox
        placeholder="search subscriptions"
        onChangeHandler={onSearchChange}
      />
      <div className="subscriptions-list">
        {filteredSubscriptions.map((subscription) => (
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
      </div>
    </div>
  );
};

export default SubscriptionManager;
