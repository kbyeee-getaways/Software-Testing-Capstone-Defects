const prices = {
  sourdough: 9,
  croissant: 5,
  tart: 6,
  cookie: 3
};

const quantities = {
  sourdough: 0,
  croissant: 0,
  tart: 0,
  cookie: 0
};

function updateTotal() {
  let total = 0;
  for (const [item, qty] of Object.entries(quantities)) {
    total += prices[item] * qty;
  }
  document.getElementById('order-total').textContent = '$' + total.toFixed(2);
}

document.querySelectorAll('.qty-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    const item = btn.dataset.item;
    if (action === 'increase') {
      quantities[item]++;
    } else if (action === 'decrease' && quantities[item] > 0) {
      quantities[item]--;
    }
    document.getElementById(item + '-qty').textContent = quantities[item];
    updateTotal();
  });
});

// Show/hide delivery address
const orderType = document.getElementById('order-type');
const deliveryField = document.getElementById('delivery-address-field');
if (orderType) {
  orderType.addEventListener('change', () => {
    deliveryField.style.display = orderType.value === 'delivery' ? 'block' : 'none';
  });
}

// Place order
const placeOrderBtn = document.getElementById('place-order-btn');
if (placeOrderBtn) {
  placeOrderBtn.addEventListener('click', () => {
    const name = document.getElementById('pickup-name').value.trim();
    const type = document.getElementById('order-type').value;
    const address = document.getElementById('delivery-address') ? document.getElementById('delivery-address').value.trim() : '';
    const total = document.getElementById('order-total').textContent;

    const totalQty = Object.values(quantities).reduce((a, b) => a + b, 0);

    if (!name) { alert('Please enter a name for your order.'); return; }
    if (!type) { alert('Please select pickup or delivery.'); return; }
    if (type === 'delivery' && !address) { alert('Please enter a delivery address.'); return; }
    if (totalQty === 0) { alert('Please add at least one item to your order.'); return; }

    const msg = type === 'pickup'
      ? `Thanks, ${name}! Your order (${total}) is confirmed for pickup. We'll have it ready within 30 minutes.`
      : `Thanks, ${name}! Your order (${total}) is confirmed for delivery to ${address}.`;

    document.getElementById('confirm-message').textContent = msg;
    document.querySelector('.order-container > h2').style.display = 'none';
    document.querySelector('.order-items').style.display = 'none';
    document.querySelector('.order-summary').style.display = 'none';
    document.getElementById('order-confirmation').style.display = 'block';
  });
}
