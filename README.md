Bước 1:
Run: npm i

Run: npx hardhat node

Run: npx hardhat run scripts/deploy.js --network localhost

lấy số này để vô VOTING_ADDRESS trong .env (nhớ tạo .env)

//E.g: Voting: 0x5FbDB2315678afecb367f032d93F642f612345

sau khi run xong có folder artifacts/contracts ( vô đây remove Create.json vào context folder)

Run: npm run dev

Bước 2:
install Metamask trên Chorme
Bước 3:Select network
Network name: Localhost:8545
Default RPC URL: https://localhost:8545
Chain ID: 31337
Currency symbol: ETH
=> Save

Bước 3: Add account -> import account

import private key:
chọn 1 trong 20 cái sau khi run terminal (npx hardhat node )
