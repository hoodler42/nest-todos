import { Module, type Provider } from "@nestjs/common";

import { UuidIdGenerator } from "./uuid/uuid.id-generator.js";
import { ID_GENERATOR_TOKEN } from "../../core/application/ports/id-generator/id-generator.js";

const idGenerators: Provider[] = [{ provide: ID_GENERATOR_TOKEN, useClass: UuidIdGenerator }];

@Module({
    exports: idGenerators,
    providers: idGenerators,
})
export class TodoIdGeneratorModule {}
