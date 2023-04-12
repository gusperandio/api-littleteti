/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import * as Yup from "yup";
import path from "path";
import fs from "fs/promises";
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

    return resp.json({ id });
  }

  async getAll(req, resp) {
    const products = await Products.findAll();
    const dir = `http://localhost:3334/files/`;
    fs.readdir(path.join(__dirname, "..", "..", "..", "uploads")).then(
      (files) => {
        const images = files.filter((e) => {
          return e.includes(`_${4}${path.extname(e)}`);
        });
        console.log(dir + images[0]);
      }
    );

    return resp.status(201).json(products);
    // return resp.json(products);
  }
}

export default new ProductsController();
