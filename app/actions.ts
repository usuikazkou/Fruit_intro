"use server";

import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeState = {
  status: "idle" | "success" | "duplicate" | "error";
  message: string;
};

export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") || "").trim();

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "請輸入有效的 Email 地址。" };
  }

  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });

    let subscribers: string[] = [];
    try {
      subscribers = JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
    } catch {
      subscribers = [];
    }

    if (subscribers.includes(email)) {
      return { status: "duplicate", message: "這個 Email 已經登記過囉！" };
    }

    subscribers.push(email);
    await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2));

    return {
      status: "success",
      message: "登記成功！開賣時我們會第一時間通知你。",
    };
  } catch {
    return { status: "error", message: "登記失敗，請稍後再試一次。" };
  }
}
