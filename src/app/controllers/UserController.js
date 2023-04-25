/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async newUser(req, resp) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return resp.status(400).json({ message: "Falha na validação" });
    }

    const [user, created] = await User.findOrCreate({
      where: { email: req.body.email },
      defaults: req.body,
    });
    const { id, name, email } = user;
    if (!created) {
      return resp.status(400).json({ message: "Usuário já existe" });
    }

    return resp.json({ id, name, email });
  }

  async update(req, resp) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) => {
          oldPassword ? field.required() : field;
        }),
      confirmPassword: Yup.string().when("password", (password, field) => {
        return password ? field.required().oneOf([Yup.ref("password")]) : field;
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return resp.status(400).json({ message: "Falha na validação" });
    }

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return resp.status(400).json({ message: "Usuário ja existe" });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return resp.status(401).json({ message: "Senha incorreta" });
    }

    const { id, name } = await user.update(req.body);
    return resp.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
