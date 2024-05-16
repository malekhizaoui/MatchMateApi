import { param, body, check } from "express-validator";
import { FieldController } from "../controller/FieldController";

export const fieldRoutes = [
  {
    method: "get",
    route: "/fields",
    controller: FieldController,
    action: "getAllFields",
    validation: [],
    includeVerifyToken: false,
    includeVerifyAdmin: false,
  },
  {
    method: "get",
    route: "/field/:id",
    controller: FieldController,
    action: "getOneField",
    validation: [],
    includeVerifyToken: false,
    includeVerifyAdmin: false,
  },
  {
    method: "get",
    route: "/fieldRegion/:region",
    controller: FieldController,
    action: "getFieldsByStadiumRegionFromBody",
    validation: [],
    includeVerifyToken: false,
    includeVerifyAdmin: false,
  },
  {
    method: "put",
    route: "/field/:id",
    controller: FieldController,
    action: "updateField",
    validation: [param("id").isInt()],
    includeVerifyToken: false,
    includeVerifyAdmin: false,
  },
  {
    method: "post",
    route: "/field",
    controller: FieldController,
    action: "createField",
    validation: [],
    includeVerifyToken: false,
    includeVerifyAdmin: false,
  },
  {
    method: "delete",
    route: "/field/remove/:id",
    controller: FieldController,
    action: "deleteFeedback",
    validation: [param("id").isInt()],
    includeVerifyToken: false,
    includeVerifyAdmin: false,
  },
];
