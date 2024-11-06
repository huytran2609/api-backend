import mongoose from 'mongoose';

const softDeletePlugin = (schema, options) => {
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
        return this.save();
    };
    // Add a `restore` method to restore a soft deleted document
    schema.methods.restore = function () {
        this[deletedAtFieldName] = null;
        return this.save();
    };
    schema.statics.softDelete = function (id) {
        return this.findByIdAndUpdate(id, { [deletedAtFieldName]: new Date() }, { new: true });
    };
    schema.statics.restore = function (id) {
        return this.findByIdAndUpdate(id, { [deletedAtFieldName]: null }, { new: true });
    };
};

export { softDeletePlugin };
