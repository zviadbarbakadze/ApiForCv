// import { Models } from "../interfaces/general";
import { Feedback } from "../models/feedback.model";

export class FeedbackService {
  async registerFeedback(
    fromUser: number,
    companyName: string,
    toUser: number,
    content: string,
  ): Promise<Feedback> {
    try {
      const newFeedback = await Feedback.create({
        fromUser,
        companyName,
        toUser,
        content,
      });

      return newFeedback;
    } catch (error) {
      console.log(error);
    }
  }
}
