import { TTask } from "./task.interface";
import { Task } from "./task.model";

const createNewTaskIntoDb = async (payload: TTask) => {
  const result = await Task.create(payload);
  return result;
};

const getMyTaskFromDb = async (userId: string, query: any) => {
  const excludedFields = ["limit", "page"];
  const filterObject = { ...query };
  Object.keys(filterObject).forEach((item) => {
    if (excludedFields.includes(item) || !filterObject[item]) {
      delete filterObject[item];
    }
  });
  const limit = Number(query?.limit) || 6;
  const page = Number(query?.page) || 1;

  const result = await Task.find({ userId, ...filterObject })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort("-createdAt");
  const metaResult = await Task.find({ userId, ...filterObject }).lean();

  //   summary calculation
  const ongoingArr = metaResult.filter((item) => item.status === "ongoing");
  const todoArr = metaResult.filter((item) => item.status === "todo");
  const completeArr = metaResult.filter((item) => item.status === "complete");
  return {
    result,
    meta: {
      total: metaResult.length,
      totalPage: Math.ceil(metaResult.length / limit),
      currentPage: page,
      summary: { ongoing: ongoingArr.length, todo: todoArr.length, complete: completeArr.length },
    },
  };
};

const getSingleTaskFromDb = async (id: string) => {
  const result = await Task.findById(id);
  return result;
};

const updateSingleTaskIntoDb = async (id: string, payload: Partial<TTask>) => {
  const result = await Task.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteTaskFromDb = async (id: string) => {
  const result = await Task.findByIdAndDelete(id);
  return result;
};

export const taskServices = {
  createNewTaskIntoDb,
  getMyTaskFromDb,
  deleteTaskFromDb,
  getSingleTaskFromDb,
  updateSingleTaskIntoDb,
};
