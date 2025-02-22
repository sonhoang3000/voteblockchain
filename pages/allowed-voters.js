import React, { useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

// INTERNAL IMPORT
import { VotingContext } from '@/context/Voter'
// import Style from '../styles/allowedVoter.css'
// import images from '../assets'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'

const allowedVoters = () => {
	const [fileUrl, setFileUrl] = useState(null)
	const [formInput, setFormInput] = useState({
		name: "",
		address: "",
		position: ""
	})

	const router = useRouter()
	const { uploadtoIPFS } = useContext(VotingContext)

	// VOTERS IMAGE DROP
	const onDrop = useCallback(async (acceptedFile) => {
		const url = await uploadtoIPFS(acceptedFile[0])
		setFileUrl(url)
	})

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: "image/*",
		maxSize: 5000000
	})

	// JSX PART
	return (
		<div className=''>
			<div>
				{fileUrl && (
					<div className=''>
						<img src={fileUrl} alt="Voter Image" />
						<div className=''>
							<p>
								Name: <span>&nbps; {formInput.name} </span>
							</p>
							<p>
								Add: <span>&nbps; {formInput.address.slice(0, 20)} </span>
							</p>
							<p>
								Pos: <span>&nbps; {formInput.position} </span>
							</p>
						</div>
					</div>
				)}
				{
					!fileUrl && (
						<div className=''>
							<div className=''>
								<h4>Create candidate For Voting</h4>
								<p>
									Blockchain voting organization, provide ethereum blockchain
									eco system
								</p>
								<p>Contract Candidate List</p>
							</div>

							<div>
								{/* {voterArray.map((el, i) => (
									<div key={i + 1} className=''>
										<div className=''>
											<img src='' alt='Profile photo' />
										</div>

										<div className=''>
											<p>Name</p>
											<p>Address</p>
											<p>Details</p>
										</div>
									</div>
								))} */}
							</div>
						</div>
					)}
			</div>

			<div className=''>
				<div className=''>
					<h1>Create New Voter</h1>
					<div className=''>
						<div className=''>
							<div {...getRootProps()}>
								<input {...getInputProps()} />

								<div className=''>
									<p>Upload File: JPG,PNG,GIF,WEBM Max 10MB</p>

									<div className='Style'>
										<Image
											src={''}
											width={150}
											height={150}
											objectFit='contain'
											alt='File upload'
										/>
									</div>
									<p>Drag and Drop File</p>
									<p>or Browse Media on you device</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className=''>
					<Input
						inputType="text"
						title="Name"
						placeholder="Voter Name"
						handleClick={(e) =>
							setFormInput({ ...formInput, name: e.target.value })
						}
					/>
					<Input
						inputType="text"
						title="Address"
						placeholder="Voter Address"
						handleClick={(e) =>
							setFormInput({ ...formInput, address: e.target.value })
						}
					/>
					<Input
						inputType="text"
						title="Position"
						placeholder="Voter Position"
						handleClick={(e) =>
							setFormInput({ ...formInput, position: e.target.value })
						}
					/>

					<div className=''>
						<Button btnName="Authorized Voter" handleClick={() => { }} />
					</div>
				</div>
			</div>

			{/* ////////////// */}
			<div className=''>
				<div className=''>
					<Image alt="user Profile" />
					<p>Notice For User</p>
					<p>
						Organizer <span>0x3939393939...</span>
					</p>
					<p>
						Only Organizer of the voting contract can create voter and candidate
						for voting election
					</p>
				</div>
			</div>


		</div>
	)
}

export default allowedVoters
