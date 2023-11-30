import { v4 as uuid } from "uuid"
import type { IdGenerator } from "../../../core/application/ports/id-generator/id-generator.js"

export const UUIDGenerator: IdGenerator = () => uuid()
