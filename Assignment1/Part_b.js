const Web3 = require("web3");
const fs = require("fs");

const abi = JSON.parse(fs.readFileSync("contract_sol_AddressRollMap.abi"));

async function main() {
  const web3 = new Web3.Web3(
    new Web3.providers.http.HttpProvider(
      "https://sepolia.infura.io/v3/18de0214db7a493e8d63d940410c300b"
    )
  );
  const signer = web3.eth.accounts.privateKeyToAccount(
    "0xc19b84372c54b3e29145e8a878c2370c48c16bbc71338d827ca8ed09ce236994"
  );
  web3.eth.accounts.wallet.add(signer);
  const myContract = new web3.eth.Contract(
    abi,
    "0xF98bFe8bf2FfFAa32652fF8823Bba6714c79eDd4"
  );
  // myContract.methods.update("DFds").send({
  //   from: signer.address,
  //   gasPrice: "80",
  // });
  // const tx = {
  //   to: "0xF98bFe8bf2FfFAa32652fF8823Bba6714c79eDd4",
  //   from: signer.address,
  //   data: myContract.methods.update("19EC39007").encodeABI(),
  //   value: "0x0",
  //   gasPrice: "58297708",
  // };
  // const signedTx = await web3.eth.accounts.signTransaction(
  //   tx,
  //   signer.privateKey
  // );
  // const receipt = await web3.eth
  //   .sendSignedTransaction(signedTx.rawTransaction)
  //   .then((resp) => {
  //     console.log(resp);
  //   });

  // myContract.methods
  //   .update("19EC39007")
  //   .send({
  //     from: signer.address,
  //     gasPrice: "80",
  //   })
  //   .then((resp) => {
  //     console.log(resp);
  //   });
  // console.log(signer);
  // .then((x) => {
  //   console.log(x);
  // });

  // myContract.methods
  //   .update("12")
  //   .send()
  //   .then((x) => {
  //     console.log(x);
  //   });
  // .then((x) => {
  //   console.log("DFDS", x);
  // });
  myContract.methods
    .get("0xCb28144Dbe97B37E50E494ADAe483A1e68983A0")
    .call()
    .then((resp) => {
      console.log(resp);
    });
  // .readdata()
  // .call()
  // .then(function (output) {
  //   console.log(output);
  // });
}
main();
