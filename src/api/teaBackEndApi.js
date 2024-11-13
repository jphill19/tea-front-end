export const fetchSubscriptions = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/subscriptions");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw error;
  }
};

export const fetchSubscriptionById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/subscriptions/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching subscription with ID ${id}:`, error);
    throw error;
  }
};

export const updateSubscriptionStatus = async (id, status) => {
  const newStatus = status === "active" ? "inactive" : "active";
  try {
    const response = await fetch(`http://localhost:3000/api/v1/subscriptions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating subscription with ID ${id}:`, error);
    throw error;
  }
};