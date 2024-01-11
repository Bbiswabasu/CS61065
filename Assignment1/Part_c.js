const Web3 = require("web3");
const fs = require("fs");

const abi = JSON.parse(fs.readFileSync("Part_c_sol_TicketBooking.abi"));

async function main() {
  const web3 = new Web3.Web3(
    new Web3.providers.http.HttpProvider(
      "https://sepolia.infura.io/v3/18de0214db7a493e8d63d940410c300b"
    )
  );

  const signer = web3.eth.accounts.privateKeyToAccount(
    "0x4d57e2320c489c023e15bcd6c96c60ec93cfdc3d9e3c61b51ccab089d615dcef"
  );
  web3.eth.accounts.wallet.add(signer);
  const myContract = new web3.eth.Contract(
    abi,
    "0x1830203bbe81e604413f48de3ce28132e0d2f4f5"
  );
  const tx = {
    to: "0x1830203bbe81e604413f48de3ce28132e0d2f4f5",
    from: signer.address,
    data: myContract.methods.buyTicket("bbiswabasu", 2).encodeABI(),
    value: "5000",
    gasPrice: "200000000000",
  };
  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    signer.privateKey
  );
  const receipt = await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://sepolia.etherscan.io/tx/${txhash}`);
    })
    .then((resp) => {
      console.log(resp);
    });
  console.log(receipt);

//   myContract.methods
//     .getNumTicketsSold()
//     .call()
//     .then((resp) => {
//       console.log(resp);
//     });
}
main();
