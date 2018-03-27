pragma solidity ^0.4.19;

contract Cexar {

    address public owner;
    string  public message = "Hello, I'm Cexar.io!!! Feel free to post a message into our Guestbook. (Value > 0 is required)";

    event PostMessage(address _from, string _name, string _msg);

    modifier len (string _s) {
        require(bytes(_s).length > 0);
        _;
    }

    modifier pay() {
        require(msg.value > 0);
        _;
    }
    
    modifier balance()
    {
        require(address(this).balance > 0);
        _;
    }

    modifier checkOwner() {
        require(msg.sender == owner);
        _;
    }

    function Cexar() public {
        owner   = msg.sender;
    }
    
    function getBalance() 
        constant 
        public 
        returns(uint256)
    {
        return address(this).balance;
    }

    function Message(string _name,string _msg)
        len(_name)
        len(_msg)
        pay()
        payable
        public
    {
        PostMessage(address(msg.sender),_name,_msg);
    }

    function collect()
        public
        checkOwner()
        balance()
    {
        owner.transfer(address(this).balance);
    }
}