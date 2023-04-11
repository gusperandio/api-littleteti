import Products from "../models/Products";

class ProductsController {
  async store(req, resp) {
    return resp.json({ ok: true });
  }
}

export default new ProductsController();
