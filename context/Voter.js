import React, { useEffect, useState } from 'react' //143 DOWN OK
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import axios from 'axios'

// INTERNAL IMPORT
import { VotingAddress, VotingAddressABI } from './contanst'

const fetchContract = (signerOrProvider) =>
	new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider)

export const VotingContext = React.createContext()

export const VotingProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState("")
	const [candidateLength, setCandidateLength] = useState("")
	const pushCandidate = []
	const [candidateArray, setCandidateArray] = useState(pushCandidate)

	// END OF CANDIDATE DATA
	const [error, setError] = useState("")

	const pushVoter = []
	const [voterArray, setVoterArray] = useState(pushVoter)
	const [voterLength, setVoterLength] = useState('')
	const [voterAddress, setVoterAddress] = useState([])
	// CONNECTING METAMASK
	const checkIfWalletIsConnected = async () => {
		if (!window.ethereum) return setError("Please Install Metamask")

		const account = await window.ethereum.request({ method: "eth_accounts" })
		if (account.length) {

			console.log('check account', account)

			setCurrentAccount(account[0])
			getAllVoterData()
			getNewCandidate()
		} else {
			setError("Please Install METAMASK & Connect, Reload")
		}

		// Theo dõi sự kiện thay đổi tài khoản
		window.ethereum.on("accountsChanged", () => {
			window.location.reload(); // Reload trang khi tài khoản thay đổi
		});
	}

	const connectWallet = async () => {
		if (!window.ethereum) return setError("Please Install Metamask")

		const account = await window.ethereum.request({
			method: "eth_requestAccounts"
		})

		setCurrentAccount(account[0])
	}

	const uploadToIPFS = async (file) => {
		if (file) {
			try {
				const formData = new FormData()
				formData.append("file", file)
				const response = await axios({
					method: "POST",
					url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
					data: formData,
					headers: {
						pinata_api_key: '1e93568a0337d3207434',
						pinata_secret_api_key: `8f6cc592b2acffdd2c0febe5497fab8ac0b5f64050847f85a867e37062ff62bf`,
						"Content-Type": "multipart/form-data"
					}
				})
				const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
				return ImgHash
			} catch (error) {
				setError("Error Uploading file to uploadToIPFS")
			}
		}
	}

	const uploadToIPFSCandidate = async (file) => {
		if (file) {
			try {
				const formData = new FormData()
				formData.append("file", file)

				const response = await axios({
					method: "POST",
					url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
					data: formData,
					headers: {
						pinata_api_key: '1e93568a0337d3207434',
						pinata_secret_api_key: `8f6cc592b2acffdd2c0febe5497fab8ac0b5f64050847f85a867e37062ff62bf`,
						"Content-Type": "multipart/form-data"
					}
				})
				const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
				return ImgHash
			} catch (error) {
				setError("Error Uploading file to uploadToIPFS")
			}
		}
	}


	const createVoter = async (formInput, fileUrl, router) => {
		try {
			const { name, address, position } = formInput;

			if (!name || !address || !position)
				return console.log("Input data is missing");

			const web3Modal = new Web3Modal();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			const contract = fetchContract(signer);

			const data = JSON.stringify({ name, address, position, image: fileUrl });

			const response = await axios({
				method: "POST",
				url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
				data: data,
				headers: {
					pinata_api_key: '1e93568a0337d3207434',
					pinata_secret_api_key:
						`8f6cc592b2acffdd2c0febe5497fab8ac0b5f64050847f85a867e37062ff62bf`,
					"Content-Type": "application/json"
				}
			})

			const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`

			const voter = await contract.voterRight(address, name, url, fileUrl);
			voter.wait();

			router.push("/voterList");
		} catch (error) {
			setError("Something wrong creating voter data");
		}
	}

	// GET VOTER DATA
	const getAllVoterData = async () => {
		try {
			const web3Modal = new Web3Modal();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			const contract = fetchContract(signer);
			//VOTE LSIT
			const voterListData = await contract.getVoterList();
			setVoterAddress(voterListData);

			// Dùng Promise.all để đợi tất cả các lời gọi async hoàn tất
			const allVoterData = await Promise.all(
				voterListData.map(async (eL) => {
					const singleVoterData = await contract.getVoterdata(eL);
					return singleVoterData; // Trả về dữ liệu cho từng voter
				})
			);

			// Cập nhật mảng voterArray sau khi tất cả dữ liệu đã được lấy
			setVoterArray(allVoterData);

			//VOTER LENGTH
			const voterList = await contract.getVoterLength();
			setVoterLength(voterList.toNumber());
		} catch (error) {
			setError("Something went wrong fetching data getAllVoterData");
		}
	}

	useEffect(() => {
		getAllVoterData()
	}, [])

	// GIVE VOTE
	const giveVote = async (id) => {
		try {
			const voterAddress = id.address;
			const voterId = id.id;
			const web3Modal = new Web3Modal();
			const connection = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(connection);
			const signer = provider.getSigner();
			const contract = fetchContract(signer);

			const voteredList = await contract.vote(voterAddress, voterId)
			console.log(voteredList)
		} catch (error) {
			alert(`Sorry, You have already voted`);
		}
	}

	// CANDIDATE SECTION DONE
	const setCandidate = async (candidateForm, fileUrl, router) => {
		const { name, address, age } = candidateForm;

		if (!name || !address || !age) return setError("Input data is missing");

		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = fetchContract(signer);

		const data = JSON.stringify({
			name,
			address,
			image: fileUrl,
			age
		});

		const response = await axios({
			method: "POST",
			url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
			data: data,
			headers: {
				pinata_api_key: '1e93568a0337d3207434',
				pinata_secret_api_key: `8f6cc592b2acffdd2c0febe5497fab8ac0b5f64050847f85a867e37062ff62bf`,
				"Content-Type": "application/json"
			}
		})

		const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`

		const candidate = await contract.setCandidate(
			address,
			age,
			name,
			fileUrl,
			url
		);
		candidate.wait();

		router.push("/");
	};

	const getNewCandidate = async () => {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = fetchContract(signer);

		//-----All candidate
		const allCandidate = await contract.getCandidate();

		// Dùng Promise.all để đợi tất cả các lời gọi async hoàn tất
		const allCandidateData = await Promise.all(
			allCandidate.map(async (eL) => {
				const singleCandidateData = await contract.getCandidatedata(eL);
				return singleCandidateData; // Trả về dữ liệu cho từng voter
			})
		);

		setCandidateArray(allCandidateData);

		//---------cadidate length 
		const allCandidateLength = await contract.getCandidateLength();
		setCandidateLength(allCandidateLength.toNumber());
	};

	useEffect(() => {
		getNewCandidate()
	}, [])

	return (
		<VotingContext.Provider
			value={{
				checkIfWalletIsConnected,
				connectWallet,
				uploadToIPFS,
				createVoter,
				getAllVoterData,
				giveVote,
				setCandidate,
				getNewCandidate,
				error,
				voterArray,
				voterLength,
				voterAddress,
				currentAccount,
				candidateLength,
				candidateArray,
				uploadToIPFSCandidate
			}}
		>
			{children}
		</VotingContext.Provider>
	)
}