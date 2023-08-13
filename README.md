# holistic-solidity
just solidity

using solidity
using fs
using web3
using node
using dotenv

Holistic-ish approach

Pure Solidity conract
with 2 js files for deployment and testing
error handling, better configuration management, and security considerations in mind
enhanced with best practices: using proper input validation, secure key management, and avoiding exposing sensitive information in your scripts.

Private key replaced with dotenv call
dotenv file hidden from git repo in gitignore file 
0xYourContractAddress - needs to be replaced with actual contract address in test.js on line 16