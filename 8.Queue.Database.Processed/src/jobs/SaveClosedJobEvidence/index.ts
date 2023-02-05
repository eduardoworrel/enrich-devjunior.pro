import axios from 'axios';
import ClosedJobEvidence from '../../Interfaces/ClosedJobEvidence';

export default async function (closedJobEvidence: ClosedJobEvidence) {
  console.log('saving closed job evidence')
  console.log(closedJobEvidence)
  
  
  await axios.post("http://localhost:5226/api/Evidences", {
    "jobId": closedJobEvidence.JobId,
    "countIsClosed": closedJobEvidence.CountIsClosed,
    "actualStatus": closedJobEvidence.ActualStatus,
    "possiblyClosed": closedJobEvidence.PossiblyClosed
  })
  console.log("saved")
}