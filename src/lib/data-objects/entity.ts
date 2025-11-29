import { Result } from "typescript-result";
import { z } from "zod";

const entitySchema = z.object({
    id: z.uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export type EntityProps = z.infer<typeof entitySchema>;

export abstract class Entity implements EntityProps {
    protected constructor(
        public readonly id: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    protected static build<T extends Entity, E extends Error>(
        factory: () => T,
        schema: z.ZodObject<any>,
        errorFactory: (message: string) => E,
    ): Result<T, E> {
        const instance = factory();
        const fullSchema = entitySchema.extend(schema.shape);
        const result = fullSchema.safeParse(instance);

        if (!result.success) {
            const message = result.error.issues.map(issue => issue.message).join(", ");
            return Result.error(errorFactory(message)) as Result<T, E>;
        }

        return Result.ok(instance) as Result<T, E>;
    }
}
