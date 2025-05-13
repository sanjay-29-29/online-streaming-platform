// import { Types } from "mongoose";
// import { getReviewById } from "../../repository/review/review.repository";

// export const handleGetReviewById = async(data : Types.ObjectId)=>{
//     try {
//         const response = await getReviewById(data);
//         return new GeneralResponse(
//             200,
//             "Fetch Successfully",
//             data,
//         )
//     } catch (error) {
//         next(error);
//     }
// }