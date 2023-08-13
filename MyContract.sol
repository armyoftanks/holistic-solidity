// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint256 public data;

    constructor(uint256 initialValue) {
        data = initialValue;
    }

    function setData(uint256 newValue) public {
        data = newValue;
    }
}
