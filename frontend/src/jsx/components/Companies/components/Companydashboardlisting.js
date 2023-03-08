import { maxTime } from "date-fns";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import FiltersForAttempts from "../../Inductions/components/FilterForAttempts";

const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPANY: "company",
  INSTRUCTOR: "instructor",
  USER: "user",
};

const Companydashboardlisting = () => {
  // const {averageData, setAverageData} = props;
  const token = useSelector((state) => state.auth.auth.token);
  const role = useSelector((state) => state.auth.auth.role);
  const loginUser = useSelector((state) => state.auth.auth.id);
  const parentCompany = useSelector((state) => state.auth.auth.parentCompany);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); // main listing data
  const [companyFilter, setCompanyFilter] = useState();
  const [inductionFilter, setInductionFilter] = useState();
  const [resScore, setResScore] = useState();
  

  const handlepageLoad = async (e) => {
    // query string

    var queryStr = "";

    queryStr = companyFilter
      ? `?company=${companyFilter}`
      : USER_ROLES.COMPANY === role
      ? `?company=${loginUser}`
      : USER_ROLES.INSTRUCTOR === role
      ? `?company=${parentCompany}`
      : "";
    queryStr += inductionFilter ? `&induction=${inductionFilter}` : "";

    const response = await fetch(
      "http://localhost:8081/api/induction/users" + queryStr,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    ).then((data) => data.json());
    if ("status" in response && response.status == true) {
      setUsers(response.data);
      //   setUniqueTitle(response.data);
      setLoading(false);
    } else {
      return swal("Failed", response.message, "error");
    }
  };
  console.log(users, "inductions-attempts in new........");
  // use effect
  useEffect(() => {
    handlepageLoad();
  }, [companyFilter, inductionFilter]);

  const InductionFilterHandle = (e) => {
    setInductionFilter(e.target.value);
  };

  const dataset1 = [];
  const dataset2 = [];
  const dataset3 = [];
  const dataset4 = [];

//users scores 
const resultscore = users.map((i)=>dataset3.push(i.result))

console.log(dataset3, "dataset3");

// const Maxscore = users.map((i)=>dataset4.push(i.result.correctAnswers))

// console.log(Maxscore, "maxscore.........correct wrong");
// console.log(dataset4, "dataset4..........correct wrong");

const allscores = dataset3.map((i)=>dataset4.push(i.correctAnswers, i.wrongAnswers))
console.log(dataset4, "................dataset4")

const scores = dataset3.reduce((totals, subArray) => {
  subArray.forEach((item) => {
    const { score, inductionID } = item;
    const scoreAsNumber = parseInt(score);
    if (!totals[inductionID]) {
      totals[inductionID] = 0;
    }
    totals[inductionID] += scoreAsNumber;
  });
  return totals;

}, {});
console.log(scores, "total scores")


const scoresAll = dataset3.reduce((total, subArray) => {
  subArray.forEach((item) => {
    const { correctAnswers,wrongAnswers, inductionID, } = item;
    const scoreAsNumber = parseInt(correctAnswers);
    const otherscoreAsNumber = parseInt(wrongAnswers);
    if (!total[inductionID]) {
      total[inductionID] = 0;
    }
    total[inductionID] = scoreAsNumber + otherscoreAsNumber;
  });
  return total;
  
}, {});

console.log(scoresAll, "here we have totals")

//for max scores
const totalAttemptsAll = users.reduce((acc, user) => {
  const { inductionID, correctAnswers, wrongAnswers} = user.result;
  const index = acc.findIndex((entry) => entry.inductionID === inductionID );
  if (index !== -1) {

    acc[index].result = correctAnswers + wrongAnswers;
  } else {
   
    acc.push({ inductionID: user._id, totalMax: correctAnswers + wrongAnswers });
  }
  return acc;
}, []);

console.log(totalAttemptsAll, ".....total");

  const allTitles = users.map((i) => dataset1.push(i.inductions.title));
  const Details = users.map(i=>dataset2.push(i.inductions._id,i.inductions.title))

  const totalAttempts = users.reduce((acc, user) => {
    const { _id, title } = user.inductions;
    const index = acc.findIndex((entry) => entry._id === _id);
    if (index !== -1) {
      acc[index].total += user.total;
    } else {
      acc.push({ _id, title, total: user.total});
    }
    return acc;
  }, []);

  function removeDuplicates() {
    let unique = [];
    dataset1.forEach((element) => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
    return unique;
  }
  console.log(removeDuplicates(dataset1));

  const uniqueTitles = removeDuplicates(dataset1);

  const updatedTotalAttempts = totalAttempts.map((item) => {
    const { _id, total} = item;
    const attempts = scores[_id] || 0; 
    const averageScore = total > 0 ? attempts / total : 0; 
    return { _id, title: item.title, total: attempts, totalCount: item.total, averageScore };
  });
 
  return (
    <div>
       <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header border-0 flex-wrap pb-0">
            <h2>TEST ATTEMPTS </h2>
            {/* <FiltersForAttempts
              InductionFilterHandle={InductionFilterHandle}
              inductionFilter={inductionFilter}
            /> */}
          </div>

          <div className="card-body">
            <table 
              className="table display mb-4 dataTablesCard order-table card-table text-black application bordered "
              id="application-tbl1_next"
            >
              <thead style={{backgroundColor:"#58bad7 ",color:"white", fontSize:"500px"}}>
                <tr>
                  <th>Sr.No</th>
                  <th>Induction Title</th>
                  <th>Total Attempts</th>
                  <th>Average Score</th>
                  {/* <th>Max Score</th> */}
                </tr>
              </thead>
              <tbody >
                {updatedTotalAttempts.map((user, index) => ( 
                  <tr key={user}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <h4 className="mb-0 fs-16 font-w500">{user.title}</h4>
                      </div>
                    </td>
                    <td>
                    <div className="d-flex align-items-center">
                        <h4 className="mb-0 fs-16 font-w500"> {user.totalCount}</h4>
                      </div>
                     </td>
                    {/* <td>{user.total}</td> */}
                    <td style={{fontSize:"18px"}}><span className="badge bg-info " style={{color:"white",fontFamily:"sans-serif"}}>{user.averageScore} %</span></td>
                
                  </tr>
                ))}
              
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Companydashboardlisting;


 // const updatedTotalAttempts = totalAttempts.map((item) => {
  //   const { _id, total } = item;
  //   const attempts = scores[_id] || 0; // get the total score for the current induction ID, default to 0 if not found
  //   return { _id, title: item.title, total: attempts, totalCount: item.total };
  // });


  // //users scores 
  // const resultscore = users.map((i,index)=>dataset3.push(i.result))
//   const scores = [];

// for (let i = 0; i < dataset3.length; i++) {
//   const subArray = dataset3[i];
//   for (let j = 0; j < subArray.length; j++) {
//     const score = subArray[j].score;
//     const inductionID = subArray[j].inductionID
//     scores.push(score);
//     scores.push(inductionID);
//   }
// }
// console.log(scores,"scores in funtion"); 

// const totals = []


// const totals = {};

// users.forEach((user) => {
//   const { _id, title, scores } = user.inductions;
//   scores.forEach((score) => {
//     const { inductionID, score: userScore } = score;
//     if (!totals[inductionID]) {
//       totals[inductionID] = { title, total: userScore };
//     } else {
//       totals[inductionID].total += userScore;
//     }
//   });
// });
