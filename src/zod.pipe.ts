import { Injectable, type PipeTransform } from "@nestjs/common"
import { z } from "zod"

@Injectable()
export class ZodPipe implements PipeTransform<Record<string, unknown>> {
  constructor(private readonly schema: z.ZodType) {}

  transform(value: Record<string, unknown>) {
    return this.schema.parse(value)
  }
}
