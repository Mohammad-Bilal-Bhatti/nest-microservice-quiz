import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { UsersController } from "./users.controller";

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [],
  exports: []
})
export class UserModule {}