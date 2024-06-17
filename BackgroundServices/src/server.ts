import express from 'express'
import  cron  from 'node-cron'
import { run, sendBookingEmail } from './EmailServices';


const app = express()

cron.schedule('*/10 * * * * *', async() => {
    await run()
    await sendBookingEmail()
   });



app.listen(3300, ()=>{
    console.log("Background Services SERVER.......")
})


