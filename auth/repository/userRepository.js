import { Repository } from "microutilpkg";
import db from "../../models/index.js";
const { User } = db;



export default class UserRepository extends Repository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return await this.model.findOne({ email });
  }
}

