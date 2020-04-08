import * as Controllers from "../controllers";
import { AsyncHandler } from "../middlewares/AsyncMiddleware";

export function Routes(app) {
  const TestController: Controllers.TestController = new Controllers.TestController();
  const SearchController: Controllers.SearchController = new Controllers.SearchController();

  app.route("/test")
      .get(AsyncHandler(TestController.index));

    app.route("/search")
      .get(AsyncHandler(SearchController.index));
}
