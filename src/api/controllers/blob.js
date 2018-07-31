/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /person              ->  index
 * POST    /person              ->  create
 * GET     /person/:id          ->  show
 * PUT     /person/:id          ->  upsert
 * PATCH   /person/:id          ->  patch
 * DELETE  /person/:id          ->  destroy
 */

import Blob from '../../models/blob';
import {
  respondWithResult,
  handleError,
  handleEntityNotFound,
  patchUpdates,
  removeEntity,
} from './helpers';

export function showBlob(req, res) {
  return Blob.findById(req.swagger.params.id.value).exec()
    .then(handleEntityNotFound(res))
    .then(({ blob }) => ({ ...blob }))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function createBlob(req, res) {
  return Blob.create({ blob: req.body })
    .then(({ _id }) => ({ id: _id }))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
