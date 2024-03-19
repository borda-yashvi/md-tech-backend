exports.timestampsPlugin = (schema, options) => {
    schema.add({
        createdAt: { type: Number },
        updatedAt: { type: Number }
    });

    schema.pre('save', function (next) {
        const now = new Date().getTime();
        if (!this.createdAt) {
            this.createdAt = now;
        }
        this.updatedAt = now;
        next();
    });
    schema.pre('update', function (next) {
        this.set({ updatedAt: new Date().getTime() });
        next();
    });
    schema.pre("findOneAndUpdate", async function (next) {
        this.set({ updatedAt: new Date().getTime() });
        next();
    });
    schema.pre('findByIdAndUpdate', function (next) {
        this.set({ updatedAt: new Date().getTime() });
        next();
    });
    if (options && options.index) {
        schema.path('createdAt').index(options.index);
        schema.path('updatedAt').index(options.index);
    }
};