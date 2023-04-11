import * as Yup from "yup";
import Products from "../models/Products";

class ProductsController {
  async store(req, resp) {
    const schema = Yup.object().shape({
      name_product: Yup.string().required(),
      price: Yup.number().test("is-decimal", "invalid decimal", (value) => {
        return `${value}`.match(/^\d*\.{1}\d*$/);
      }),
      price_fake: Yup.number().test(
        "is-decimal",
        "invalid decimal",
        (value) => {
          return `${value}`.match(/^\d*\.{1}\d*$/);
        }
      ),
      // colors: Yup.array().required(),
      desc: Yup.string(),
      active: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return resp
        .status(400)
        .json({ error: "Roupa com campos incorretos ou faltando" });
    }

    const { id } = await Products.create(req.body);

    return resp.json({ ok: id });
  }

  async getAll(req, resp) {
    const products = await Products.findAll();
    return resp.json(products);
  }
}

export default new ProductsController();
