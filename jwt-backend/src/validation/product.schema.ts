import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().trim().min(1),
  price: z
    .string()
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((num) => num > 0, {
      message: "Số tiền tối thiểu là 1",
    }),
  detailDesc: z.string().trim().min(1),
  shortDesc: z.string().trim().min(1),
  quantity: z
    .string()
    .transform((val) => (val === "" ? 0 : Number(val)))
    .refine((num) => num > 0, {
      message: "Số lượng tối thiểu là 1",
    }),
  factory: z.string().trim().min(1),
  target: z.string().trim().min(1),
});

export type TProductSchema = z.infer<typeof ProductSchema>;
