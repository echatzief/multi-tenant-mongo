import { z } from "zod";

const userShema = z.object({
    name: z.string(),
})

export { userShema }