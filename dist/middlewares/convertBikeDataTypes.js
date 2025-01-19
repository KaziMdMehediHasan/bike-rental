"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const convertBikeDataTypes = (req, res, next) => {
    try {
        const _a = req.body, { year, cc, isAvailable } = _a, otherData = __rest(_a, ["year", "cc", "isAvailable"]);
        // Convert data types
        req.body = Object.assign(Object.assign({}, otherData), { year: year ? Number(year) : undefined, cc: cc ? Number(cc) : undefined, isAvailable: isAvailable === 'false' ? false : true });
        next(); // Pass control to the next middleware (validation in this case)
    }
    catch (error) {
        next(error); // Pass any error to the error handler
    }
};
exports.default = convertBikeDataTypes;
