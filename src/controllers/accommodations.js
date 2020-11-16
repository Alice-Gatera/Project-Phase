import models from '../models';
import 'express-async-errors';
import accommodationNotFound from '../utils/notFoundRequestError';
import retrieveAccommodations from '../services/getAccommodations';

export const createAccommodation = async (req, res, next) => {
  try {
    const accommodation = await models.Accommodation.create(req.body);
    const amenity = await models.Amenity.create({ AccommodationId: accommodation.id });
    res.status(201).json({ accommodation });
  } catch (error) {
    next(error);
  }
};

export const getAccommodations = async (req, res, next) => {
  const page = Number(req.query.page);

  try {
    const accommodations = await retrieveAccommodations(page);
    if (!accommodations) {
      throw new accommodationNotFound('There are no accommodations available');
    }
    res.status(200).json({ status: 200, page, accommodations });
  } catch (error) {
    next(error);
  }
};

export const getOneAccommodation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleAccommodation = await models.Accommodation.findOne({ where: { id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
    if (!singleAccommodation) {
      throw new accommodationNotFound('Accommodation does not exist');
    }
    const amenities = await models.Amenity.findOne({ where: { AccommodationId: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
    res.status(200).json({ singleAccommodation, amenities });
  } catch (error) {
    next(error);
  }
};

export const updateAccommodation = async (req, res, next) => {
  try {
    const accommodationExist = await models.Accommodation.findOne({ where: { id: req.params.id } });
    if (!accommodationExist) {
      throw new accommodationNotFound('Accommodation does not exist');
    }
  } catch (error) {
    next(error);
  }

  try {
    const update = await models.Accommodation.update(req.body, { where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: 'Accommodation successfully updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteAccommodation = async (req, res, next) => {
  try {
    const accommodationExist = await models.Accommodation.findOne({ where: { id: req.params.id } });
    if (!accommodationExist) {
      throw new accommodationNotFound('Accommodation does not exist');
    }
  } catch (error) {
    next(error);
  }

  try {
    const dltAmenity = await models.Amenity.destroy({ where: { AccommodationId: req.params.id } });
    const dltAccommodation = await models.Accommodation.destroy({ where: { id: req.params.id } });
    res.status(201).json({ status: 201, message: 'Accommodation has been deleted' });
  } catch (error) {
    next(error);
  }
};
