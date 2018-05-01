pragma solidity ^0.4.20;

import "zeppelin-solidity/contracts/payment/SplitPayment.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";


contract Backpat is SplitPayment {
    string public name;

    function Backpat(address[] _payees, uint256[] _shares, string _name)
        public
        SplitPayment(_payees, _shares)
    {
        name = _name;
    }

    function () public payable {}

    function checkAmount(address _payee) public view returns (uint256) {
        uint256 totalReceived = address(this).balance.add(totalReleased);
        uint256 payeeAmount = totalReceived.mul(shares[_payee]).div(totalShares).sub(released[_payee]);
        return payeeAmount;
    }

    function isPayee(address _address) public view returns (bool) {
        return shares[_address] > 0;
    }

    function sendOut() public returns (bool) {
        for (uint i = 0; i < payees.length; i++) {
            if (checkAmount(payees[i]) > 0) {
                transfer(payees[i]);
            }
        }
    }

    function transfer(address _payee) internal {
        require(shares[_payee] > 0);
        uint256 totalReceived = address(this).balance.add(totalReleased);
        uint256 payment = totalReceived.mul(shares[_payee]).div(totalShares).sub(released[_payee]);

        require(payment != 0);
        require(address(this).balance >= payment);

        released[_payee] = released[_payee].add(payment);
        totalReleased = totalReleased.add(payment);

        _payee.transfer(payment);
    }
}
