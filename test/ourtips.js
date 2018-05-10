const Ourtips = artifacts.require('./Ourtips.sol');

const ether = require('./helpers/ether');

contract('Ourtips', function(accounts) {
  const creator = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const user3 = accounts[3];
  const user1Shares = 1;
  const user2Shares = 3;
  const users = [user1, user2];
  const shares = [user1Shares, user2Shares];
  const name = 'Test name';

  let ourtips;

  beforeEach(async () => {
    ourtips = await Ourtips.new(users, shares, name, { from: creator });
  })


  it('should have 0 balance initially', async () => {
    const balance = web3.eth.getBalance(ourtips.address);
    assert.equal(balance, ether(0));
  });

  it('should have a name', async () => {
    const deployedContractName = await ourtips.name();
    assert.equal(deployedContractName, name);
  })

  it('should have 1 balance after sending 1 ether', async () => {
    await ourtips.send(ether(1));
    const balance = web3.eth.getBalance(ourtips.address);
    assert.equal(balance, ether(1));
  });

  it('should reduce balance by 25% after first user claims', async () => {
    await ourtips.send(ether(1));
    await ourtips.claim({ from: user1 });
    const balance = web3.eth.getBalance(ourtips.address);
    assert.equal(balance, ether(0.75));
  })

  it('user should see how much ether they can claim', async () => {
    await ourtips.send(ether(1));
    const amount = await ourtips.checkAmount(user1);
    assert.equal(amount, ether(0.25));
  })

  it('user should see that they cannot claim after they claimed', async () => {
    await ourtips.send(ether(1));
    await ourtips.claim({ from: user1 });
    const amount = await ourtips.checkAmount(user1);
    assert.equal(amount, ether(0));
  })

  it('should confirm if address is a payee', async () => {
    const isPayee = await ourtips.isPayee(user1);
    const isNotPayee = await ourtips.isPayee(user3);
    assert.equal(isPayee, true);
    assert.equal(isNotPayee, false);
  })

  it('should send out shares to all payees', async () => {
    const initialUser1Balance = web3.eth.getBalance(user1);
    const initialUser2Balance = web3.eth.getBalance(user2);
    await ourtips.send(ether(1));
    const amountForUser1 = await ourtips.checkAmount(user1);
    const amountForUser2 = await ourtips.checkAmount(user2);

    await ourtips.sendOut({ from: creator });

    assert.equal(web3.eth.getBalance(user1).toString(), initialUser1Balance.plus(amountForUser1) );
    assert.equal(web3.eth.getBalance(user2).toString(), initialUser2Balance.plus(amountForUser2) );

  })

  it('should not break if someone has nothing to send', async () => {
    await ourtips.send(ether(1));
    await ourtips.claim({ from: user1 });

    // This function should not throw an exception
    await ourtips.sendOut({ from: creator });

    const balance = web3.eth.getBalance(ourtips.address);
    assert.equal(balance, ether(0));
  })

});
