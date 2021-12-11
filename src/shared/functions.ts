import logger from './Logger';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

export const pErr = (err: Error) => {
  if (err) {
    logger.err(err);
  }
};

export const getRandomInt = () => {
  return Math.floor(Math.random() * 1_000_000_000_000);
};

export const getData = async () => {
  if (process.env.DATABASE) {
    const res = await axios.get(process.env.DATABASE);
    return res;
  }
  return null;
};

export const wrapAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
};
