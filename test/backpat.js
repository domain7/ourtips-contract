const Backpat = artifacts.require('./Backpat.sol');

const ether = require('./helpers/ether');

contract('Backpat', function(accounts) {
  const creator = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const user3 = accounts[3];
  const user1Shares = 1;
  const user2Shares = 3;
  const users = [user1, user2];
  const shares = [user1Shares, user2Shares];

  let backpat;

  beforeEach(async () => {
    backpat = await Backpat.new(users, shares, { from: creator });
  })


  it('should have 0 balance initially', async () => {
    const balance = web3.eth.getBalance(backpat.address);
    assert.equal(balance, ether(0));
  });

  it('should have 1 balance after sending 1 ether', async () => {
    await backpat.send(ether(1));
    const balance = web3.eth.getBalance(backpat.address);
    assert.equal(balance, ether(1));
  });

  it('should reduce balance by 25% after first user claims', async () => {
    await backpat.send(ether(1));
    await backpat.claim({ from: user1 });
    const balance = web3.eth.getBalance(backpat.address);
    assert.equal(balance, ether(0.75));
  })

  it('user should see how much ether they can claim', async () => {
    await backpat.send(ether(1));
    const amount = await backpat.checkAmount(user1);
    assert.equal(amount, ether(0.25));
  })

  it('user should see that they cannot claim after they claimed', async () => {
    await backpat.send(ether(1));
    await backpat.claim({ from: user1 });
    const amount = await backpat.checkAmount(user1);
    assert.equal(amount, ether(0));
  })

  it('should confirm if address is a payee', async () => {
    const isPayee = await backpat.isPayee(user1);
    const isNotPayee = await backpat.isPayee(user3);
    assert.equal(isPayee, true);
    assert.equal(isNotPayee, false);
  })

});
