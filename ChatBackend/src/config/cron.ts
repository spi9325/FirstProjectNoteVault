import { CronJob } from "cron";
import https from "https";

const job = new CronJob("*/14 * * * *",function (){
    https 
        .get(process.env.BACKEND_URL!, (res) =>{
            if(res.statusCode === 200) console.log("GET request sent successfully");
            else console.log("get eq fail",res.statusCode);
        })
        .on("error",(e)=> console.error("Error while sending request",e))
});

export default job;