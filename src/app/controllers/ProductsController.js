/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import * as Yup from "yup";
import path from "path";
import fs from "fs/promises";
import Sequelize from "sequelize";
import Products from "../models/Products";
import databaseConfig from "../../config/database";

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

    const dadosFinais = (id) => {
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
    };
    const finalAll = [];

    async function printFiles() {
      for (const dado of products) {
        dado.dataValues.image = await dadosFinais(dado.id);
        finalAll.push(dado);
      }
    }
    await printFiles();
    const myObject = { ...finalAll };
    // const sequelize = new Sequelize(databaseConfig);
    // const prod = await sequelize.query("SELECT id FROM products where id > 3", {
    //   type: Sequelize.SELECT,
    // });

    return resp.status(201).json(myObject);
  }
}

export default new ProductsController();
