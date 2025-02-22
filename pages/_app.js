import "@/styles/globals.css";

// INTERNAL IMPORT
import { VotingProvider } from "../context/Voter";
import Navbar from "../components/Navbar/Navbar"
const MyApp = ({ Component, pageProps }) => (
  <VotingProvider>
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  </VotingProvider>
)

export default MyApp