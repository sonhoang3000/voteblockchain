import React, { useContext, useEffect } from "react";

//INTRENAL IMPORT 
import VoterCard from "../components/VoterCard/VoterCard";
import Style from '../styles/voterList.module.css';
import { VotingContext } from "../context/Voter";

const voterList = () => {
      const { getAllVoterData, voterArray, checkIfWalletIsConnected } = useContext(VotingContext);
      useEffect(() => {
            const fetchData = async () => {
                  await checkIfWalletIsConnected(); // Kiểm tra ví
                  if (voterArray.length === 0) {
                        // Kiểm tra xem voterArray có dữ liệu chưa, nếu không gọi lại getAllVoterData
                        await getAllVoterData();
                  }
            };
            fetchData();
      }, []);

      console.log('check voterArray', voterArray)
      return (
            <div className={Style.voterList}>
                  <VoterCard voterArray={voterArray} />
            </div>
      )

};

export default voterList;