import { Handler, Response } from 'express';

export const health: Handler = (req, res): Response => {
  return res.status(200).json({
    health: true
  });
};
