import Joi, { expression, string } from "joi";

const RegisterSchema = Joi.object({
    Name: Joi.string().trim().required().min(1),
    Email: Joi.string().trim().required().email().min(1),
    Password: Joi.string().trim().required().pattern(
        new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    )
})




export const TourSchema = Joi.object({
    Name: Joi.string().trim().required().min(1),
    Destination: Joi.string().trim().required().min(1),
    Description: Joi.string().trim().required().min(1),
    Price: Joi.number().required().greater(5000)
})

export const HotelSchema = Joi.object({
    Name: Joi.string().trim().required().min(1),
    Location: Joi.string().trim().required().min(1),
    StarRating: Joi.number().required().greater(0).max(5)
})

export const BookingSchema = Joi.object({
    TourId: Joi.string().trim().required().min(1),
    HotelId: Joi.string().trim().required().min(1),
    BookingDate : Joi.date().required().min('now')

})

export default RegisterSchema