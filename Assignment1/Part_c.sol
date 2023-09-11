// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract TicketBooking {
    struct Buyer {
        uint256 totalPrice;
        uint256 numTickets;
        string email;
    }
    address payable public owner;
    uint256 public numTicketsSold;
    uint256 public quota;
    uint256 public price;
    mapping(address => Buyer) BuyersPaid;


    constructor(uint256 _quota, uint256 _price) {
        owner = payable(msg.sender);
        numTicketsSold = 0;
        quota = _quota;
        price = _price;
    }


    modifier soldOut() {
        require(numTicketsSold < quota, "All tickets have been sold");
        _;
    }


    function buyTicket(string memory email, uint256 numTickets) public payable soldOut
    {
        uint256 ticketsBought=0;
        if (numTickets + numTicketsSold < quota)
            ticketsBought = numTickets;
        else
            ticketsBought = quota-numTicketsSold-1;
       
        if (msg.value/price < ticketsBought)
            ticketsBought = msg.value/price;
       
        uint256 refund = msg.value - ticketsBought*price;


        if (BuyersPaid[msg.sender].numTickets > 0) {
            BuyersPaid[msg.sender].numTickets += ticketsBought;
            BuyersPaid[msg.sender].totalPrice += price * ticketsBought;
        } else {
            BuyersPaid[msg.sender].email = email;
            BuyersPaid[msg.sender].numTickets = ticketsBought;
            BuyersPaid[msg.sender].totalPrice = price * ticketsBought;
        }


        payable(msg.sender).transfer(refund);
    }


    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can send the transaction");
        _;
    }


    function withdrawFunds() public onlyOwner {
        owner.transfer(address(this).balance);
    }


    function refundTicket(address buyer) public onlyOwner {
        payable(buyer).transfer(BuyersPaid[buyer].totalPrice);
        numTicketsSold -= BuyersPaid[buyer].numTickets;
        delete BuyersPaid[buyer];
    }


    /* Additional functions */
    function getBuyerAmountPaid(address buyer) public view returns (uint256) {
        return BuyersPaid[buyer].totalPrice;
    }
}
