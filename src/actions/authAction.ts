"use server";
import {
  redirectLoginPageService,
  logoutService,
} from "@/services/authService";

export const redirectLoginPageAction = async () => {
  await redirectLoginPageService();
};

export const logoutAction = async () => {
  await logoutService();
};
