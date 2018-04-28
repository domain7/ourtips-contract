pragma solidity ^0.4.20;

import "zeppelin-solidity/contracts/payment/SplitPayment.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";


contract Backpat is SplitPayment {
    function Backpat(address[] _payees, uint256[] _shares)
        public
        SplitPayment(_payees, _shares)
        {}

    function () payable {}

    function checkAmount(address _payee) public view returns (uint256) {
        uint256 totalReceived = address(this).balance.add(totalReleased);
        uint256 payeeAmount = totalReceived.mul(shares[_payee]).div(totalShares).sub(released[_payee]);
        return payeeAmount;
    }

    function isPayee(address _address) public view returns (bool) {
        return shares[_address] > 0;
    }
}
