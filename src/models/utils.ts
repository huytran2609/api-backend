import mongoose, { Query, Schema } from 'mongoose';

import { Model, Document } from 'mongoose';

export type IMyDocument = {
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
} & Document;
interface SoftDeletableModel<T extends IMyDocument> extends Model<T> {
  softDelete(): Promise<T | null>;
  softDelete(id: Schema.Types.ObjectId | string): Query<(this & T) | null, any>;
  restore(id: Schema.Types.ObjectId | string): Query<(this & T) | null, any>;
  restore(): Promise<T | null>;
}

export default SoftDeletableModel;

const softDeletePlugin = (schema: Schema, options) => {
  const { deletedAtFieldName = 'deletedAt', overrideMethods = true } = options || {};

  // Add the deleted field to the schema
  schema.add({
    [deletedAtFieldName]: {
      type: Date,
      default: undefined,
    },
  });

  // Override the default `find` and `findOne` methods to exclude deleted documents
  if (overrideMethods) {
    schema.statics.find = function (conditions, projection, options) {
      const modifiedConditions = Object.assign({}, conditions, {
        [deletedAtFieldName]: null,
      });
      return mongoose.Model.find.call(this, modifiedConditions, projection, options);
    };

    schema.statics.findOne = function (conditions, projection, options) {
      const modifiedConditions = Object.assign({}, conditions, {
        [deletedAtFieldName]: null,
      });
      return mongoose.Model.findOne.call(this, modifiedConditions, projection, options);
    };
  }

  // Add a `softDelete` method to soft delete a document
  schema.methods.softDelete = function () {
    this[deletedAtFieldName] = new Date();
    return this.save() as Promise<any>;
  };

  // Add a `restore` method to restore a soft deleted document
  schema.methods.restore = function () {
    this[deletedAtFieldName] = null;
    return this.save() as Promise<any>;
  };
  schema.statics.softDelete = function (id: any): Query<any | null, any> {
    return this.findByIdAndUpdate(id, { [deletedAtFieldName]: new Date() }, { new: true });
  };

  schema.statics.restore = function (id: any): Query<any, any> {
    return this.findByIdAndUpdate(id, { [deletedAtFieldName]: null }, { new: true });
  };
};

export { softDeletePlugin };
