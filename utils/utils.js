function calculateTotalPrice(items) {
  let totalPrice = 0;

  items.forEach((item, index) => {
    if (!item.quantity || !item.productId || !item.productId.price) {
      console.error(`Invalid item at index ${index}:`, item);
      return;
    }

    totalPrice += item.quantity * item.productId.price;
  });

  return totalPrice;
}
  
  function generateReceipt(order) {
    // Example HTML receipt format (adjust as needed)
    const receiptContent = `
      <h2>Order Receipt</h2>
      <p>Order ID: ${order._id}</p>
      <p>Items:</p>
      <ul>
        ${order.items.map((item) => `<li>${item.productId.name} x ${item.quantity}</li>`).join("")}
      </ul>
      <p>Total Price: ${order.totalPrice}</p>
      <p>Payment Method: ${order.paymentMethod}</p>
      <p>Delivery Address: ${order.deliveryAddress}</p>
    `;
    return receiptContent;
  }
  
  module.exports = {calculateTotalPrice, generateReceipt};