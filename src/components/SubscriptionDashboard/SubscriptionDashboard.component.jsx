import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSubscriptionById, updateSubscriptionStatus } from '../../api/teaBackEndApi';
import './SubscriptionDashboard.css';

const SubscriptionDashboard = () => {
  const { id } = useParams();
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadSubscription = async () => {
      try {
        const data = await fetchSubscriptionById(id);
        setSubscription(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadSubscription();
  }, [id]);

  const toggleStatus = async () => {
    if (!subscription) return;
    const currentStatus = subscription.attributes.status;

    try {
      const updatedSubscription = await updateSubscriptionStatus(id, currentStatus);
      setSubscription((prevSubscription) => ({
        ...prevSubscription,
        attributes: {
          ...prevSubscription.attributes,
          status: updatedSubscription.data.attributes.status,
        },
      }));
    } catch (error) {
      setError(`Failed to update status: ${error.message}`);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!subscription) return <p>Loading...</p>;

  const { attributes } = subscription;
  const { customer, teas } = attributes;

  const statusClass = attributes.status === "active" ? "status-active" : "status-inactive";

  return (
    <div className="subscription-dashboard">
      <div className="subscription-header">
        <h1>{attributes.title}</h1>
        <p className='status-container'>
          <strong>Status:</strong>
          <span className={statusClass}>{attributes.status}</span>
          <button className="toggle-button" onClick={toggleStatus}>Change Status</button>
        </p>
        <p><strong>Frequency:</strong> {attributes.frequency}</p>
        <p><strong>Total Price:</strong> ${attributes.price}</p>
      </div>

      <div className="customer-info">
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> {customer.first_name} {customer.last_name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Address:</strong> {customer.address}</p>
      </div>

      <div className="teas-info">
        <h2>Teas in Subscription</h2>
        {teas.map((tea) => (
          <div key={tea.id} className="tea-item">
            <h3>{tea.title}</h3>
            <img src={tea.image} alt={tea.title} className="tea-image" />
            <p><strong>Description:</strong> {tea.description}</p>
            <p><strong>Price:</strong> ${tea.price}</p>
            <p><strong>Temperature:</strong> {tea.temperature}°C</p>
            <p><strong>Brew Time:</strong> {tea.brew_time} mins</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionDashboard;
