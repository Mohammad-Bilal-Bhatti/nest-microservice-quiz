import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { FlimsController } from "./flims.controller";

@Module({
  imports: [SharedModule],
  controllers: [FlimsController],
  providers: [],
  exports: []
})
export class FilmsModule {}