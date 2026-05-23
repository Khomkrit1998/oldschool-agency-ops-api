import type { Request, Response } from "express";
import { AppError } from "../../../shared/errors/app-error";
import { sendSuccess } from "../../../shared/utils/api-response";
import { employeeService } from "../services/employee.service";
import type {
  CreateEmployeeInput,
  ListEmployeesQuery,
  UpdateEmployeeInput,
  UpdateEmployeeProbationReviewInput,
} from "../validations/employee.validation";

export const employeeController = {
  async list(req: Request, res: Response) {
    const data = await employeeService.list(req.query as ListEmployeesQuery);
    return sendSuccess(res, data, "Employees fetched successfully.");
  },

  async summary(_req: Request, res: Response) {
    const data = await employeeService.summary();
    return sendSuccess(res, data, "Employee summary fetched successfully.");
  },

  async capacityByTeam(_req: Request, res: Response) {
    const data = await employeeService.capacityByTeam();
    return sendSuccess(res, data, "Employee capacity fetched successfully.");
  },

  async actionItems(_req: Request, res: Response) {
    const data = await employeeService.actionItems();
    return sendSuccess(res, data, "Employee action items fetched successfully.");
  },

  async activity(_req: Request, res: Response) {
    const data = await employeeService.activity();
    return sendSuccess(res, data, "Employee activity fetched successfully.");
  },

  async getById(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new AppError(400, "Employee ID is invalid.");
    }

    const data = await employeeService.getById(id);
    return sendSuccess(res, data, "Employee fetched successfully.");
  },

  async create(req: Request<unknown, unknown, CreateEmployeeInput>, res: Response) {
    const data = await employeeService.create(req.body, req.user?.id);
    return sendSuccess(res, data, "Employee created successfully.", 201);
  },

  async update(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new AppError(400, "Employee ID is invalid.");
    }

    const data = await employeeService.update(id, req.body as UpdateEmployeeInput);
    return sendSuccess(res, data, "Employee updated successfully.");
  },

  async updateProbationReview(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new AppError(400, "Employee ID is invalid.");
    }

    const data = await employeeService.updateProbationReview(
      id,
      Number(req.params.checkpoint),
      req.body as UpdateEmployeeProbationReviewInput,
    );
    return sendSuccess(res, data, "Employee probation review updated successfully.");
  },
};
