import { teamsController } from "@/infra/http/teams.controller";
import Elysia from "elysia";

const app = new Elysia();
app.use(teamsController);
app.listen(3000);