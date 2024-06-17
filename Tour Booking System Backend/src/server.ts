import express, {json} from 'express'
import authRouter from './Routes/authRoutes'
import tourRouter from './Routes/tourRoutes'
import { ifAdmin, verifyToken } from '../Middleware'
import hotelRouter from './Routes/hotelRoutes'
import bookingRouter from './Routes/bookingRoutes'
import adminRouter from './Routes/adminRoutes'

const app = express()

//middleware
app.use(json())

app.use("/auth",authRouter )
app.use("/tours",tourRouter )
app.use("/hotels",hotelRouter )
app.use("/bookings",bookingRouter )
app.use("/admin",adminRouter )




app.listen(3000, ()=>{
    console.log("TOUR SERVER RUNNING.....");
})