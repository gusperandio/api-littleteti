/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import * as Yup from "yup";
import path from "path";
import fs from "fs/promises";
import { Op } from "sequelize";
import Products from "../models/Products";

function dadosFinais(id) {
  const dir = `http://localhost:3334/files/`;

  return fs
    .readdir(path.join(__dirname, "..", "..", "..", "uploads"))
    .then((files) => {
      const images = files.filter((e) => {
        return e.includes(`_${id}${path.extname(e)}`);
      });

      const result = [];
      for (const image of images) {
        result.push(dir + image);
      }
      return result;
    });
}

async function printFiles(products) {
  const final = [];
  if (products.length > 1) {
    for (const dado of products) {
      dado.dataValues.image = await dadosFinais(dado.id);
      final.push(dado);
    }
  } else {
    products.dataValues.image = await dadosFinais(products.id);
    final.push(products);
  }
  return final;
}

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
    const products =
      req.query.girl === undefined
        ? await Products.findAll({
            where: {
              active: true,
            },
          })
        : await Products.findAll({
            where: {
              girl: req.query.girl,
              active: true,
            },
          });

    if (products.length === 0) {
      return resp.status(201).json([]);
    }

    const productsFinal = await printFiles(products);

    return resp.status(201).json(productsFinal);
  }

  async getOne(req, resp) {
    const { id } = req.params;
    const product = await Products.findByPk(id);
    if (!product) {
      return resp.status(400).json({ message: "Produto não encontrado!" });
    }

    if (!product.active) {
      return resp.status(400).json({ message: "Produto fora de estoque" });
    }

    const productFinal = await printFiles(product);

    return resp.status(201).json(productFinal);
  }

  async getFooter(req, resp) {
    const girlBool = req.params.girl === "true";
    const productsFooter = await Products.findAll({
      where: {
        id: {
          [Op.ne]: req.params.id,
        },
        girl: girlBool,
        active: true,
      },
    });

    if (!productsFooter) {
      return resp.status(400).json({ message: "Produto não encontrado!" });
    }

    const productFinal = await printFiles(
      productsFooter.length > 1 ? productsFooter : productsFooter[0]
    );
    return resp.status(201).json(productFinal);
  }
}

export default new ProductsController();
