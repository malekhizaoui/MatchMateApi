import { param, body, check } from "express-validator";
import { FeedbackController } from "../controller/FeedbackController";

export const feedbackRoutes = [
  {
    method: "get",
    route: "/feedbacks",
    controller: FeedbackController,
    action: "getAllFeedbacks",
    validation: [],
    includeVerifyToken: false,
    includeVerifyAdmin: false,
  },
  {
    method: "get",
    route: "/feedback/:id",
    controller: FeedbackController,
    action: "getFeedbackById",
    validation: [],
    includeVerifyToken: false,
    includeVerifyAdmin: false,
  },
  {
    method: "put",
    route: "/feedback/:id",
    controller: FeedbackController,
    action: "updateFeedback",
    validation: [param("id").isInt()],
    includeVerifyToken: false,
    includeVerifyAdmin: false,
  },
  {
    method: "post",
    route: "/feedback/:userId/:stadiumId",
    controller: FeedbackController,
    action: "createFeedback",
    validation: [],
    includeVerifyToken: false,
    includeVerifyAdmin: false,
  },
  {
    method: "delete",
    route: "/feedback/remove/:id",
    controller: FeedbackController,
    action: "deleteFeedback",
    validation: [param("id").isInt()],
    includeVerifyToken: false,
    includeVerifyAdmin: false,
  },
];
