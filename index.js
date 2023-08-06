async function getBalance(walletAddress) {
  try {
    const apiKey = ETH_API_KEY; // get api key from secret variable
    const response = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${apiKey}`);
    const data = await response.json();

    if (data.status === '1') {
      const balanceInEther = parseFloat(data.result) / 1e18;
      return balanceInEther;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error('Error');
  }
}


function displayBalance(balance) {
  const balanceResultElement = document.getElementById('balanceResult');
  balanceResultElement.textContent = `Balance: ${balance} Ether`;
}


async function checkBalance() {
  const walletAddressInput = document.getElementById('walletAddress');
  const walletAddress = walletAddressInput.value.trim();

  if (!walletAddress) {
    alert('Please enter a valid Ethereum wallet address!');
    return;
  }

  try {
    const balance = await getBalance(walletAddress);
    displayBalance(balance);
  } catch (error) {
    alert(error.message);
  }
}
