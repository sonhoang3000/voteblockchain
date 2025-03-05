const hre = require("hardhat");

async function main() {
      // const [account0, account1] = await hre.ethers.getSigners(); // Lấy danh sách tài khoản, account1 là Account #1

      const Create = await hre.ethers.getContractFactory("Create"); // Kiểm tra tên hợp đồng trong file .sol
      const create = await Create.deploy(); //account #0
      // const create = await Create.connect(account1).deploy(); // Deploy bằng Account #1

      await create.deployed();

      console.log("Voting:", create.address);
      console.log("Voting Organizer:", await create.votingOrganizer());
}

main().catch((error) => {
      console.error(error);
      process.exitCode = 1;
});