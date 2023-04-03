import User from "../models/User";

class UserController {
  async store(req, resp) {
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return resp.status(400).send("User already exists");
    }
    const { id, name, email } = await User.create(req.body);

    return resp.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
