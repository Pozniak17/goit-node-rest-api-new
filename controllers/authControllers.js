import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
  const { email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailInLowerCase });
    // якщо є в системі
    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await User.create({
      email: emailInLowerCase,
      password: passwordHash,
    });

    console.log(result);

    res.status(201).send({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  const { email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();

  // перевірка на емейл в системі
  try {
    const user = await User.findOne({ email: emailInLowerCase });

    if (user === null) {
      console.log("Email");
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    // якщо користувач є в системі, треба порівняти паролі
    // порівнює пароль та хеш-пароль(наш який в системі)
    const isMatch = await bcrypt.compare(password, user.password);
    // якщо пароль не пройшов
    if (isMatch === false) {
      console.log("Password");
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    // генеруємо токен, передаємо payload, secret-key, expiresIn
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // записуємо токен при логіні
    await User.findByIdAndUpdate(user._id, { token });

    console.log({ user: { user } });

    res.send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    // при логауті записуємо token: null
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function current(req, res, next) {
  try {
    const user = await User.findById(req.user.id);

    console.log(user);
    res.status(200).send({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateSubscription(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
}
