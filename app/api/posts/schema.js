import { z } from "zod";

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(5),
  postUserEmail: z.string().email(),
  postUser: z.string(),
});

export default schema;
