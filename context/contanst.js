
import voting from './Create.json'
import dotenv from 'dotenv'

dotenv.config()

export const VotingAddress = process.env.VOTING_ADDRESS
export const VotingAddressABI = voting.abi
