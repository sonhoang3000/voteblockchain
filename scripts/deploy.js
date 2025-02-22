const hre = require("hardhat");

async function main() {
      const Create = await hre.ethers.getContractFactory("Create"); // Kiểm tra tên hợp đồng trong file .sol
      const create = await Create.deploy();

      await create.deployed();

      console.log("Create contract deployed to:", create.address);
}

main().catch((error) => {
      console.error(error);
      process.exitCode = 1;
});