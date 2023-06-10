import { Request, Response } from 'express';
import { Stone } from '../../models/Stones';

export const getByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const stone = await Stone.findOne({ searchName: name });

    if (!stone) {
      return res.status(400).json({
        success: false,
        message: `There is no stone with ${name} name`,
      });
    }

    return res.send({
      success: true,
      data: stone,
      message: 'Stone is successfully fetched',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const getByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;

    const stones = await Stone.find({ searchCategory: category }).lean();

    const result = stones.map((stone) => ({
      ...stone,
      link: `${stone.searchCategory}/${stone.searchName}`,
    }));

    return res.send({
      success: true,
      data: result,
      message: 'Stones are successfully fetched',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const searchStonesByName = async (req: Request, res: Response) => {
  try {
    const { searchKey } = req.params;

    const stones = await Stone.aggregate([
      {
        $match:
          searchKey === 'allStones'
            ? {}
            : {
                $or: [
                  { searchName: { $regex: searchKey } },
                  { title: { $regex: searchKey } },
                ],
              },
      },
      { $limit: 10 },
      {
        $group: {
          _id: { title: '$title' },
          title: { $addToSet: '$_id' },
          count: { $sum: 1 },
          docs: { $push: '$$ROOT' } 
        },
      },
    ])

    const result = stones.map((stone) => ({
      ...stone.docs[0],
      link: `${stone.docs[0].searchCategory}/${stone.docs[0].searchName}`,
    }));

    return res.send({
      success: true,
      data: result,
      message: 'Stones are successfully fetched',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export const addStone = async (req: Request, res: Response) => {
  try {
    const { title, category } = req.body;

    const stone = await Stone.findOne({ category, title });

    if (stone) {
      return res.status(400).json({
        success: false,
        message: `Stone with this name and category already exists`,
      });
    }

    const newStone = await Stone.create({ ...req.body });

    return res.send({
      success: true,
      data: newStone,
      message: 'Stones are successfully fetched',
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message, success: false });
  }
};
