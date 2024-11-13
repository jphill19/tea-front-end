import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSubscriptionById } from '../../api/teaBackEndApi';

const SubscriptionDashboard = () => {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const data = await fetchSubscriptionById(id);
        setSubscription(data.data.attributes);
      } catch (err) {
        setError(err.message);
      }
    };

    loadSubscription();
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!subscription) return <p>Loading...</p>;

  return (
    <div>
      <h1>{subscription.title}</h1>
      <p>Status: {subscription.status}</p>
      <p>Frequency: {subscription.frequency}</p>
      <p>Price: ${subscription.price}</p>
    </div>
  );
};

export default SubscriptionDashboard;
