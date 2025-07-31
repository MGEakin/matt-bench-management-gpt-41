import { create } from "zustand";
import { Employee } from "../app/types";

interface EmployeeState {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  setEmployees: (employees) => set({ employees }),
}));
